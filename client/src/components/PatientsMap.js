import React from "react";
import { Map, TileLayer } from "react-leaflet";
import PatientsVenueMarkers from "./PatientsVenueMarkers";

import "./styles/PatientsMap.css"
import "leaflet/dist/leaflet.css";

const PatientsMap = (props) => {

    return (
        <Map center={{ lat: 3.42158, lng: -76.5205 }} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <PatientsVenueMarkers
                patients={props.patients}
            />
        </Map>
    );
};

export default PatientsMap;