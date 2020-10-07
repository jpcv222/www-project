import React, { Component } from 'react'
import error from '../images/error.svg'
import { Link } from 'react-router-dom';
import './styles/NotFound.css'

export default class NotFound extends Component {
    GoBack = () => {
        window.history.back()
    }
    render() {
        return (
            <div className="NotFound_container">

                <div className="NotFound_image ">
                    <div className="go_back d-flex justify-content-center">
                        <button
                            onClick={() => this.GoBack()}
                            className="btn btn_www goback-btn"
                        >
                            Ir atras
                        </button>
                    </div>
                    <img
                        className="img-fluid mx-auto d-block" alt="404 NOT FOUND"
                        src={error}
                    />
                </div>

            </div>
        )
    }
}
