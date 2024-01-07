import { MapContainer, TileLayer } from "react-leaflet";
import "../styles/TruckRoutes.css";
import "leaflet/dist/leaflet.css";

export default function TruckRoutes() {
    return (
        <MapContainer center={[37.0902, -95.7129]} zoom={4}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}