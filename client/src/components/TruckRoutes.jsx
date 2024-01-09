import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../styles/TruckRoutes.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


export default function TruckRoutes() {
    let [routeData, setRouteData] = useState({});
    let [origin, setOrigin] = useState(["New York, NY"]);
    let [originCoords, setOriginCoords] = useState([]);
    let [destinations, setDestinations] = useState(["Los Angeles, CA", "Denver, CO"]);
    let [destinationCoords, setDestinationCoords] = useState([])
    const myAPIKey = "282e5784a0a84ae096ecc0252edc2c4a";

    /* ---------------------- Convert Names to Coordinates ---------------------- */
    const geocodeLocation = async (locationName) => {
        const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(locationName)}&apiKey=${myAPIKey}`;

        try {
            const response = await fetch(geocodingUrl);
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                return coordinates;
            } else {
                console.error(`No coordinates found for ${locationName}`);
                return null;
            }
        } catch (error) {
            console.error('Error geocoding:', error);
            return null;
        }
    };

    /* -------------------------- Get Coordinate Routes ------------------------- */
    const getRoute = async () => {
        const originCoordinates = await geocodeLocation(origin);

        if (originCoordinates) {
            setOriginCoords(originCoordinates);
        }

        const destinationCoordinates = await Promise.all(
            destinations.map(async (destination) => await geocodeLocation(destination))
        );

        if (destinationCoordinates.every(coord => coord !== null)) {
            setDestinationCoords(destinationCoordinates);

            const originCoordString = `${originCoordinates[1]},${originCoordinates[0]}`;
            const destinationCoordStrings = destinationCoordinates.map(coord => `${coord[1]},${coord[0]}`).join('|');

            const routingUrl = `https://api.geoapify.com/v1/routing?waypoints=${originCoordString}|${destinationCoordStrings}&mode=truck&units=imperial&details=instruction_details&apiKey=${myAPIKey}`;

            fetch(routingUrl)
                .then(res => res.json())
                .then(result => {
                    setRouteData(result);
                });
        }
    }

    /* --------------------------- Display Route on Map -------------------------- */
    const DisplayRoute = ({ routeData, originCoords, destinationCoords }) => {
        const map = useMap();

        useEffect(() => {
            if (routeData.features && routeData.features.length > 0) {
                try {
                    L.geoJSON(routeData, {
                        style: (feature) => {
                            return {
                                color: "rgba(20, 137, 255, 0.7)",
                                weight: 5,
                            };
                        },
                        onEachFeature: (feature, layer) => {
                            if (feature.properties && feature.properties.instruction) {
                                layer.bindPopup(feature.properties.instruction);
                            }
                        },
                    }).addTo(map);

                    const originLatLng = L.latLng(originCoords[1], originCoords[0])
                    const originContent = `Origin: ${origin}`;
                    L.marker(originLatLng).addTo(map).bindPopup(originContent);

                    destinationCoords.forEach((destination, index) => {
                        const destinationLatLng = L.latLng(destination[1], destination[0]);
                        const destinationContent = `${destinations[index]}`;

                        L.marker(destinationLatLng).addTo(map).bindPopup(destinationContent);
                    });
                } catch (error) {
                    console.error("Error displaying route:", error);
                }
            } else {
                console.error("No route data available");
            }
        }, [map, routeData, destinationCoords]);

        return null;
    };
    useEffect(() => {
        // console.log(origin, originCoords);
        console.log(destinationCoords);
    })

    return (
        <>
            <MapContainer center={[37.0902, -95.7129]} zoom={4}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DisplayRoute routeData={routeData} originCoords={originCoords} destinationCoords={destinationCoords} />
            </MapContainer>
            <button onClick={getRoute}>Get Directions</button>
        </>
    );
}
