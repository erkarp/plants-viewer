import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DayPicker from "react-day-picker";


export default function Plant() {
    let { id } = useParams();
    let url = `http://127.0.0.1:8000/plants/plants/${id}/?format=json`;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.watered = data.watered.map(date => {
                    return new Date(date)
                });
                console.log(data);
                setData(data);
            })
    }, []);

    return (
        <main>
            <h3>{id}</h3>

            <h4>Name</h4>
            <span>{data.name}</span>

            <h4>Last Watered</h4>
            <span>{data.latest_watering_date}</span>

            <h4>Next Watering</h4>
            <span>{data.time_till_next_watering}</span>

            <DayPicker initialMonth={new Date()} selectedDays={data.watered}/>
        </main>
    )
}
