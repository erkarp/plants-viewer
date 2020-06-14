import React, { useState, useEffect } from "react";

function App() {
    const URL = "http://127.0.0.1:8000/plants/plants/?format=json";
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

    return (
        <ul>
            {data.map((plant, index) => {
                return <li key={index}>{plant.name}: {plant.time_till_next_watering} days till water</li>
            })}
        </ul>
    )
}

export default App;
