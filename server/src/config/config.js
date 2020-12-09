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
        HEROKU:{
            user: "myxwueailqqrou",
            host: "ec2-52-204-20-42.compute-1.amazonaws.com",
            database: "d8a0kbgu5fkliq",
            password: "53604f3ed83f3ecf688247b898636c2cf490d674f8a07d8653e1a404194ed67a",
            port:  5432,
            ssl: { rejectUnauthorized: false },
        },
        LOCALHOST:{
            user: "",
            host: "",
            database: "",
            password: "",
            port:  5432
        },
        URI: "postgres://myxwueailqqrou:53604f3ed83f3ecf688247b898636c2cf490d674f8a07d8653e1a404194ed67a@ec2-52-204-20-42.compute-1.amazonaws.com:5432/d8a0kbgu5fkliq"      
    },
    ENCRYPTION_SECRET_KEY:  "www-project",
}