DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "avatar" VARCHAR(255) NOT NULL DEFAULT 'anon.png',
    "role" VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'creator')),
    "balance" DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    "access_token" TEXT,
    "rating" FLOAT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);