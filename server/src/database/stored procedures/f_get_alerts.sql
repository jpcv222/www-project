CREATE OR REPLACE FUNCTION f_get_alerts(in_ind_rol INTEGER, in_row_id_user INTEGER) 
   RETURNS SETOF v_users_notifications AS
   $BODY$
DECLARE
	err_context TEXT;
   CONST_DOCTOR INTEGER := 1;
   CONST_PACIENTE INTEGER := 2;
	reg RECORD;
BEGIN
      IF (in_ind_rol = CONST_PACIENTE) THEN
         FOR REG IN
            SELECT *
               FROM v_users_notifications
            WHERE user_id = in_row_id_user
            ORDER BY 
               ts_creation DESC
         LOOP
         RETURN NEXT reg;
         END LOOP;
         RETURN;
      ELSIF (in_ind_rol = CONST_DOCTOR) THEN
         FOR REG IN
            SELECT * 
               FROM v_users_notifications
            WHERE user_id IN (
               SELECT user_id
                  FROM USERS_EXT
               WHERE doctor_id = in_row_id_user
            ) ORDER BY 
               user_id, 
               ts_creation DESC
         LOOP
         RETURN NEXT reg;
         END LOOP;
         RETURN;
      END IF;
  
 	  
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
        RAISE INFO 'Error Name:%',SQLERRM;
        RAISE INFO 'Error State:%', SQLSTATE;
        RAISE INFO 'Error Context:%', err_context;
END
$BODY$ LANGUAGE 'plpgsql';

