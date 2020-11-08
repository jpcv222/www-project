import React, { Component } from 'react'
import axios from 'axios'

import UpdateReadModal from '../components/UserManagementModal'
import AssignModal from '../components/AssignPatientModal'
import validations from '../resources/validations/main'

import './styles/UserManagement.css'
import Loading from './Loading';
import DataTable from '../components/DataTable'
import resources_controller from '../resources/resources_controller'
import { MDBIcon, MDBTooltip } from "mdbreact";
// import socket from '../utils/Socket'

const config = require('../config/config')
export default class user_management extends Component {
    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            await this.getUsers()
            resources_controller.ModifySession("latitude", "");
            resources_controller.ModifySession("longitude", "");
            // socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })
        }
    }

    state = {
        token: resources_controller.GetSession("token") === "" || resources_controller.GetSession("token") === null ? " " : resources_controller.GetSession("token"),
        loading: false,
        datatable: {},
        checkbox: {},
        manageUserModalShow: false,
        action: 0,
        modalTitle: "",
        assignModalShow: false,
        form: {
            name: "",
            lastname: "",
            identification: "",
            email: "",
            password: "",
            role: "default",
            house_address: ""
        },
        identificationAssing: ""
    }

    handleChangeAssing = e => {
        this.setState({
            identificationAssing: e.target.value,
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        try {
            if (resources_controller.ValidateUser(this.state.form)) {
                const data = this.state.form;
                data.password = resources_controller.Encrypt(data.password);
                data.house_address = "";
                data.house_longitude = resources_controller.GetSession("longitude");
                data.house_latitude = resources_controller.GetSession("latitude");

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + "api/user/manage/insertUser", data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    await this.getUsers();
                    this.setState({
                        loading: false,
                        form: {
                            name: "",
                            lastname: "",
                            identification: "",
                            email: "",
                            password: "",
                            role: "default"
                        },
                        checkbox: {}
                    });

                }

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }

    }
    onSubmitUpdate = async e => {
        e.preventDefault();
        try {
            if (resources_controller.ValidateUserUpdate(this.state.form)) {
                const data = this.state.form;

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updateUser/${this.state.checkbox.row_id}`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    await this.getUsers();
                    this.onUpdateModalHide()
                    this.setState({
                        loading: false,
                        checkbox: {}
                    });

                }

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }

    }
    onAssingPatient = async e => {
        e.preventDefault();
        try {
            if (!resources_controller.FieldIsBlank2(this.state.identificationAssing)) {
                const data = {}
                data.identification_patient = parseInt(this.state.identificationAssing);
                data.row_id_doctor = resources_controller.GetSession("row_id");

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + "api/user/manage/assignPatient", data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    await this.getUsers();
                    this.setState({
                        loading: false,
                        checkbox: {}
                    });
                    this.setState({ identificationAssing: "" })
                }

            }
            else {
                validations.ErrorToast("Hay campos vacios", "", "");
            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    getUsers = async () => {
        try {
            this.setState({ loading: true });
            const data = {};
            data.role = resources_controller.GetSession("role");
            data.row_id = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + "api/user/manage/getUsers", data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                this.setState({
                    loading: false
                });
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id)
            } else {
                const data = res.data;
                resources_controller.CambiarFechaJson("ts_creation", data)
                this.setState({
                    datatable: {
                        columns: [
                            {
                                label: 'Id',
                                field: 'row_id',
                                width: 270,
                            },
                            {
                                label: 'Creacion',
                                field: 'ts_creation',
                                width: 270,
                            },
                            {
                                label: 'Nombre',
                                field: 'name',
                                width: 270,
                            },
                            {
                                label: 'Apellido',
                                field: 'lastname',
                                width: 270,
                            },
                            {
                                label: 'Identificacion',
                                field: 'identification',
                                width: 270,
                            },
                            {
                                label: 'Correo',
                                field: 'email',
                                width: 270,
                            },
                            {
                                label: 'Rol',
                                field: 'role',
                                width: 270,
                            },
                            {
                                label: 'Ind. Activo',
                                field: 'active_ind',
                                width: 270,
                            },
                        ],
                        rows: data
                    }
                });
                this.setState({
                    loading: false,
                    checkbox: {}
                });
            }
        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    onCheckboxChange = (e) => {
        this.setState({
            checkbox: e,
        });
    }
    onUpdateModalHide = () => {
        this.setState({
            manageUserModalShow: false,
            form: {
                name: "",
                lastname: "",
                identification: "",
                email: "",
                password: "",
                role: "default"
            },
        });
        resources_controller.ModifySession("latitude", "");
        resources_controller.ModifySession("longitude", "");
    }

    onAssignModalHide = () => {
        this.setState({
            assignModalShow: false
        });
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleUpdateModal = () => {
        this.setState({
            manageUserModalShow: true,
            action: resources_controller.USER_MODAL_ACTION.update,
            modalTitle: "Datos del usuario " + this.state.checkbox.name,
            form: {
                name: this.state.checkbox.name,
                lastname: this.state.checkbox.lastname,
                identification: this.state.checkbox.identification,
                email: this.state.checkbox.email,
                password: "",
                role: resources_controller.getNumbers(this.state.checkbox.role),
            },
        })
    }
    handleInsertModal = () => {
        this.setState({
            manageUserModalShow: true,
            action: resources_controller.USER_MODAL_ACTION.insert,
            modalTitle: "Registro de usuarios",
            form: {
                name: "",
                lastname: "",
                identification: "",
                email: "",
                password: "",
                role: "default"
            },
        });
    }
    OnEditPass = async () => {
        if (!resources_controller.FieldIsBlank2(this.state.form.password)) {
            try {
                const data = {};
                data.password = resources_controller.Encrypt(this.state.form.password)
                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updatePassword/${this.state.checkbox.row_id}`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    await this.getUsers();
                    this.setState({
                        loading: false,
                        checkbox: {}
                    });

                }

            } catch (error) {
                this.setState({
                    loading: false
                });
                validations.ErrorToast("Ha ocurrido un error", error.message)
            }
        } else {
            validations.ErrorToast("Debe escribir una contraseña")
        }
    }

    DisableUser = async () => {
        try {
            this.setState({ loading: true });
            const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/disableUser/${this.state.checkbox.row_id}`, {}, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                this.setState({
                    loading: false
                });
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                validations.SuccessToast(res.data.description);
                await this.getUsers();
                this.setState({
                    loading: false,
                    checkbox: {}
                });

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }

    }
    EnableUser = async () => {
        try {
            this.setState({ loading: true });
            const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/enableUser/${this.state.checkbox.row_id}`, {}, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                this.setState({
                    loading: false
                });
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                validations.SuccessToast(res.data.description);
                await this.getUsers();
                this.setState({
                    loading: false,
                    checkbox: {}
                });

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }
    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div>
                {this.state.checkbox.checked &&
                    <div className="fixed-top actions">
                        {/* <span onClick={this.handleSeeModal} class="badge badge-pill light-blue p-2"><i class="fas fa-eye fa-2x" aria-hidden="true"></i></span> */}
                        <MDBTooltip domElement tag="span" placement="right">
                            <span onClick={this.handleUpdateModal} class="badge badge-pill orange p-2"><i class="fas fa-user-edit fa-2x" aria-hidden="true"></i></span>
                            <span>Actualizar</span>
                        </MDBTooltip>
                        {this.state.checkbox.active_ind === "Activo" &&
                            <MDBTooltip domElement tag="span" placement="right">
                                <span onClick={this.DisableUser} class="badge badge-pill red p-2"><i class="fas fa-user-times fa-2x" aria-hidden="true"></i></span>
                                <span>Inactivar</span>
                            </MDBTooltip>
                        }
                        {this.state.checkbox.active_ind != "Activo" &&
                            <MDBTooltip domElement tag="span" placement="right">
                                <span onClick={this.EnableUser} class="badge badge-pill green p-2"><i class="fas fa-user-check fa-2x" aria-hidden="true"></i></span>
                                <span>Activar</span>
                            </MDBTooltip>
                        }


                    </div>
                }
                <div className="float-right">
                    <MDBTooltip
                        domElement
                        tag="span"
                        placement="bottom"
                    >
                        <button
                            className="btn btn_www"
                            onClick={this.handleInsertModal}
                        >
                            <MDBIcon icon="user-plus" size="2x" />
                        </button>
                        <span>Crear usuario</span>
                    </MDBTooltip>
                    {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR &&
                        <MDBTooltip
                            domElement
                            tag="span"
                            placement="bottom"
                        >
                            <button
                                className="btn btn-primary"
                                onClick={() => this.setState({ assignModalShow: true })}
                            >
                                <MDBIcon icon="user-md" size="2x" />
                            </button>
                            <span>Asignar paciente</span>
                        </MDBTooltip>
                    }

                </div>

                <DataTable
                    datatable={this.state.datatable}
                    onCheckboxChange={this.onCheckboxChange}
                    check={true}
                />
                <UpdateReadModal
                    show={this.state.manageUserModalShow}
                    onHide={this.onUpdateModalHide}
                    title={this.state.modalTitle}
                    action={this.state.action}

                    onChange={this.handleChange}
                    form={this.state.form}
                    onSubmit={this.onSubmit}
                    editPass={this.OnEditPass}
                    onSubmitUpdate={this.onSubmitUpdate}
                />
                <AssignModal
                    show={this.state.assignModalShow}
                    onHide={this.onAssignModalHide}
                    title={"Asignar paciente"}

                    handleAssingPatient={this.onAssingPatient}
                    handleChangeAssing={this.handleChangeAssing}
                    identificationAssing={this.state.identificationAssing}
                />
            </div>
        )
    }
}
