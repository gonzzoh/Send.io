import React, { useState, useEffect, useContext } from "react";
import { SubmissionContext } from "../context/SubmissionContext";
import TruckRoutes from './TruckRoutes.jsx';
import "../styles/ShipmentList.css";

function App() {
    const [shipmentData, setShipmentData] = useState([]);
    const [routesFetched, setRoutesFetched] = useState(false);
    const { submissionValue, setSubmissionValue } = useContext(SubmissionContext);

    const fetchData = () => {
        fetch("http://localhost:8000/shipments")
            .then((res) => res.json())
            .then((data) => setShipmentData(data))
            .finally(() => {
                setSubmissionValue(false);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/shipments/${id}`, {
            method: "DELETE",
        }).then(() => {
            fetchData();
        });
    };

    useEffect(() => {
        fetchData();
    }, []); 

    useEffect(() => {
        if (submissionValue) {
            fetchData();
        }
    }, [submissionValue, setSubmissionValue]);

    return (
        <>
            <h1>Shipment List</h1>
            <div id="shipmentList">
                {shipmentData.map((data) => (
                    <div className="shipmentCard" key={data.id}>
                        <h2 className="shipmentId">Shipment ID: {data.id}</h2>
                        <TruckRoutes origin={data.origin} destinations={data.destinations} routesFetched={routesFetched} />
                        <p className="shipmentName">Driver's Name: {data.name}</p>
                        <p className="shipmentEmail">Driver's Email: {data.email}</p>
                        <p className="shipmentPhone">Driver's Phone Number: {data.phone_number}</p>
                        <p className="shipmentLoad">Load Weight: {data.load_weight}</p>
                        <p className="shipmentOrigin">Origin: {data.origin}</p>
                        <ol className="shipmentDestinations">
                            <h3 className="destinationHeader">Destinations</h3>
                            {data.destinations.map((location) => (
                                <li className="destination" key={location}>{JSON.parse(location).destination}</li>
                            ))}
                        </ol>
                        <button id="deleteShipment" onClick={() => handleDelete(data.id)}> Remove Shipment </button>
                        <button id="showRoute" onClick={() => setRoutesFetched(true)}> Show Shipping Route </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
