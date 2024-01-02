import React, { useState, useEffect } from "react";
import "../styles/ShipmentList.css";

function App() {
    const [shipmentData, setShipmentData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/shipments")
            .then((res) => res.json())
            .then((data) => setShipmentData(data))
    }, []);

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
                                <li className="destination">{location}</li>
                            ))}
                        </ol>
                        <button id="Delete Shipment" onClick={() => fetch(`http://localhost:8000/shipments/${data.id}`, { method: "DELETE" })}>Remove Shipment</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App