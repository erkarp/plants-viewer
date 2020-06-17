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
                data = {...data, ...data.species};
                console.log(data);
                setData(data);
            })
    }, []);

    const modifiers = {
        watered: data.watered,
        nextWatering: {
            from: new Date(data.next_watering_min),
            to: new Date(data.next_watering_max)
        }
    };

    return (
        <main>
            <h1>{data.name}</h1>

            <ul>
                <li><strong>Last Watered: </strong><span>{data.latest_watering_date}</span></li>
                <li><strong>Light Needs: </strong><span>{data.lighting}</span></li>
                <li><strong>Location: </strong><span>{data.spot}</span></li>
            </ul>

            <DayPicker modifiers={modifiers}/>
        </main>
    )
}
