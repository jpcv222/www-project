import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import seguridad from '../images/seguridad.png'
import seguridad2 from '../images/seguridad2.png'
import seguridad3 from '../images/seguridad3.png'

import './styles/Carousel.css'

const data = {
    img: seguridad2
}

export default function Carousell() {
    return (
        <Carousel>
            <Carousel.Item interval={200}>
                <img
                    className="d-block w-100 img_car"
                    src={data.img}
                    alt="First slide"
                />
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item interval={600}>
                <img
                    style={{maxHeight:"30%"}}
                    className="d-block w-100 img_car"
                    src={seguridad}
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={600}>
                <img
                    className="d-block w-100 img_car"
                    src={seguridad3}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}
