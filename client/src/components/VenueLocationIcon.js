import L from "leaflet";
import venue_location_icon from '../images/venue_location_icon.svg'

export const VenueLocationIcon = L.icon({
    icon: venue_location_icon,
    iconUrl: require('../images/venue_location_icon.svg'),
    iconRetinaUrl: require('../images/venue_location_icon.svg'),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
});