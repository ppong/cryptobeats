
CREATE TABLE playlist(
  id uuid primary key NOT NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  name text NOT NULL,
  data jsonb NOT NULL
);
