import React, { useState, useEffect, useContext } from "react";
import { SubmissionContext } from "../context/SubmissionContext";
import "../styles/ShipmentList.css";

function App() {
    const [shipmentData, setShipmentData] = useState([]);
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
            // After deletion, fetch updated data
            fetchData();
        });
    };

    useEffect(() => {
        // Fetch data on the first render
        fetchData();
    }, []); // Empty dependency array ensures it runs only once on mount

    useEffect(() => {
        // Fetch data when submissionValue becomes true
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
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
