import React from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";



const PatientsVenueMarkers = (props) => {
    return (
        props.patients.map(patient => (
            <Marker key={patient.identification} position={{ lat: patient.house_latitude, lng: patient.house_longitude }} icon={VenueLocationIcon} >
                <MarkerPopup name={patient.name} />
            </Marker>
        ))
    );
};

export default PatientsVenueMarkers;