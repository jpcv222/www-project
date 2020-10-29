CREATE OR REPLACE FUNCTION f_update_user_location(in_row_id_user INTEGER, in_house_longitude FLOAT, in_house_latitude FLOAT)
    RETURNS void AS
    $BODY$
	DECLARE
		err_context TEXT;
    BEGIN

        UPDATE USERS
        SET
            house_longitude = in_house_longitude,
            house_latitude  = in_house_latitude
        WHERE row_id = in_row_id_user;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'