CREATE OR REPLACE FUNCTION f_user_auth(in_json_txt JSON)
RETURNS SETOF USERS AS
$BODY$
DECLARE
    reg RECORD;
	err_context TEXT;
    v_identification INTEGER;
    v_password TEXT;

BEGIN
    SELECT identification 
        INTO v_identification 
        FROM json_to_record(in_json_txt) 
            AS x(identification INTEGER);
    SELECT password
        INTO v_password 
        FROM json_to_record(in_json_txt) 
            AS x(password TEXT);

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

