CREATE TABLE collectible(
  id uuid primary key NOT NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  txHash text NOT NULL,
  metadata jsonb NOT NULL,
  CONSTRAINT collectible_user_id_fk FOREIGN KEY(user_id) REFERENCES "user"(id)
);

CREATE TABLE follow(
  id uuid primary key NOT NULL,
  created_at timestamptz NOT NULL,
  user_id uuid NOT NULL,
  follow_user_id uuid NOT NULL,
  CONSTRAINT follow_user_id_fk FOREIGN KEY(user_id) REFERENCES "user"(id),
  CONSTRAINT follow_follow_user_id_fk FOREIGN KEY(follow_user_id) REFERENCES "user"(id)
);

CREATE TABLE playlist(
  id uuid primary key NOT NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  user_id uuid NOT NULL,
  name text NOT NULL,
  CONSTRAINT playlist_user_id_fk FOREIGN KEY(user_id) REFERENCES "user"(id)
);

CREATE TABLE playlist_association(
  id uuid primary key NOT NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  user_id uuid NOT NULL,
  ordering int NOT NULL,
  playlist_id uuid NOT NULL,
  collectible_id uuid NOT NULL,
  CONSTRAINT playlist_association_user_id_fk FOREIGN KEY(user_id) REFERENCES "user"(id),
  CONSTRAINT playlist_association_playlist_id_fk FOREIGN KEY(playlist_id) REFERENCES playlist(id),
  CONSTRAINT playlist_association_collectible_id_fk FOREIGN KEY(collectible_id) REFERENCES collectible(id)
);
