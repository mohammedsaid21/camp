import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { clearVaultCookie, issueVaultCookie, passwordMatches, requireVault, vaultUnlocked } from "./session";
import { supabaseAdmin, VAULT_BUCKET } from "./supabase";
import { VAULT_MAX_BYTES, VAULT_MIME_TYPES, type VaultClip } from "./types";
import { isVideoProjectId, VIDEO_PROJECT_IDS } from "./projects";

const attempts = new Map<string, { count: number; resetAt: number }>();

function clientKey() {
  return getRequestIP({ xForwardedFor: true }) ?? "local";
}

function allowUnlockAttempt() {
  const now = Date.now();
  const current = attempts.get(clientKey());
  if (!current || current.resetAt < now) {
    attempts.set(clientKey(), { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (current.count >= 8) return false;
  current.count += 1;
  return true;
}

function extensionFor(fileName: string, mime: string) {
  const fromName = fileName.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName;
  if (mime === "video/webm") return "webm";
  if (mime === "video/quicktime") return "mov";
  if (mime === "video/x-matroska") return "mkv";
  return "mp4";
}

async function signedDownload(path: string) {
  const { data, error } = await supabaseAdmin().storage.from(VAULT_BUCKET).createSignedUrl(path, 60 * 60 * 2);
  if (error || !data?.signedUrl) throw new Error(error?.message ?? "تعذر تجهيز رابط المشاهدة");
  return data.signedUrl;
}

function asClip(row: {
  id: string;
  title: string;
  storage_path: string;
  poster_path: string | null;
  created_at: string;
  project_id?: string | null;
}): Promise<VaultClip> {
  return Promise.all([
    signedDownload(row.storage_path),
    row.poster_path ? signedDownload(row.poster_path) : Promise.resolve(null),
  ]).then(([videoUrl, posterUrl]) => ({
    id: row.id,
    title: row.title,
    videoUrl,
    posterUrl,
    createdAt: row.created_at,
    projectId: row.project_id && isVideoProjectId(row.project_id) ? row.project_id : "other",
  }));
}

async function listClips(): Promise<VaultClip[]> {
  const { data, error } = await supabaseAdmin()
    .from("vault_videos")
    .select("id, title, storage_path, poster_path, created_at, project_id")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return Promise.all(
    (data ?? []).map((row) =>
      asClip({
        id: row.id as string,
        title: row.title as string,
        storage_path: row.storage_path as string,
        poster_path: (row.poster_path as string | null) ?? null,
        created_at: row.created_at as string,
        project_id: (row.project_id as string | null) ?? null,
      }),
    ),
  );
}

export const getPublicVideos = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await listClips();
  } catch (error) {
    console.error(error);
    return [] as VaultClip[];
  }
});

export const getVaultState = createServerFn({ method: "GET" }).handler(async () => {
  if (!vaultUnlocked()) return { unlocked: false as const, videos: [] as VaultClip[] };
  return { unlocked: true as const, videos: await listClips() };
});

export const unlockVault = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1).max(80) }))
  .handler(async ({ data }) => {
    if (!allowUnlockAttempt()) {
      throw new Error("محاولات كثيرة. انتظر شوي وجرب مرة ثانية.");
    }
    if (!passwordMatches(data.password)) {
      throw new Error("كلمة السر غلط.");
    }
    issueVaultCookie();
    return { unlocked: true as const, videos: await listClips() };
  });

export const lockVault = createServerFn({ method: "POST" }).handler(async () => {
  clearVaultCookie();
  return { unlocked: false as const };
});

export const prepareVaultUpload = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().trim().min(1).max(120),
      fileName: z.string().min(1).max(200),
      contentType: z.string().min(1).max(80),
      sizeBytes: z.number().int().positive().max(VAULT_MAX_BYTES),
    }),
  )
  .handler(async ({ data }) => {
    requireVault();
    if (!VAULT_MIME_TYPES.includes(data.contentType as (typeof VAULT_MIME_TYPES)[number])) {
      throw new Error("صيغة الفيديو غير مدعومة. استخدم mp4 أو webm.");
    }
    const path = `videos/${crypto.randomUUID()}.${extensionFor(data.fileName, data.contentType)}`;
    const { data: signed, error } = await supabaseAdmin()
      .storage.from(VAULT_BUCKET)
      .createSignedUploadUrl(path, { upsert: true });
    if (error || !signed) throw new Error(error?.message ?? "تعذر تجهيز الرفع");
    return {
      path,
      token: signed.token,
      signedUrl: signed.signedUrl,
      title: data.title,
      contentType: data.contentType,
      sizeBytes: data.sizeBytes,
    };
  });

export const finalizeVaultUpload = createServerFn({ method: "POST" })
  .validator(
    z.object({
      path: z.string().min(1),
      title: z.string().trim().min(1).max(120),
      contentType: z.string().min(1).max(80),
      sizeBytes: z.number().int().positive().max(VAULT_MAX_BYTES),
      projectId: z.enum(VIDEO_PROJECT_IDS),
    }),
  )
  .handler(async ({ data }) => {
    requireVault();
    if (!data.path.startsWith("videos/")) throw new Error("مسار غير صالح");
    const { data: inserted, error } = await supabaseAdmin()
      .from("vault_videos")
      .insert({
        title: data.title,
        storage_path: data.path,
        mime_type: data.contentType,
        size_bytes: data.sizeBytes,
        project_id: data.projectId,
      })
      .select("id, title, storage_path, poster_path, created_at, project_id")
      .single();
    if (error || !inserted) throw new Error(error?.message ?? "تعذر حفظ الفيديو");
    return asClip({
      id: inserted.id as string,
      title: inserted.title as string,
      storage_path: inserted.storage_path as string,
      poster_path: (inserted.poster_path as string | null) ?? null,
      created_at: inserted.created_at as string,
      project_id: (inserted.project_id as string | null) ?? data.projectId,
    });
  });

export const updateVaultVideoProject = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid(), projectId: z.enum(VIDEO_PROJECT_IDS) }))
  .handler(async ({ data }) => {
    requireVault();
    const { error } = await supabaseAdmin().from("vault_videos").update({ project_id: data.projectId }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { id: data.id, projectId: data.projectId };
  });

export const deleteVaultVideo = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    requireVault();
    const { data: row, error: readError } = await supabaseAdmin()
      .from("vault_videos")
      .select("storage_path, poster_path")
      .eq("id", data.id)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!row) throw new Error("الفيديو مش موجود");
    const paths = [row.storage_path as string, row.poster_path as string | null].filter((path): path is string => Boolean(path));
    if (paths.length > 0) {
      const { error: storageError } = await supabaseAdmin().storage.from(VAULT_BUCKET).remove(paths);
      if (storageError) throw new Error(storageError.message);
    }
    const { error } = await supabaseAdmin().from("vault_videos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { id: data.id };
  });
