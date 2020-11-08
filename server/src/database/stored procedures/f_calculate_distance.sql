CREATE OR REPLACE FUNCTION f_calculate_distance(
    current_latitude float,
    current_longitude float,
    units varchar,
    row_id_user integer
)
RETURNS float AS $dist$
    DECLARE
        dist float = 0;
        radlat1 float;
        radlat2 float;
        theta float;
        radtheta float;
        v_house_latitude float;
        v_house_longitude float;
    BEGIN
        SELECT house_longitude  INTO v_house_longitude  FROM USERS WHERE row_id = row_id_user;
        SELECT house_latitude   INTO v_house_latitude   FROM USERS WHERE row_id = row_id_user;

        IF current_latitude = v_house_latitude OR current_longitude = v_house_longitude
            THEN RETURN dist;
        ELSE
            radlat1 = pi() * current_latitude / 180;
            radlat2 = pi() * v_house_latitude / 180;
            theta = current_longitude - v_house_longitude;
            radtheta = pi() * theta / 180;
            dist = sin(radlat1) * sin(radlat2) + cos(radlat1) * cos(radlat2) * cos(radtheta);

            IF dist > 1 THEN dist = 1; END IF;

            dist = acos(dist);
            dist = dist * 180 / pi();
            dist = dist * 60 * 1.1515;

            IF units = 'K' THEN dist = ROUND(dist * 1.609344);  END IF;
            IF units = 'N' THEN dist = ROUND(dist * 0.8684);    END IF;
			IF units = 'M' THEN dist = ROUND(dist * 1609.34);   END IF;

            RETURN dist;
        END IF;
    END;
$dist$ LANGUAGE plpgsql;

-- DISTANCIA ENTRE COLOMBIA Y RUSIA (PRUEBA)
-- SELECT f_calcular_distancia from f_calcular_distancia(4.570868, -74.297333, 61.52401, 105.318756, 'K');