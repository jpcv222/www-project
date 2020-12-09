CREATE OR REPLACE FUNCTION f_insert_conversation()
RETURNS TRIGGER AS 
$BODY$
    DECLARE
        v_doctor_name TEXT;
        v_patient_name TEXT;
        err_context TEXT;
BEGIN
    SELECT name 
        INTO v_doctor_name
	FROM USERS
    WHERE row_id = NEW.doctor_id;

    SELECT name 
        INTO v_patient_name
	FROM USERS
    WHERE row_id = NEW.user_id;

    INSERT INTO CONVERSATIONS(
        name,
        patient_id,
        doctor_id
    )VALUES(
        CONCAT(CONCAT('Doctor.',v_doctor_name)::TEXT,CONCAT(' Paciente.',v_patient_name)::TEXT)::TEXT,
        NEW.user_id,
        NEW.doctor_id
    );
RETURN NEW;
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
		    RAISE EXCEPTION 'Error Name:%',SQLERRM;
            RAISE EXCEPTION 'Error State:%', SQLSTATE;
            RAISE EXCEPTION 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'