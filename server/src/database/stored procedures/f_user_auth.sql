CREATE OR REPLACE FUNCTION f_user_auth(in_json_txt JSON)
RETURNS SETOF USERS AS
$BODY$
DECLARE
    reg RECORD;
	err_context TEXT;
    v_identification BIGINT;
    v_password TEXT;
    v_current_latitude FLOAT;
    v_current_longitude FLOAT;
    v_rowid_user INTEGER;
BEGIN
        SELECT current_latitude INTO v_current_latitude FROM json_to_record(in_json_txt) AS x(current_latitude FLOAT);
        SELECT current_longitude INTO v_current_longitude FROM json_to_record(in_json_txt) AS x(current_longitude FLOAT);
        SELECT identification INTO v_identification FROM json_to_record(in_json_txt) AS x(identification BIGINT);
        SELECT row_id INTO v_rowid_user FROM USERS where identification = v_identification;
        SELECT password INTO v_password FROM json_to_record(in_json_txt) AS x(password TEXT);

        PERFORM  f_generate_alert(v_current_latitude,v_current_longitude,v_rowid_user);

        FOR REG IN
            SELECT *
                FROM USERS
                    WHERE   identification  = v_identification
                    AND     password        = v_password
            LOOP
            RETURN NEXT reg;
        END LOOP;
        RETURN;

    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
        RAISE INFO 'Error Name:%',SQLERRM;
        RAISE INFO 'Error State:%', SQLSTATE;
        RAISE INFO 'Error Context:%', err_context;
END
$BODY$ LANGUAGE 'plpgsql'

