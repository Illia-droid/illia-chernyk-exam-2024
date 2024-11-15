WITH "top-creator-users" AS (
    SELECT 
        "id", 
        "rating"
    FROM 
        "Users"
    WHERE
        role = 'creator'  
    ORDER BY 
        "rating" DESC        
    LIMIT 3             
)
UPDATE 
    "Users"
SET 
    "balance" = "balance" + 10
FROM 
    "top-creator-users"
WHERE 
    "Users"."id" = "top-creator-users"."id";