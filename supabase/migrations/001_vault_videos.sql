-- أرشيف فيديوهات خاص. الوصول من التطبيق عبر service role فقط.
create table if not exists public.vault_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  storage_path text not null unique,
  poster_path text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

alter table public.vault_videos enable row level security;

revoke all on public.vault_videos from anon, authenticated;
grant all on public.vault_videos to service_role;
