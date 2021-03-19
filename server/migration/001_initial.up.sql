CREATE TABLE "user"(
  id uuid primary key NOT NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  username text UNIQUE NOT NULL,
  description text,
  ethereum_address text NOT NULL
);
