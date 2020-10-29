import React from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";



const VenueMarkers = (props) => {
    return (
    <Marker position={props.position} icon={VenueLocationIcon} >
        <MarkerPopup name={props.name} />
    </Marker>
    );
};

export default VenueMarkers;