import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import alertify from 'alertifyjs'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
alertify.set('notifier', 'position', 'top-right');


const validationController = {};

validationController.confirmacion = async () => {

    return Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras reversar esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    })

};
validationController.ErrorToast = (msg, traza = "", id = "") => {
    let mensaje = traza != "" && traza != null ? '🙁 ' + msg + ", " + traza : '🙁 ' + msg
    toast.error(mensaje, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    console.log(id);
}

validationController.SuccessToast = (msg) => {
    toast.success('😀 ' + msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

validationController.InfoToast = (msg) => {
    toast.info('💬 ' + msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

validationController.SuccessMessage = (estado, descripcion, id) => {
    Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: estado,
        text: descripcion,
        footer: id,
        showConfirmButton: true,
        // timer: 1500
    });
};

validationController.ErrorMessage = (estado, descripcion, id, traza = "") => {
    Swal.fire({
        // position: 'top-end',
        icon: 'error',
        title: estado,
        text: descripcion,
        footer: "<center>" + id + "<br/>" + traza + "</center>",
        showConfirmButton: true,
        // timer: 1500
    });
};

validationController.FieldError = () => {
    Swal.fire({
        // position: 'top-end',
        icon: 'error',
        title: "Error",
        text: "Debes llenar todos los campos",
        showConfirmButton: true,
        // timer: 1500
    });
};

validationController.showDescModal = (tittle, desc) => {
    Swal.fire({
        title: tittle,
        text: desc,
        showConfirmButton: false,
        showCloseButton: true,
    })
}


export default validationController;