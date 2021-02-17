import React, { useState } from "react";
import Switch from "react-switch";

// @ts-ignore
import styles from "./waterform.module";

export default function WaterForm(props) {
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleWater(checked);
    };

    return (
        <form className={styles.waterForm} onSubmit={e => handleSubmit(e)}>
            <label style={{display: 'contents'}}>
                <span className={styles.fertilizeLabel}>Fertilize</span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    className={styles.reactSwitch}
                />
            </label>
            <button
                type="submit"
                className={`${styles.submit} ${checked ? styles.fertilize : ''}`}
            >
                Water
            </button>
        </form>
    )
}
