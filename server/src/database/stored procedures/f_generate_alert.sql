CREATE OR REPLACE FUNCTION f_generate_alert(
    current_latitude float,
    current_longitude float,
    rowid_user integer
)
RETURNS void AS
$BODY$
DECLARE
	err_context TEXT;
    v_distance FLOAT;
BEGIN

    SELECT f_calculate_distance INTO v_distance FROM f_calculate_distance(current_latitude,current_longitude,'M',rowid_user);

    IF (v_distance > 300) THEN
        INSERT INTO ALERTS(
            user_id,
            content
        )VALUES(
            rowid_user,
            CONCAT(CONCAT('Estas retirado ',v_distance),' metros de tu ubicacion registrada, por favor vuelve a tu hogar 😢')::TEXT
        );
    ELSE
        -- INSERT INTO ALERTS(
        --     user_id,
        --     content
        -- )VALUES(
        --     rowid_user,
        --     'Estas cerca de tu ubicacion registrada, continúa asi 👍'
        -- );
    END IF;

    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
        RAISE INFO 'Error Name:%',SQLERRM;
        RAISE INFO 'Error State:%', SQLSTATE;
        RAISE INFO 'Error Context:%', err_context;
END
$BODY$ LANGUAGE 'plpgsql'

