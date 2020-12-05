CREATE OR REPLACE VIEW v_all_users_logs AS(
    SELECT 
        LOGS.*,
        USERS.identification,
        USERS.name
        FROM LOGS
        LEFT JOIN USERS
		ON USERS.row_id = LOGS.user_id
);