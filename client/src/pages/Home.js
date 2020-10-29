import React from 'react'
import './styles/Home.css'
import Carousel from '../components/Carousel'


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
