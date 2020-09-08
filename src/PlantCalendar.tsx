import React from "react";
import DayPicker from "react-day-picker";
import getDate from "./utils/getDate";

export default function Plant(props) {
    const modifiers = {
        watered: props.watered,
        fertilize: props.fertilized,
        nextWatering: {
            from: getDate(props.next_watering_min),
            to: getDate(props.next_watering_max)
        }
    };

    function getFirstWater() {
        const firstWater = props.watered[props.watered.length - 1];
        return new Date(firstWater.getFullYear(), firstWater.getMonth());
    }

    function numberOfMonths() {
        const firstWater = getFirstWater();
        const today = new Date();

        return today.getMonth() - firstWater.getMonth() + 1 +
            (12 * (today.getFullYear() - firstWater.getFullYear()))
    }

    return (
        <DayPicker
            modifiers={modifiers}
            numberOfMonths={numberOfMonths()}
            initialMonth={getFirstWater()}
            reverseMonths
            canChangeMonth={false}
        />
    )
}
