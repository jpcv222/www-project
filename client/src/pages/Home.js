import React from 'react'
import './styles/Home.css'
// import socket from '../utils/Socket'
import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'
import { MDBIcon } from "mdbreact";
import axios from 'axios'

import Map from '../components/PatientsMap'
import DataTable from '../components/DataTable'

const config = require('../config/config');
export default class Home extends React.Component {
    state = {
        patients: [],
        datatable:{},
        checkbox: {},
    }

    async componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            
            // socket.emit('connection', { row_id: parseInt(resources_controller.GetSession("row_id")) })
            if (parseInt(resources_controller.GetSession("role")) === resources_controller.USER_ROL_NUMBER.DOCTOR) {
                await this.GetPatients();
                await this.GetPatientsAlerts();
            }
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
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}
