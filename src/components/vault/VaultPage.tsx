import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Lock } from "lucide-react";
import type { VaultClip } from "@/lib/vault/types";
import { VAULT_MAX_BYTES, VAULT_MIME_TYPES, VAULT_SOURCE_MAX_BYTES } from "@/lib/vault/types";
import { VIDEO_PROJECTS, videoProjectLabel, type VideoProjectId } from "@/lib/vault/projects";
import { formatAddedAt } from "@/lib/dates";
import { formatBytes } from "@/lib/vault/bytes";
import { uploadWithProgress } from "@/lib/vault/uploadWithProgress";
import {
  deleteVaultVideo,
  finalizeVaultUpload,
  lockVault,
  prepareVaultUpload,
  unlockVault,
  updateVaultVideoProject,
} from "@/lib/vault/vault.functions";
import { VaultClipPlayer } from "./VaultClipPlayer";

type Phase = "idle" | "loading" | "compressing" | "uploading" | "saving";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "صار خطأ. جرب مرة ثانية.";
}

export function VaultPage({ initial }: { initial: { unlocked: boolean; videos: VaultClip[] } }) {
  const unlock = useServerFn(unlockVault);
  const lock = useServerFn(lockVault);
  const prepare = useServerFn(prepareVaultUpload);
  const finalize = useServerFn(finalizeVaultUpload);
  const remove = useServerFn(deleteVaultVideo);
  const updateProject = useServerFn(updateVaultVideoProject);

  const [unlocked, setUnlocked] = useState(initial.unlocked);
  const [videos, setVideos] = useState(initial.videos);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState<VideoProjectId | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [originalBytes, setOriginalBytes] = useState<number | null>(null);
  const [compressedBytes, setCompressedBytes] = useState<number | null>(null);

  function resetProgress() {
    setPhase("idle");
    setProgress(0);
    setLoadedBytes(0);
    setTotalBytes(0);
    setOriginalBytes(null);
    setCompressedBytes(null);
  }

  async function onUnlock(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await unlock({ data: { password } });
      setUnlocked(true);
      setVideos(result.videos);
      setPassword("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  async function onLock() {
    await lock();
    setUnlocked(false);
    setVideos([]);
  }

  async function onUpload(event: FormEvent) {
    event.preventDefault();
    if (!file) {
      setError("اختَر فيديو أول.");
      return;
    }
    if (!projectId) {
      setError("حدد نوع المشروع حتى ينعرض بالمكان الصحيح.");
      return;
    }
    setBusy(true);
    setError(null);
    setOriginalBytes(file.size);
    setCompressedBytes(null);
    try {
      setPhase("loading");
      setProgress(4);
      const { compressVaultVideo } = await import("@/lib/vault/compressVideo");
      const compressed = await compressVaultVideo(file, (ratio) => {
        setPhase(ratio < 0.09 ? "loading" : "compressing");
        setProgress(Math.round(ratio * 100));
      });
      if (compressed.size > VAULT_MAX_BYTES) {
        throw new Error(`بعد الضغط صار ${formatBytes(compressed.size)}، وهذا أكبر من حد التخزين ${formatBytes(VAULT_MAX_BYTES)}.`);
      }
      setCompressedBytes(compressed.size);
      setPhase("uploading");
      setProgress(0);
      setLoadedBytes(0);
      setTotalBytes(compressed.size);

      const prepared = await prepare({
        data: {
          title: title.trim() || file.name.replace(/\.[^.]+$/, ""),
          fileName: compressed.name,
          contentType: "video/mp4",
          sizeBytes: compressed.size,
        },
      });
      await uploadWithProgress(prepared.signedUrl, compressed, prepared.contentType, (ratio, loaded, total) => {
        setProgress(Math.round(ratio * 100));
        setLoadedBytes(loaded);
        setTotalBytes(total);
      });
      setPhase("saving");
      setProgress(100);
      const clip = await finalize({
        data: {
          path: prepared.path,
          title: prepared.title,
          contentType: prepared.contentType,
          sizeBytes: prepared.sizeBytes,
          projectId,
        },
      });
      setVideos((current) => [clip, ...current]);
      setTitle("");
      setProjectId("");
      setFile(null);
      setFileKey((key) => key + 1);
      resetProgress();
    } catch (caught) {
      setError(errorMessage(caught));
      setPhase("idle");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm("تحذف هالفيديو؟")) return;
    setBusy(true);
    setError(null);
    try {
      await remove({ data: { id } });
      setVideos((current) => current.filter((clip) => clip.id !== id));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setBusy(false);
    }
  }

  const phaseLabel =
    phase === "loading"
      ? "تحميل أداة الضغط…"
      : phase === "compressing"
        ? "ضغط الفيديو"
        : phase === "uploading"
          ? "رفع الملف"
          : phase === "saving"
            ? "حفظ السجل…"
            : null;

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <form
          onSubmit={(event) => void onUnlock(event)}
          className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-[0_8px_28px_#1435280c]"
        >
          <Lock className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
          <h1 className="mt-3 text-center text-xl font-semibold">صفحة خاصة</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">أدخل كلمة السر عشان تشوف الأرشيف.</p>
          <label className="mt-5 block text-sm font-medium" htmlFor="vault-password">
            كلمة السر
          </label>
          <input
            id="vault-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-input bg-transparent px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
          />
          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "جارٍ الفتح…" : "فتح الأرشيف"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 pt-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">أرشيف خاص</p>
            <h1 className="text-2xl font-semibold">فيديوهاتك</h1>
          </div>
          <button
            type="button"
            onClick={() => void onLock()}
            className="min-h-11 rounded-full bg-ivory px-4 text-sm font-medium"
          >
            إغلاق
          </button>
        </div>

        <form
          onSubmit={(event) => void onUpload(event)}
          className="mt-8 rounded-3xl bg-card p-5 shadow-[0_8px_28px_#1435280c]"
        >
          <h2 className="text-lg font-semibold">رفع فيديو</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            قبل الرفع بنضغط الفيديو إلى 720p بنفس الوصفة الميدانية (crf 30). تقدر تختار ملف أصلي حتى{" "}
            {formatBytes(VAULT_SOURCE_MAX_BYTES)}.
          </p>
          <label className="mt-4 block text-sm font-medium" htmlFor="vault-title">
            العنوان
          </label>
          <input
            id="vault-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-input bg-transparent px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
          />
          <label className="mt-4 block text-sm font-medium" htmlFor="vault-project">
            نوع المشروع
          </label>
          <select
            id="vault-project"
            value={projectId}
            onChange={(event) => setProjectId(event.target.value as VideoProjectId | "")}
            className="mt-2 h-11 w-full rounded-xl border border-input bg-transparent px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50"
            required
          >
            <option value="">اختر المشروع</option>
            {VIDEO_PROJECTS.map((project) => (
              <option key={project.id} value={project.id}>
                {project.label}
              </option>
            ))}
          </select>
          <label className="mt-4 block text-sm font-medium" htmlFor="vault-file">
            الملف
          </label>
          <input
            id="vault-file"
            key={fileKey}
            type="file"
            accept={VAULT_MIME_TYPES.join(",")}
            onChange={(event) => {
              const next = event.target.files?.[0] ?? null;
              if (next && next.size > VAULT_SOURCE_MAX_BYTES) {
                setError(`الملف أكبر من ${formatBytes(VAULT_SOURCE_MAX_BYTES)}.`);
                setFile(null);
                return;
              }
              setFile(next);
              setError(null);
              resetProgress();
            }}
            className="mt-2 w-full text-sm file:me-3 file:rounded-full file:border-0 file:bg-ivory file:px-4 file:py-2"
          />
          {file ? (
            <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
              {file.name} · {formatBytes(file.size)}
            </p>
          ) : null}

          {phase !== "idle" && (
            <div className="mt-4" aria-live="polite">
              <div className="mb-1.5 flex justify-between gap-3 text-sm">
                <span>{phaseLabel}</span>
                <span dir="ltr">{progress}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label={phaseLabel ?? "التقدم"}
                className="h-2 overflow-hidden rounded-full bg-ivory"
              >
                <div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${progress}%` }} />
              </div>
              {phase === "uploading" && totalBytes > 0 ? (
                <p className="mt-1.5 text-xs text-muted-foreground" dir="ltr">
                  {formatBytes(loadedBytes)} / {formatBytes(totalBytes)}
                </p>
              ) : null}
              {compressedBytes !== null && originalBytes !== null ? (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  الحجم بعد الضغط: {formatBytes(compressedBytes)} (كان {formatBytes(originalBytes)})
                </p>
              ) : null}
            </div>
          )}

          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={busy || !file || !projectId}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? phaseLabel ?? "جارٍ العمل…" : "ضغط ورفع الفيديو"}
          </button>
        </form>

        {videos.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">ما في فيديوهات بعد. ارفع أول واحد من فوق.</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((clip) => (
              <li key={clip.id} className="overflow-hidden rounded-2xl bg-card shadow-[0_12px_32px_#1435280f]">
                <VaultClipPlayer src={clip.videoUrl} poster={clip.posterUrl} title={clip.title} />
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-primary">{videoProjectLabel(clip.projectId)}</p>
                      <h2 className="text-lg font-semibold">{clip.title}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">أُضيف {formatAddedAt(clip.createdAt)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void onDelete(clip.id)}
                      className="shrink-0 text-sm text-muted-foreground hover:text-destructive"
                    >
                      حذف
                    </button>
                  </div>
                  <label className="block text-xs text-muted-foreground" htmlFor={`project-${clip.id}`}>
                    مكان العرض
                  </label>
                  <select
                    id={`project-${clip.id}`}
                    value={clip.projectId}
                    disabled={busy}
                    onChange={(event) => {
                      const next = event.target.value as VideoProjectId;
                      void updateProject({ data: { id: clip.id, projectId: next } })
                        .then(() => {
                          setVideos((current) =>
                            current.map((item) => (item.id === clip.id ? { ...item, projectId: next } : item)),
                          );
                        })
                        .catch((caught: unknown) => setError(errorMessage(caught)));
                    }}
                    className="h-11 w-full rounded-xl border border-input bg-transparent px-3 text-sm"
                  >
                    {VIDEO_PROJECTS.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.label}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
