import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DayPicker from "react-day-picker";
import getDate from "./utils/getDate";


export default function Plant() {
    let { id } = useParams();
    let url = `${process.env.__URL__}/plants/plants/${id}/?format=json`;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.watered = data.watered.map(date => {
                    return getDate(date)
                });
                data = {...data, ...data.species};
                setData(data);
            })
    }, []);

    const modifiers = {
        watered: data.watered,
        nextWatering: {
            from: getDate(data.next_watering_min),
            to: getDate(data.next_watering_max)
        }
    };

    function getFirstWater() {
        const firstWater = data.watered[data.watered.length - 1];
        return new Date(firstWater.getFullYear(), firstWater.getMonth());
    }

    function numberOfMonths() {
        const firstWater = getFirstWater(), today = new Date();
        return today.getMonth() - firstWater.getMonth() + 1 +
            (12 * (today.getFullYear() - firstWater.getFullYear()))
    }

    function wateredToday() {
        const today = new Date();
        const water = new Date(data.latest_watering_date);

        return today.getFullYear() === water.getFullYear() &&
            today.getMonth() === water.getMonth() &&
            today.getDay() === water.getDate() + 1;
    }

    function water() {
        fetch(`${process.env.__URL__}/plants/watering/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `plant=${id}`
        }).then(data => {
            if (data.status === 403) {
                console.log(`NOT LOGGED IN: ${data}`)
            }
        });
    }

    return (
        <main>
            <h1>{data.name}</h1>

            <ul>
                <li><strong>Last Watered: </strong><span>{data.latest_watering_date}</span></li>
                <li><strong>Light Needs: </strong><span>{data.lighting}</span></li>
                <li><strong>Location: </strong><span>{data.spot}</span></li>
            </ul>

            {wateredToday() ?
                <h3 className="wateredToday">Watered Today</h3> :
                <button onClick={() => {water()}}>Water</button>
            }

            {data.watered &&
                <DayPicker
                    modifiers={modifiers}
                    numberOfMonths={numberOfMonths()}
                    initialMonth={getFirstWater()}
                    reverseMonths
                    canChangeMonth={false}
                />
            }
        </main>
    )
}
