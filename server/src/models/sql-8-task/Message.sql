DROP TABLE IF EXISTS "messages";

CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL PRIMARY KEY, 
    "body" TEXT NOT NULL CHECK("body"!=''), 
    "sender_id" INT,
    "conversation_id" INT,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("sender_id", "conversation_id") REFERENCES "users_to_conversations"("user_id", "conversation_id")
);