import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function Feed() {
    const URL = "http://127.0.0.1:8000/plants/plants/?format=json";
    const [data, setData] = useState([]);
    const { location } = useParams();

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                setData(data.sort((a, b) =>
                    a.time_till_next_watering - b.time_till_next_watering));
            })
    }, []);

    return (
        <ul>
            <li><span>Plant Name</span><span>Days till next water</span></li>
            {data.map((plant, index) => {
                return <li key={index}>
                    <Link to={{ pathname: `/plant/${plant.id}`, state: {background: location} }}>{plant.name}</Link>
                    <span>{plant.days_till_next_watering_min} - {plant.days_till_next_watering_max}</span>
                </li>
            })}
        </ul>
    )
}
