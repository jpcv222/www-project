CREATE DATABASE corona_tracking;

USE corona_tracking;

-- TABLA QUE GUARDARA LOS USUARIOS
CREATE TABLE USERS(
    ts_creation TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    row_id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    identification INTEGER NOT NULL,
    password VARCHAR(500) NOT NULL,
    role INTEGER NOT NULL,
    house_address VARCHAR(100) NOT NULL,
    house_longitude FLOAT NOT NULL,
    house_latitude FLOAT NOT NULL,
    active_ind INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT USERS_PK
        PRIMARY KEY (row_id),
    CONSTRAINT IDENTIFICATION_NO_REPEAT UNIQUE(identification)
);

-- TABLA PARA INDICAR LOS PACIENTES QUE TIENE CADA DOCTOR
CREATE TABLE USERS_EXT(
    ts_creation TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    row_id SERIAL NOT NULL,
    user_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    CONSTRAINT USERS_EXT_PK
        PRIMARY KEY (row_id),
    CONSTRAINT USERS_EXT_FK_USERS_1
        FOREIGN KEY (user_id)
        REFERENCES USERS(row_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT USERS_EXT_FK_USERS_2
        FOREIGN KEY (doctor_id)
        REFERENCES USERS(row_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT USERS_EXT_NO_REPEAT UNIQUE(user_id)
);

-- TABLA PARA GUARDAR LAS DIFERENTES LOCACIONES DE LOS USUARIOS
CREATE TABLE LOCATIONS(
    ts_creation TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    row_id SERIAL NOT NULL,
    user_id INTEGER NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    CONSTRAINT LOCATIONS_PK
        PRIMARY KEY (row_id),
    CONSTRAINT LOCATIONS_FK_USERS
        FOREIGN KEY (user_id)
        REFERENCES USERS(row_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- TABLA QUE GUARDARA LOS MENSAJES DEL CHAT
CREATE TABLE MESSAGES(
    ts_creation TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    row_id SERIAL NOT NULL,
    transmitter_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content VARCHAR(MAX) NOT NULL,
    CONSTRAINT MESSAGES_PK
        PRIMARY KEY (row_id),
    CONSTRAINT MESSAGES_FK_USERS_1
        FOREIGN KEY (transmitter_id)
        REFERENCES USERS(row_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT MESSAGES_FK_USERS_2
        FOREIGN KEY (receiver_id)
        REFERENCES USERS(row_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- TABLA QUE GUARDARA LAS ALERTAS PARA LOS USUARIOS
CREATE TABLE ALERTS(
    ts_creation TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    row_id SERIAL NOT NULL,
    user_id INTEGER NOT NULL,
    content VARCHAR(500) NOT NULL,
    seen_ind INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT ALERTS_PK
        PRIMARY KEY (row_id),
    CONSTRAINT ALERTS_FK_USERS_1
        FOREIGN KEY (user_id)
        REFERENCES USERS(row_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);