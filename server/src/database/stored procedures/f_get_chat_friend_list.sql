CREATE OR REPLACE FUNCTION f_get_chat_friend_list(in_ind_rol INTEGER, in_row_id_user INTEGER) 
   RETURNS TABLE(
       ts_creation TIMESTAMP,
       row_id INTEGER,
       conversation_name TEXT,
       receiver_id INTEGER
   ) AS
   $BODY$
DECLARE
	err_context TEXT;
    CONST_DOCTOR INTEGER := 1;
    CONST_PACIENTE INTEGER := 2;
BEGIN
    IF (in_ind_rol = CONST_DOCTOR) THEN
        RETURN QUERY
                SELECT  
                    CONVERSATIONS.ts_creation::TIMESTAMP AS ts_creation,
                    CONVERSATIONS.row_id::INTEGER AS row_id,
                    t_patient.name::TEXT AS conversation_name,
                    patient_id::INTEGER AS receiver_id
                FROM CONVERSATIONS
                LEFT JOIN USERS AS t_patient
                ON CONVERSATIONS.patient_id = t_patient.row_id
				WHERE CONVERSATIONS.doctor_id = in_row_id_user;
    ELSIF (in_ind_rol = CONST_PACIENTE) THEN
           RETURN QUERY
                SELECT  
                    CONVERSATIONS.ts_creation::TIMESTAMP AS ts_creation,
                    CONVERSATIONS.row_id::INTEGER AS row_id,
                    t_doctor.name::TEXT AS conversation_name,
                    doctor_id::INTEGER AS receiver_id
                FROM CONVERSATIONS
                LEFT JOIN USERS AS t_doctor
                ON CONVERSATIONS.doctor_id = t_doctor.row_id
				WHERE CONVERSATIONS.patient_id = in_row_id_user;
    END IF;
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
        RAISE INFO 'Error Name:%',SQLERRM;
        RAISE INFO 'Error State:%', SQLSTATE;
        RAISE INFO 'Error Context:%', err_context;
END
$BODY$ LANGUAGE 'plpgsql';

-- SELECT * FROM f_get_chat_friend_list(1,2)

