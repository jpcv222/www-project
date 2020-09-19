module.exports = {
    SERVER_PORT: 4000,
    application: {
        cors: {
            server: [
                {
                    origin: "*", //servidor que deseas "localhost:3000" que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }

    },
    DB_CREDENTIALS:{
        USER_NAME: "",
        HOST_NAME: "",
        DATABASE_NAME: "",
        PASSWORD: "",
        DB_PORT:  5432,
        SSL: false,        
    },
    ENCRYPTION_SECRET_KEY:  "www-project",
}