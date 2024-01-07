import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../styles/TruckRoutes.css";
import "leaflet/dist/leaflet.css";

export default function TruckRoutes() {
    let [routeData, setRouteData] = useState({});
    let [origin, setOrigin] = useState("New York, NY");
    let [destinations, setDestinations] = useState(["Los Angeles, CA"]);
    const myAPIKey = "282e5784a0a84ae096ecc0252edc2c4a";

    /* ---------------------- Convert Names to Coordinates ---------------------- */
    const geocodeLocation = async (locationName) => {
        const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationName)}&apiKey=${myAPIKey}`;

        try {
            const response = await fetch(geocodingUrl);
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                const { lon, lat } = data.features[0].geometry.coordinates;
                return [lat, lon]; // Return coordinates in [latitude, longitude] format
            } else {
                console.error(`No coordinates found for ${locationName}`);
                return null;
            }
        } catch (error) {
            console.error('Error geocoding:', error);
            return null;
        }
    };

    /* ------------------------- Post Coordinate Routes ------------------------- */
    // const fromWaypoint = [38.937165, -77.045590]; // latutude, longitude
    // const toWaypoint = [38.881152, -76.990693]; // latitude, longitude
    const routingUrl = `https://api.geoapify.com/v1/routing?waypoints=${origin}|${destinations}&mode=truck&units=imperial&details=instruction_details&apiKey=${myAPIKey}`;

    const getRoute = async () => {
        const originCoordinates = await geocodeLocation(origin);

        if (originCoordinates) {
            setOrigin(originCoordinates);
        }

        const destinationCoordinates = await Promise.all(
            destinations.map(async (destination) => await geocodeLocation(destination))
        );

        if (destinationCoordinates.every(coord => coord !== null)) {
            setDestinations(destinationCoordinates);

            fetch(routingUrl)
                .then(res => res.json())
                .then(result => setRouteData(result));
        }
    }

    useEffect(() => {
        console.log("Route Data:", routeData);
    }, [routeData]);
    /* -------------------------------------------------------------------------- */
    return (
        <>
            <MapContainer center={[37.0902, -95.7129]} zoom={4}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <button onClick={getRoute}>Get Directions</button>
        </>
    )
}