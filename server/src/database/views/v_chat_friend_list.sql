CREATE OR REPLACE VIEW v_chat_friend_list AS(
    SELECT
        CONVERSATIONS.ts_creation,
        CONVERSATIONS.row_id,
        CONVERSATIONS.name AS conversation_name,
        patient_id,
        doctor_id,
        t_doctor.name AS doctor_name,
        t_patient.name AS patient_name
        FROM CONVERSATIONS
        LEFT JOIN USERS AS t_doctor
        ON CONVERSATIONS.doctor_id = t_doctor.row_id
        LEFT JOIN USERS AS t_patient
        ON CONVERSATIONS.patient_id = t_patient.row_id
);