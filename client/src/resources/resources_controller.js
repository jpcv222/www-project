const resources_controller = {};

resources_controller.localeFunc = (number, index, total_sec) => {
    return [
        ['justo ahora', 'ahora mismo'],
        ['%s segundos atrás', 'en %s segundos'],
        ['Hace 1 minuto', 'en 1 minuto'],
        ['%s minutos atrás', 'en %s minutos'],
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


resources_controller.dateToTs = (date) => {
    let current_datetime = new Date(date)
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    return formatted_date;
}

resources_controller.Empty = (data) =>{
    if(data === "" || data === null){
        return true;
    }else{
        return false;
    }
}


export default resources_controller;