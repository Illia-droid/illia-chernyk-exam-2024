DROP TABLE IF EXISTS "conversations", "users_to_conversations";

CREATE TABLE IF NOT EXISTS "conversations" (
    "id" SERIAL PRIMARY KEY, 
    "participants" INTEGER[] NOT NULL UNIQUE, 
    "black_list" BOOLEAN[] NOT NULL DEFAULT '{false, false}',
    "favorite_list" BOOLEAN[] NOT NULL DEFAULT '{false, false}', 
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS "users_to_conversations" (
    "user_id" INT REFERENCES "users"("id"), 
    "conversation_id" INT REFERENCES "conversations"("id"), 
    PRIMARY KEY ("user_id","conversation_id" )
);