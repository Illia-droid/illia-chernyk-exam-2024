SELECT role, COUNT(*) AS count
FROM "Users"
GROUP BY role
ORDER BY role;