import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getDate from "./utils/getDate";
import LoginForm from "./LoginForm";
import PlantCalendar from "./PlantCalendar";
import PlantNotFound from "./PlantNotFound";


export default function Plant(props) {
    let { id } = useParams();
    let url = `${process.env.__URL__}/plants/plants/${id}/?format=json`;
    const [data, setData] = useState([]);
    const [promptLogin, setPromptLogin] = useState(false);
    const [recentWater, setRecentWater] = useState(false);
    const [plantNotFound, setPlantNotFound] = useState(false);

    useEffect(() => {
        getPlantData()
    }, []);

    function getPlantData() {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!data.id) {
                    setPlantNotFound(true);
                    return;
                }

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

    function wateredToday() {
        const today = new Date();
        const water = new Date(`${data.latest_watering_date}T00:00:00`);

        return today.getFullYear() === water.getFullYear() &&
            today.getMonth() === water.getMonth() &&
            today.getDate() === water.getDate();
    }

    function water() {
        const access_token = localStorage.getItem('access');
        if (!access_token) {
            setPromptLogin(true);
            return;
        }

        fetch(`${process.env.__URL__}/plants/watering/`, {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"plant": id})
        }).then(data => {
            if (data.status >= 400) {
                console.log('failure');
                setPromptLogin(true);
            } else {
                console.log('success');
                setRecentWater(true);
                getPlantData();
            }
        }).catch(error => {
            console.log(`error: ${error}`);
            setPromptLogin(true);
        });
    }

    return (
        <main>
            {plantNotFound ?
                <PlantNotFound name={id}/> :
                <>
                    <h1>{data.name}</h1>

                    <ul>
                        <li><strong>Last Watered: </strong><span>{data.latest_watering_date}</span></li>
                        <li><strong>Light Needs: </strong><span>{data.lighting}</span></li>
                        <li><strong>Location: </strong><span>{data.spot}</span></li>

                        {data.species && data.species.fertilizer && data.species.fertilize_frequency &&
                            <>
                                <li>
                                    <strong>Fertilizer: </strong>
                                    <span>{data.species.fertilizer}</span>
                                </li>
                                <li>
                                    <strong>Fertilize frequency: </strong>
                                    <span>{data.species.fertilize_frequency}</span>
                                </li>
                            </>}
                    </ul>

                    {recentWater && <h4 className="wateredToday">Success!</h4>}

                    {wateredToday() ?
                        <h3 className="wateredToday">Watered Today</h3> :

                        promptLogin ?
                            <LoginForm setPromptLogin={setPromptLogin} water={water} {...props}/> :

                            data.watered && <button onClick={() => {water()}}>Water</button>
                    }

                    {data.watered && <PlantCalendar {...data}/>}
                </>
            }
        </main>
    )
}
