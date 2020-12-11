import React from 'react';
import './styles/Card.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBContainer } from "mdbreact";

export default function Card(props) {
    return (
<MDBContainer>
  <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
    <MDBCardHeader color="deep-orange lighten-1">{props.title}</MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle className="font-size align-center">{props.value}</MDBCardTitle>
      <MDBCardText className="align-center">
      {props.description}
      </MDBCardText>
    </MDBCardBody>
  </MDBCard>
</MDBContainer>

    )
}



