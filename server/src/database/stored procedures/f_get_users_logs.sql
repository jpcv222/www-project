CREATE OR REPLACE FUNCTION f_get_users_logs() 
   RETURNS SETOF v_users_logs AS
   $BODY$
DECLARE
    err_context TEXT;
    reg RECORD;
BEGIN
        FOR REG IN
        SELECT *
            FROM v_users_logs
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
$BODY$ LANGUAGE 'plpgsql';

