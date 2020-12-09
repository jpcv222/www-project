CREATE OR REPLACE FUNCTION f_get_users(in_ind_rol INTEGER, in_row_id_user INTEGER) 
   RETURNS SETOF v_user_datatable AS
   $BODY$
DECLARE
	err_context TEXT;
   CONST_SUPER_USER INTEGER := 0;
   CONST_DOCTOR INTEGER := 1;
   CONST_PACIENTE INTEGER := 2;
	reg RECORD;
BEGIN
      IF (in_ind_rol = CONST_SUPER_USER) THEN
         FOR REG IN
            SELECT *
               FROM v_user_datatable
         LOOP
         RETURN NEXT reg;
         END LOOP;
         RETURN;
      ELSIF (in_ind_rol = CONST_DOCTOR) THEN
         FOR REG IN
            SELECT * 
               FROM v_user_datatable
            WHERE row_id IN (
               SELECT user_id
                  FROM USERS_EXT
               WHERE doctor_id = in_row_id_user
            )
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

