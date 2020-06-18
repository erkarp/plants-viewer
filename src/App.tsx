import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";

import Feed from "./Feed";
import Modal from "./Modal";
import Plant from "./Plant";


export default function ModalGalleryExample() {
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
        <div className="plants">
            <Switch location={background || location}>
                <Route exact path="/" children={<Feed />} />
                <Route path="/plant/:id" children={<Plant location={location} />} />
            </Switch>

            {/* Show the modal when a background page is set */}
            {background && <Route path="/img/:id" children={<Modal />} />}
        </div>
    );
}
