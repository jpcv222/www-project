import md5 from 'md5';
import validations from './validations/main'
const resources_controller = {};

resources_controller.USER_ROL_NAME = {
    SUPER_USER: "SuperUsuario",
    DOCTOR: "Doctor",
    PACIENTE: "Paciente"
}
resources_controller.USER_ROL_NUMBER = {
    SUPER_USER: 0,
    DOCTOR: 1,
    PACIENTE: 2
}
resources_controller.USER_MODAL_ACTION = {
    see: 0,
    update: 1,
    insert: 2
}
resources_controller.localeFunc = (number, index, total_sec) => {
    return [
        ['justo ahora', 'ahora mismo'],
        ['%s seg atrás', 'en %s seg'],
        ['Hace 1 min', 'en 1 min'],
        ['%s mins atrás', 'en %s mins'],
        ['Hace 1 hora', 'en 1 hora'],
        ['%s horas', 'en %s horas'],
        ['Hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['Hace 1 semana', 'en 1 semana'],
        ['%s semanas atrás', 'en %s semanas'],
        ['Hace 1 mes', 'en 1 mes'],
        ['%s meses atrás', 'en %s meses'],
        ['Hace 1 año', 'en 1 año'],
        ['%s años atrás', 'en %s años']
    ][index];
};

resources_controller.SetSession = (data) => {
    for (var key in data) {
        sessionStorage.setItem(key, data[key]);
    }
};

resources_controller.ModifySession = (key, data) => {
    sessionStorage.setItem(key, data);
};

resources_controller.GetSession = (key) => {
    return sessionStorage.getItem(key);
};

resources_controller.isoToDate = (iso) => {

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const weekNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let date = new Date(iso);
    // const fechaCliente = date.getDay() + " de " + monthNames[date.getMonth() + 1] + " del " + date.getFullYear()
    // return fechaCliente;
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

resources_controller.isoToDateSecs = (iso) => {

    var now = new Date(iso);
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("/"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");

    return strDateTime;
}

resources_controller.FormatDateAMPM = (dateIso) =>{
    let date = new Date(dateIso)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    // let strTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + hours + ':' + minutes + ' ' + ampm;
    let strTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


resources_controller.dateToTs = (date) => {
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    return formatted_date;
}

resources_controller.Empty = (data) => {
    if (data === "" || data === null) {
        return true;
    } else {
        return false;
    }
}

resources_controller.Encrypt = (data) => {
    try {
        return md5(data);
    } catch (error) {
        console.log(error.message)
    }
}

resources_controller.CambiarFechaJson = (valorABuscar, json) => {
    json.forEach(function (elemento) {
        elemento[valorABuscar] = resources_controller.FormatDateAMPM(new Date(elemento[valorABuscar]))
    })
}

resources_controller.getNumbers = (str) => {
    return str.replace(/^\D+/g, '');
}

resources_controller.getLocation = () => {
    if (navigator.geolocation) {
        validations.SuccessToast("Tu dispositivo soporta la geolocalizacion");
        navigator.geolocation.getCurrentPosition(showPosition, LocationError,{enableHighAccuracy:true});
    } else {
        validations.ErrorToast("Tu dispositivo no soporta la geolocalizacion");
    }

}

const showPosition = (position) =>{
    resources_controller.ModifySession("latitude", position.coords.latitude);
    resources_controller.ModifySession("longitude", position.coords.longitude);
}

const LocationError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            validations.ErrorToast("El usuario ha denegado el permiso a la localización.")
            break;
        case error.POSITION_UNAVAILABLE:
            validations.ErrorToast("La información de la localización no está disponible.")
            break;
        case error.TIMEOUT:
            validations.ErrorToast("El tiempo de espera para buscar la localización ha expirado.")
            break;
        case error.UNKNOWN_ERROR:
            validations.ErrorToast("Ha ocurrido un error desconocido.")
            break;
    }
}

resources_controller.ValidateUser = (user) => {
    try {
        let results = [], result = true;
        results.push(!validateEmptyField(user.name));
        results.push(!validateEmptyField(user.lastname));
        results.push(!validateEmptyField(user.identification));
        results.push(!validateEmptyField(user.password));
        results.push(validateSelect(user.role));
        results.push(validateEmail(user.email));

        for (var element in results) {
            result = result && results[element];
        };
        if (!result) {
            validations.ErrorToast('Campos incorrectos, revise el formulario de registro');
        } else {
            if (resources_controller.GetSession("latitude") && resources_controller.GetSession("longitude")) {
                if (FieldIsBlank(resources_controller.GetSession("latitude")) || FieldIsBlank(resources_controller.GetSession("longitude"))) {
                    validations.ErrorToast('Debe Permitir obtener la ubicacion');
                    result = false;
                }
            } else {
                validations.ErrorToast('Debe Permitir obtener la ubicacion');
                result = false;
            }
        }
        return result;
    } catch (error) {
        validations.ErrorToast(error.message)
    }
}

resources_controller.ValidateLocation = () => {
    try {
        let result = true;
        if (resources_controller.GetSession("latitude") && resources_controller.GetSession("longitude")) {
            if (FieldIsBlank(resources_controller.GetSession("latitude")) || FieldIsBlank(resources_controller.GetSession("longitude"))) {            
                validations.ErrorToast('Debe Permitir obtener la ubicacion');
                result = false;
            }
        } else {
            validations.ErrorToast('Debe Permitir obtener la ubicacion');
            result = false;
        }
        return result;
    } catch (error) {
        validations.ErrorToast(error.message)
        return false;
    }
}

resources_controller.ValidateUserUpdate = (user) => {
    try {
        let results = [], result = true;
        results.push(!validateEmptyField(user.name));
        results.push(!validateEmptyField(user.lastname));
        results.push(!validateEmptyField(user.identification));
        results.push(validateSelect(user.role));
        results.push(validateEmail(user.email));

        for (var element in results) {
            result = result && results[element];
        };
        if (!result) {
            validations.ErrorToast('Campos incorrectos, revise el formulario de registro');
        }
        return result;
    } catch (error) {
        validations.ErrorToast(error.message)
    }
}
resources_controller.FieldIsBlank2 = (field) => {
    if (field === null || field === "") {
        return true;
    }
};
function validateEmptyField(field) {
    var re = /^\s+$/;
    return re.test(field) || field === null || field === "";
};
function FieldIsBlank(field) {
    if (field === null || field === "") {
        return true;
    }
};
function validateSelect2(field) {
    var re = /^[1-9]+[0-9]*$/;
    return re.test(field);
};
function validateSelect(field) {
    try {
        if(isNaN(parseInt(field))){
            return false;            
        }else{
            return true;
        }
    } catch (error) {
        return false;
    }
};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export default resources_controller;