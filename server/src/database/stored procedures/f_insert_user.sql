CREATE OR REPLACE FUNCTION f_insert_user(in_json_user JSON)
    RETURNS void AS
    $BODY$
	DECLARE
		err_context TEXT;
    BEGIN

        INSERT INTO USERS(
            name,
            lastname,
            identification,
            email,
            password,
            role,
            house_address,
            house_longitude,
            house_latitude
        )
        SELECT
            name,
            lastname,
            identification,
            email,
            password,
            role,
            house_address,
            house_longitude,
            house_latitude
        FROM json_to_record(in_json_user) AS x( 
            name TEXT,
            lastname TEXT,
            identification BIGINT,
            email TEXT,
            password TEXT,
            role INTEGER,
            house_address TEXT,
            house_longitude FLOAT,
            house_latitude FLOAT
        );

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'