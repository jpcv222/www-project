CREATE OR REPLACE FUNCTION get_notifications_count(in_rowid_user INTEGER)
    RETURNS INTEGER AS
    $BODY$
	DECLARE
		err_context TEXT;
        v_notifications_count BIGINT; 

    BEGIN

        SELECT 
            COUNT(row_id) as notifications_count INTO v_notifications_count
        FROM ALERTS
        WHERE seen_ind = 0
        AND user_id = in_rowid_user;

        RETURN v_notifications_count;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'