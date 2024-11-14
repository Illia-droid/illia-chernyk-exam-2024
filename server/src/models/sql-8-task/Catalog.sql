DROP TABLE IF EXISTS "catalogs", "conversations_to_catalogs";

CREATE TABLE IF NOT EXISTS "catalogs" (
    "id" SERIAL PRIMARY KEY,  
    "user_id" INT REFERENCES "users"("id"),   
    "catalog_name" VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS "conversations_to_catalogs" (
    "conversation_id" INT REFERENCES "conversations"("id"), 
    "catalog_id" INT REFERENCES "catalogs"("id"), 
    PRIMARY KEY ("conversation_id", "catalog_id")
);