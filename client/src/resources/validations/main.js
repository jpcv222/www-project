import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

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