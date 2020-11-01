CREATE OR REPLACE FUNCTION f_get_conversation_msg(in_id_conversation INTEGER)
RETURNS SETOF MESSAGES AS
$BODY$
DECLARE
    reg RECORD;
	err_context TEXT;
BEGIN

    FOR REG IN
        SELECT *
            FROM MESSAGES
                WHERE   conversation_id = in_id_conversation
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

