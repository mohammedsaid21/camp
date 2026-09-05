export type VaultClip = {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string | null;
  createdAt: string;
  projectId: string;
};

export const VAULT_MAX_BYTES = 50 * 1024 * 1024;
export const VAULT_SOURCE_MAX_BYTES = 300 * 1024 * 1024;

export const VAULT_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"] as const;
