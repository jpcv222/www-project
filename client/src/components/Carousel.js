import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import './styles/Carousel.css'

export default function Carousell(props) {
    return (
        <Carousel>
            {props.images.map(image => (
                <Carousel.Item interval={100} key={image.id}>
                    <img
                        className="d-block w-100 img_car"
                        src={image.image}
                        alt={image.description}
                    />
                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            ))
            }
        </Carousel>
    )
}
