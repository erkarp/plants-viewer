import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";

import Feed from "./Feed";
import Plant from "./Plant";

// @ts-ignore
import styles from "./app.module";


export default function App() {
    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;

    return (
        <div className={styles.plants}>
            <Switch location={background || location}>
                <Route exact path="/" children={<Feed />} />
                <Route path="/plant/:id" children={<Plant location={location} />} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>

            {/*/!* Show the modal when a background page is set *!/*/}
            {/*{background && <Route path="/img/:id" children={<Modal />} />}*/}
        </div>
    );
}
