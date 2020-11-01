CREATE OR REPLACE VIEW v_users_locations AS(
    SELECT
        row_id,
        identification,
        name,
        house_longitude,
        house_latitude
    FROM USERS              
);