const resources_controller = {};
const rsc = require('./constants/server_messages');

resources_controller.ESTADO_USUARIO = {
    INACTIVO: 0,
    NO_EXISTE: 1,
    DATOS_INCORRECTOS: 2,
    EMAIL_EXISTE: -1,
    IDENTIFICATION_EXISTE: -2,
    YA_ASIGNADO: -3
}


// Funcion para obtener el json del recurso para enviar al Cliente 
// el parametro traza sera opcional para cuando se llame un recurso
// de error, para mostrar un mensaje adecuado al cliente pero 
// igual tener una traza del error
resources_controller.leerRecurso = (keymsg, traza = "") => {
    try {
        let data = {
            id: 0000,
            description: "",
            status: ""
        };
        Object.keys(rsc).forEach(function (key) {
            var value = rsc[key];
            if (value.id == keymsg) {
                if (traza != "") {
                    value.traza = traza;
                    data = value;
                } else {
                    data = value;
                }
            } else {
                return "";
            }

        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

resources_controller.validarIdentification = (number) => {
    if ((!isNaN(number)) &&
        (number.toString().length >= 7) &&
        (number.toString().length <= 10) &&
        (number > 0)) {
        return true;
    } else {
        return false;
    }
}

module.exports = resources_controller;