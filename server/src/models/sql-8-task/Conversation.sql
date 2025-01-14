DROP TABLE IF EXISTS "conversations";

CREATE TABLE IF NOT EXISTS "conversations" (
    "id" SERIAL PRIMARY KEY, 
    "participants" INTEGER[] NOT NULL UNIQUE, 
    "black_list" BOOLEAN[] NOT NULL,
    "favorite_list" BOOLEAN[] NOT NULL, 
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
);
