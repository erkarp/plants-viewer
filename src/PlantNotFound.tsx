import React from "react";


export default function PlantNotFound(props) {
    return (
        <>
            <h1>Plant <code>{props.name}</code> not found.</h1>
            <h5>Would you like to go <a href="/">home</a>?</h5>
        </>
    )
}
