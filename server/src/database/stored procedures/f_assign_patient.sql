CREATE OR REPLACE FUNCTION f_assign_patient(in_doctor_rowid INTEGER, in_patient_ident BIGINT)
    RETURNS void AS
    $BODY$
	DECLARE
        v_row_id_patient  INTEGER;
		err_context TEXT;
    BEGIN
        SELECT row_id INTO v_row_id_patient
            FROM USERS
        WHERE identification = in_patient_ident;

        INSERT INTO USERS_EXT(
            user_id,
            doctor_id
        )VALUES(
            v_row_id_patient,
            in_doctor_rowid
        );

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'