import React, { useState, useEffect } from "react";
import Switch from "react-switch";

export default function WaterForm(props) {
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    return (
        <form className="waterForm" onSubmit={props.handleWater}>
            <label style={{display: 'contents'}}>
                <span className="fertilizeLabel">Fertilize</span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    className="reactSwitch"
                />
            </label>
            <button className={`${checked ? 'fertilize' : ''}`} type="submit">Water</button>
        </form>
    )
}
