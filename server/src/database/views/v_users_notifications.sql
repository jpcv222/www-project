CREATE OR REPLACE VIEW v_users_notifications AS(
    SELECT 
        ALERTS.*,
        USERS.identification,
        USERS.name
        FROM ALERTS
        LEFT JOIN USERS
        ON USERS.row_id = ALERTS.user_id
);