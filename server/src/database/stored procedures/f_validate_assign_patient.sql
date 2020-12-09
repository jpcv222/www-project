CREATE OR REPLACE FUNCTION f_validate_assign_patient(in_doctor_rowid INTEGER,in_patient_ident BIGINT)
    RETURNS INTEGER
    AS
    $BODY$
        DECLARE
            v_row_id_patient  INTEGER;
            err_context TEXT;
            v_err_code INTEGER := 0; /*0 no existe, -2 existe y no esta asignado, -3 ya esta asignado*/

    BEGIN

        IF EXISTS 
        (
            SELECT 1 
            FROM USERS
            WHERE identification = in_patient_ident

        ) THEN
            SELECT row_id INTO v_row_id_patient
                FROM USERS
            WHERE identification = in_patient_ident;
            IF EXISTS (
                SELECT  1 
                FROM    USERS_EXT
                WHERE   user_id     = v_row_id_patient
                AND     doctor_id   = in_doctor_rowid
            )THEN
                v_err_code := -3;
            ELSE
                v_err_code := -2;
            END IF;          
        ELSE
            v_err_code := 0;
        END IF;

        RETURN v_err_code;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'