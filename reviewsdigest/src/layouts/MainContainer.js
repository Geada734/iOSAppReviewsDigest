import AppList from '../listComponents/AppList'
import ReviewList from '../listComponents/ReviewList'
import classes from './MainContainer.module.css'
import config from '../config/config.json'
import React, { useState, useEffect } from 'react';

function MainContainer() {
    const [focused, setFocused] = useState('main');
    const [state, setState] = useState({});

    useEffect(() => {
        getAppState();
    }, [])

    function getAppState() {
        fetch(config.server + '/appState', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            setState(data);
        })
        .catch(error => console.log("Error in REST response"))
    }

    function backToMain() {
        setFocused('main');
        getAppState();
    };

    if(focused === 'main'){
        return (
            <div>
                <h2 className={classes.header}>Available Apps:</h2>
                <AppList focusAction={setFocused}/>
            </div>
        );
    }
    return (
        <div>
            <span onClick={backToMain} className={classes.back}>Back</span>
            <ReviewList appId={focused} reviewsFromState={state.hasOwnProperty(focused) ? state[focused] : null}/>
        </div>
    );
}

export default MainContainer;