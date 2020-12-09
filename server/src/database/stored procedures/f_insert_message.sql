CREATE OR REPLACE FUNCTION f_insert_message(in_json_message JSON)
    RETURNS void AS
    $BODY$
	DECLARE
		err_context TEXT;
    BEGIN

        INSERT INTO MESSAGES(
            content,
            conversation_id,
            transmitter_id,
            receiver_id
        )
        SELECT
            content,
            conversation_id,
            transmitter_id,
            receiver_id
        FROM json_to_record(in_json_message) AS x( 
            content TEXT,
            conversation_id INTEGER,
            transmitter_id INTEGER,
            receiver_id INTEGER
        );

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'