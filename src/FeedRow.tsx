import React from "react";
import { Link, useParams } from "react-router-dom";
import getDate from "./utils/getDate";

// @ts-ignore
import styles from "./feedrow.module";

export default function FeedRow(props) {
    const { location } = useParams();

    function daysDiff(d1, d2) {
        const t2 = parseInt(d2.getTime());
        const t1 = parseInt(d1.getTime());

        return Math.floor((t2-t1)/(24*3600*1000));
    }

    const today__max = props.next_watering_max === null ? null : daysDiff(new Date(), getDate(props.next_watering_max));
    const today__min = props.next_watering_min === null ? null : daysDiff(new Date(), getDate(props.next_watering_min));

    const formatBucket = function() {
        if (today__min === null || today__max === null) return 0;
        if (today__max < 0) return 1;
        if (today__min > 0) return 10;

        const min__max = daysDiff(getDate(props.next_watering_min), getDate(props.next_watering_max));
        return 10 - Math.abs(Math.floor(today__min*8/min__max));
    }();

    return (
        <li className={`${styles.row} feedRow-bucket--${formatBucket}`}>
            <Link to={{ pathname: `/plant/${props.id}`, state: {background: location} }}>{props.name}</Link>

            {formatBucket === 0 ? <span>unwatered</span> :

                today__max === 0 ?
                    <span><time dateTime={props.next_watering_max}>Today</time></span> :

                    today__max === 1 ?
                        <span><time dateTime={props.next_watering_max}>By tomorrow</time></span> :

                        today__max < 0 ?
                            <DaysLate max_date={props.next_watering_max} today__max={today__max}/> :

                            today__min <= 0 ?
                                <Within max_date={props.next_watering_max} today__max={today__max}/> :

                                <Between max_date={props.next_watering_max} today__max={today__max}
                                         min_date={props.next_watering_min} today__min={today__min}/>
            }
        </li>
    )
}

function DaysLate(props) {
    return (
        <span>
            <time dateTime={props.max_date}>{Math.abs(props.today__max)}</time>
            {' '}day{props.today__max < -1 ? 's' : ''} late
        </span>
    )
}

function Within(props) {
    return (
        <span>
            within <time dateTime={props.max_date}>{props.today__max}</time> days
        </span>
    )
}

function Between(props) {
    return (
        <span>
            in <time dateTime={props.min_date}>{props.today__min}</time> -
            {' '}<time dateTime={props.max_date}>{props.today__max}</time> days
        </span>
    )
}
