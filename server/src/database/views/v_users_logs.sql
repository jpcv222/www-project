CREATE OR REPLACE VIEW v_users_logs AS(
    SELECT   
		MAX(LOGS.ts_creation) last_login,
		COUNT(USERS.identification) login_count,
		USERS.identification,
		USERS.name,
		USERS.lastname
		FROM LOGS
		LEFT JOIN USERS
		ON USERS.row_id = LOGS.user_id
	WHERE EXTRACT(MONTH FROM LOGS.ts_creation) = EXTRACT(MONTH FROM NOW())
	GROUP BY USERS.identification, USERS.name, USERS.lastname
);