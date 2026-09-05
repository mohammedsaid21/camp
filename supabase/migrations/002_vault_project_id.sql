-- ربط كل فيديو مرفوع بنوع مشروع للعرض العام.
alter table public.vault_videos
  add column if not exists project_id text not null default 'other';
