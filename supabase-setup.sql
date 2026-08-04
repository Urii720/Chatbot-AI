-- Pega esto en Supabase > SQL Editor > New query > Run

create table leaderboard (
  id bigint generated always as identity primary key,
  name text not null,
  score numeric not null,
  product text,
  created_at timestamptz default now()
);

-- Esto evita que cualquiera pueda leer/escribir directamente desde el navegador
-- con las claves públicas; solo nuestro backend (con la clave service_role) podrá.
alter table leaderboard enable row level security;
