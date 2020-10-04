import React from 'react'
import './styles/Home.css'


export default class Home extends React.Component {
    
    componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        }
    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
