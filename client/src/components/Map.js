import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./VenueMarkers";

import "./styles/Map.css"
import "leaflet/dist/leaflet.css";

const MapComponent = (props) => {

    return (
        <Map center={{ lat: 3.42158, lng: -76.5205 }} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Markers
                position={{ lat: props.lat, lng: props.lng }}
                name={props.name}
            />
        </Map>
    );
};

export default MapComponent;