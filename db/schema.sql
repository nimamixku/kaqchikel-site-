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

-- Schema for the "LANGUAGE AMENDMENTS" panel: open grammar/gloss questions
-- flagged anywhere on the site, kept in one editable place. A word's note
-- also shows up inline wherever that word appears (e.g. the ART word
-- banks), matched by the `item` column. The archive keeper can add, edit,
-- and resolve entries while signed in; everyone else sees the list
-- read-only.

create table if not exists clarifications (
  id bigserial primary key,
  source text not null,       -- which section of the site this is about, e.g. "ART — word bank"
  item text not null,         -- the exact word/phrase text as it appears in a word bank (matched to flag it inline there)
  question text not null,     -- short lead-in label for the collapsed row, e.g. "b'aq or b'aqil, when to use"
  note text not null,         -- the fuller clarification note, shown once expanded
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clarifications_resolved_idx on clarifications (resolved);
create index if not exists clarifications_created_at_idx on clarifications (created_at desc);

-- Seed the two amendments that used to be hardcoded on the page, so they
-- reappear after this migration instead of starting from an empty log.
-- Safe to re-run: each insert only fires if that item isn't already there.
insert into clarifications (source, item, question, note)
select 'ART — word bank', 'rub''aqil', 'b''aq or b''aqil, when to use',
  'ru- usually marks 3rd person possessive ("its"), but here it seems to function as "the" instead. b''aq is the root for bone; unclear whether -il on b''aqil is a plural marker or something else — needs grammatical clarification.'
where not exists (select 1 from clarifications where item = 'rub''aqil');

insert into clarifications (source, item, question, note)
select 'EXAMPLE SENTENCES', 'chi', 'chi — what does it actually link to',
  'Suspect "chi" actually links to "that" for "nin-bij," not the word it''s currently matched to — unconfirmed.'
where not exists (select 1 from clarifications where item = 'chi');

-- Schema for live, on-site labeling of a freshly-added audio collection
-- (e.g. Medical Terminology) whose clips still carry raw recorder
-- timestamps instead of real names. This is a completely separate table
-- from `clarifications` (LANGUAGE AMENDMENTS) -- nothing here reads from
-- or writes to that table, and LANGUAGE AMENDMENTS' own behavior is
-- unchanged. A label saved here is a string in the same
-- "kaqchikel, español, english" format the archive already uses in
-- filenames -- parsed and displayed the same way (see parseKaqchikelWord
-- in lib/glossaryData.js) -- it just lives in the database so it can be
-- edited straight from the site instead of requiring a rename + git push.
-- The archive keeper can also still rename the actual file the normal
-- way; either path works; a saved label here just takes display priority.
create table if not exists audio_labels (
  id bigserial primary key,
  folder_name text not null,
  filename text not null,
  label text not null default '',
  updated_at timestamptz not null default now(),
  unique (folder_name, filename)
);

create index if not exists audio_labels_folder_idx on audio_labels (folder_name);
