CREATE OR REPLACE VIEW v_user_datatable AS(
    SELECT 
        ts_creation,
        name,
        lastname,
        identification,
        email,
        CASE
            WHEN role = 0 THEN CONCAT('SuperUsuario-',role)::TEXT
            WHEN role = 1 THEN CONCAT('Doctor-',role)::TEXT
            WHEN role = 2 THEN CONCAT('Paciente-',role)::TEXT
			ELSE 'Sin Rol'::TEXT
        END AS role,
        CASE
            WHEN active_ind = 0 THEN 'Inactivo'::TEXT
            ELSE 'Activo'::TEXT
        END AS active_ind,
	    row_id
    FROM USERS
                
);