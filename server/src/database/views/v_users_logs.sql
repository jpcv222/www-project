CREATE OR REPLACE VIEW v_users_logs AS(
    SELECT 
        LOGS.ts_creation,       
        USERS.identification,
        USERS.name,
        USERS.lastname,
        LOGS.action
        FROM LOGS
        LEFT JOIN USERS
        ON USERS.row_id = LOGS.user_id
);