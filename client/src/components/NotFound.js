import React, { Component } from 'react'
import error from '../images/error.svg'

export default class NotFound extends Component {
    render() {
        return (
            <div className="404">
                <img
                    className="img-fluid mx-auto d-block" alt="404 NOT FOUND"
                    src={error}
                />
            </div>
        )
    }
}
