import React, { useState, useEffect } from "react";
import FeedRow from "./FeedRow";


export default function Feed() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.__URL__}/plants/plants/?format=json`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.sort((a, b) =>
                    a.time_till_next_watering - b.time_till_next_watering));
            })
    }, []);

    return (
        <ul>
            <li><span>Plant Name</span><span>Next Water</span></li>
            {data.map((plant, index) => {
                return <FeedRow {...plant} key={index}/>
            })}
        </ul>
    )
}
