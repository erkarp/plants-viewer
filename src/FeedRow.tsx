import React from "react";
import { Link, useParams } from "react-router-dom";
import getDate from "./utils/getDate";

export default function FeedRow(props) {
    const { location } = useParams();

    function daysDiff(d1, d2) {
        const t2 = parseInt(d2.getTime());
        const t1 = parseInt(d1.getTime());

        return Math.floor((t2-t1)/(24*3600*1000));
    }

    const today__max = daysDiff(new Date(), getDate(props.next_watering_max));
    const today__min = daysDiff(new Date(), getDate(props.next_watering_min));

    return (
        <li>
            <Link to={{ pathname: `/plant/${props.id}`, state: {background: location} }}>{props.name}</Link>
            {today__max < 0 ?
                 <DaysLate today__max={today__max}/> :
                today__min < 0 ?
                    <Within today__max={today__max}/> :
                        <Between today__max={today__max} today__min={today__min}/>
            }
        </li>
    )
}

function DaysLate(props) {
    return (
    <span>
        <time dateTime={''}>{Math.abs(props.today__max)}</time> days late
    </span>
    )
}

function Within(props) {
    return (
        <span>
            <time dateTime={''}>{props.today__max}</time> days
        </span>
    )
}

function Between(props) {
    return (
        <span>
            <time dateTime={''}>{props.today__min}</time> - <time dateTime={''}>{props.today__max}</time> days
        </span>
    )
}
