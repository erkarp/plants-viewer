import React from "react";
import { Link, useParams } from "react-router-dom";

export default function FeedRow(props) {
    const { location } = useParams();

    return (
        <li>
            <Link to={{ pathname: `/plant/${props.id}`, state: {background: location} }}>{props.name}</Link>
            <span>{props.days_till_next_watering_min} - {props.days_till_next_watering_max}</span>
        </li>
    )
}
