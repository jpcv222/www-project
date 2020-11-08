CREATE OR REPLACE FUNCTION f_validate_auth(in_json_txt JSON)
    RETURNS INTEGER
    AS
    $BODY$
        DECLARE
            err_context TEXT;
            v_err_code INTEGER := 0; /*0 inactivo, 1 no existe, 2 datos incorrectos, 3 existe, activo y correcto*/
            v_identification BIGINT;
			v_password TEXT;
            v_active INTEGER;
            CONST_INACTIVO INTEGER := 0;        

    BEGIN
	
    SELECT identification 
        INTO v_identification 
        FROM json_to_record(in_json_txt) 
            AS x(identification BIGINT);

        IF EXISTS (
            SELECT  1 
            FROM    USERS
            WHERE   identification = v_identification
        ) THEN
            SELECT password
                INTO v_password 
                FROM json_to_record(in_json_txt) 
                    AS x(password TEXT);

            IF EXISTS (
                SELECT  1 
                    FROM    USERS
                    WHERE   identification  = v_identification
                    AND     password        = v_password
            ) THEN
                SELECT active_ind
                    INTO v_active
                    FROM USERS
                    WHERE   identification  = v_identification
                    AND     password        = v_password;

                    IF (v_active = CONST_INACTIVO) THEN
                        v_err_code := 0;
                    ELSE
                        v_err_code := 3;
                    END IF;
            ELSE
                v_err_code := 2;
            END IF;
           
        ELSE
            v_err_code := 1;
        END IF;

        RETURN v_err_code;

        EXCEPTION WHEN OTHERS THEN
            GET STACKED DIAGNOSTICS err_context = PG_EXCEPTION_CONTEXT;
            RAISE INFO 'Error Name:%',SQLERRM;
            RAISE INFO 'Error State:%', SQLSTATE;
            RAISE INFO 'Error Context:%', err_context;

    END
$BODY$ LANGUAGE 'plpgsql'