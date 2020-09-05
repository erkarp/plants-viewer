import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DayPicker from "react-day-picker";
import getDate from "./utils/getDate";
import LoginForm from "./LoginForm";


export default function Plant(props) {
    let { id } = useParams();
    let url = `${process.env.__URL__}/plants/plants/${id}/?format=json`;
    const [data, setData] = useState([]);
    const [promptLogin, setPromptLogin] = useState(false);
    const [recentWater, setRecentWater] = useState(false);

    useEffect(() => {
        getPlantData()
    }, []);

    const modifiers = {
        watered: data.watered,
        fertilize: data.fertilized,
        nextWatering: {
            from: getDate(data.next_watering_min),
            to: getDate(data.next_watering_max)
        }
    };

    function getPlantData() {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data.fertilized = [];

                data.watered = data.watered.map(obj => {
                    const date = getDate(obj.date);

                    if (obj.fertilized) {
                        data.fertilized.push(date);
                    }
                    return date;
                });

                data = {...data, ...data.species};
                setData(data);
            })
    }

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
        const water = new Date(`${data.latest_watering_date}T00:00:00`);

        return today.getFullYear() === water.getFullYear() &&
            today.getMonth() === water.getMonth() &&
            today.getDate() === water.getDate();
    }

    function water() {
        fetch(`${process.env.__URL__}/plants/watering/`, {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"plant": id})
        }).then(data => {
            const printableData = JSON.stringify(data);

            if (data.status >= 400 && data.status < 500) {
                console.log(`NOT logged in: ${printableData}`);
                setPromptLogin(true);
            } else {
                console.log(`logged in! ${printableData}`);
                setRecentWater(true);
                getPlantData();
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

            {recentWater && <h4 className="wateredToday">Success!</h4>}

            {wateredToday() ?
                <h3 className="wateredToday">Watered Today</h3> :

                promptLogin ?
                    <LoginForm setPromptLogin={setPromptLogin} water={water} {...props}/> :

                    data.watered && <button onClick={() => {water()}}>Water</button>
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
