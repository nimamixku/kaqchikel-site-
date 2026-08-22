-- Schema for the "Claude is learning Kaqchikel" public log.
-- Run this ONCE against whatever Postgres database you connect via
-- DATABASE_URL / POSTGRES_URL. This table is entirely separate from the
-- real archive data (which stays in app/page.js and the JSON files under
-- app/) — it only stores guesses and their review status.

create table if not exists guess_log (
  id bigserial primary key,
  source_type text not null default 'visitor', -- 'visitor' | 'owner'
  input_text text not null,
  guessed_kaqchikel text,
  guessed_spanish text,
  guessed_english text,
  confidence text,
  ai_note text,
  status text not null default 'pending', -- 'pending' | 'confirmed_correct' | 'corrected' | 'rejected'
  reviewer_notes text,
  ip_hash text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists guess_log_created_at_idx on guess_log (created_at desc);
create index if not exists guess_log_source_type_idx on guess_log (source_type);
create index if not exists guess_log_ip_hash_idx on guess_log (ip_hash);

-- Schema for the "NEEDS CLARIFICATION" panel: open grammar/gloss questions
-- flagged anywhere on the site, kept in one editable place. The archive
-- keeper can add, edit, and resolve entries while signed in; everyone else
-- sees the list read-only.

create table if not exists clarifications (
  id bigserial primary key,
  source text not null,       -- which section of the site this is about, e.g. "ART — word bank"
  item text not null,         -- the specific word/phrase in question
  note text not null,         -- the actual clarification note
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clarifications_resolved_idx on clarifications (resolved);
create index if not exists clarifications_created_at_idx on clarifications (created_at desc);
