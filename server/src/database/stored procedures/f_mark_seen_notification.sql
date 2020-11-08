CREATE OR REPLACE FUNCTION f_mark_seen_notification(in_rowid_alert INTEGER)
    RETURNS void AS
    $BODY$
	DECLARE
		err_context TEXT;
        CONST_SEEN INTEGER := 1; 

    BEGIN

        UPDATE ALERTS
        SET
            seen_ind = CONST_SEEN
        WHERE row_id = in_rowid_alert;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'