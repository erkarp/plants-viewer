import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
    const URL = "http://127.0.0.1:8000/plants/plants/?format=json"
    const [data, setData] = useState({ plants: [] });

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    return (
        <li>
            {data.plants.map(plant => {
                return <li key={plant.id}>{plant.name}: {plant.time_till_next_watering} days till water</li>
            })}
        </li>
    )
}

export default App;
