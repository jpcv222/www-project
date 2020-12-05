CREATE OR REPLACE FUNCTION f_get_all_alerts()
RETURNS SETOF v_users_notifications AS
$BODY$
DECLARE
    reg RECORD;
	err_context TEXT;
BEGIN

    FOR REG IN
        SELECT *
            FROM v_users_notifications
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

