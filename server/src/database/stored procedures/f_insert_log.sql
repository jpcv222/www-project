CREATE OR REPLACE FUNCTION f_insert_log(in_rowid_user INTEGER, in_action TEXT)
    RETURNS void AS
    $BODY$
	DECLARE
		err_context TEXT;
    BEGIN

        INSERT INTO LOGS(
            user_id,
            action
        )VALUES(
            in_rowid_user,
            in_action
        );

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'