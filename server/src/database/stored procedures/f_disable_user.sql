CREATE OR REPLACE FUNCTION f_disable_user(in_row_id_user INTEGER)
    RETURNS void AS
    $BODY$
	DECLARE
		err_context TEXT;
        CONST_DISABLE INTEGER := 0; 

    BEGIN

        UPDATE USERS
        SET
            active_ind = CONST_DISABLE
        WHERE row_id = in_row_id_user;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'