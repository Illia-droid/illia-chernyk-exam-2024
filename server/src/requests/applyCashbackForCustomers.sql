WITH "cashback" AS (
    SELECT 
        "userId",
        SUM("prize") * 0.1 AS "cashback-amount" 
    FROM 
        "Contests"
    WHERE 
        "createdAt" BETWEEN '2024-11-11' AND '2025-01-14'
    GROUP BY 
        "userId"
)
UPDATE 
    "Users"
SET 
    "balance" = "balance" + "cashback"."cashback-amount"  
FROM 
    "cashback"
WHERE 
    "Users"."id" = "cashback"."userId";