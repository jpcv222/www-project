import React from 'react'
import './styles/Home.css'
// import socket from '../utils/Socket'
import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'
import { MDBIcon } from "mdbreact";
import axios from 'axios'

import Map from '../components/PatientsMap'
import DataTable from '../components/DataTable'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

// Imagenes slider
import mascarilla from '../images/mascarilla.jpg'
import manos from '../images/manos.jpg'
import safety_suit from '../images/safety-suit.svg'
import distancia from '../images/distancia.jpg'

const config = require('../config/config');

const images = [
    {
        id: 4,
        image: distancia,
        description: "distancia"
    },
    {
        id: 2,
        image: mascarilla,
        description: "Como poner mascarilla"
    }, {
        id: 3,
        image: manos,
        description: "Como lavar manos"
    }

]
export default class Home extends React.Component {
    state = {
        patients: [],
        datatable: {},
        checkbox: {},
        datatable_logs: {},
        cant_patients: 0,
        cant_alerts: 0
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {

            // socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })
            if (parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR) {
                await this.GetPatients();
                await this.GetPatientsAlerts();
                await this.GetLogs();
            }
        }
    }

    GetCantAlerts = async () => {
        try {
            const data = this.state.datatable.rows;
            const count = data.length;

            console.log(count);

            this.setState({
                cant_alerts: count
            });


        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    GetCantPatients = async () => {
        try {
            const data = this.state.patients;
            const count = data.length;

            this.setState({
                cant_patients: count
            });

            console.log(this.state.cant_patients)

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    GetLogs = async () => {
        try {
            const data = {};
            data.role = resources_controller.GetSession("role");
            data.row_id = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/getLogs`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                const data = res.data;
                resources_controller.CambiarFechaJson("last_login", data);
                console.log(data);

                this.setState({
                    datatable_logs: {
                        columns: [

                            {
                                label: 'Identificacion',
                                field: 'identification',
                                width: 270,
                            },
                            {
                                label: 'Nombre',
                                field: 'name',
                                width: 270,
                            },
                            {
                                label: 'Inicios de sesión',
                                field: 'login_count',
                                width: 270,
                            },
                            {
                                label: 'Último login',
                                field: 'last_login',
                                width: 270,
                            }
                        ],
                        rows: data
                    }
                });
            }

            await this.GetCantAlerts();

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    GetPatients = async () => {
        try {
            const data = {};
            data.role = resources_controller.GetSession("role");
            data.row_id = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/getPatientsLocations`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {

                this.setState({
                    patients: res.data
                })

                await this.GetCantPatients();
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    GetPatientsAlerts = async () => {
        try {
            const data = {};
            data.role = resources_controller.GetSession("role");
            data.row_id = resources_controller.GetSession("row_id");

            const res = await axios.post(config.QUERY_SERVER_URI + `api/alerts/user/getAlerts`, data, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${this.state.token}`
                }
            });

            if (res.data.status === "error") {
                validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
            } else {
                const data = res.data;
                console.log(data);
                resources_controller.CambiarFechaJson("ts_creation", data)
                this.setState({
                    datatable: {
                        columns: [
                            {
                                label: 'Fecha',
                                field: 'ts_creation',
                                width: 270,
                            },
                            {
                                label: 'Identificacion',
                                field: 'identification',
                                width: 270,
                            },
                            {
                                label: 'Nombre',
                                field: 'name',
                                width: 270,
                            },
                            {
                                label: 'Mensaje de alerta',
                                field: 'content',
                                width: 270,
                            }
                        ],
                        rows: data
                    }
                });
            }

        } catch (error) {
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }
    }

    RefreshLocation = async () => {
        await this.GetPatients()
    }

    onCheckboxChange = (e) => {
        this.setState({
            checkbox: e,
        });
    }

    render() {
        return (
            <React.Fragment>

                {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR &&
                    <React.Fragment>
                        <div className="row mb-3" >
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-1">
                                <button onClick={this.RefreshLocation} className="btn btn-primary btn2" id="btn-location">
                                    <MDBIcon icon="sync-alt" size="2x" />
                                </button>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-1">
                                <p class="h2">Posicion registrada de mis pacientes</p>
                            </div>
                        </div>
                        <Map
                            patients={this.state.patients}
                        />
                        <hr></hr>
                        <DataTable
                            datatable={this.state.datatable}
                            onCheckboxChange={this.onCheckboxChange}
                            check={false}
                        />

                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-1">
                                <hr></hr>
                                <p class="h2">Reporte de sesiones</p>
                                <DataTable
                                    datatable={this.state.datatable_logs}
                                    onCheckboxChange={this.onCheckboxChange}
                                    check={false}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-1">
                                <hr></hr>
                                <p class="h2">Reportes estadísticos</p>
                                <center>
                                <Card
                                    title = "Cantidad de pacientes"
                                    value={this.state.cant_patients}
                                    description="Cantidad de pacientes asignados al médico actual"
                                />
                                </center>

                                <center>
                                <Card
                                    title = "Cantidad de alertas"
                                    value={this.state.cant_alerts}
                                    description="Cantidad de alertas que han sido registradas por los pacientes asignados al médico actual"
                                />
                                </center>
                                
                            </div>
                        </div>




                    </React.Fragment>
                }
                {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.PACIENTE &&
                    <React.Fragment>
                        <div className="row " >
                            <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12 mb-1">
                                <p class="h3">Recomendaciones de bioseguridad</p>
                            </div>
                            {/* <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mb-1">
                                <img src={safety_suit} alt="..." class="img-thumbnail"></img>
                            </div> */}

                        </div>
                        <hr></hr>
                        <Carousel
                            images={images}
                        />
                    </React.Fragment>

                }

                {parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.SUPER_USER &&
                    <React.Fragment>
                        
                    </React.Fragment>

                }
            </React.Fragment>
        )
    }
}
