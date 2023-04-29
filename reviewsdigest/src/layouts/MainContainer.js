import AppList from '../listComponents/AppList'
import appsFile from '../static/apps.json'
import classes from './MainContainer.module.css'
import React, { useState } from 'react';

function MainContainer() {
    const apps = appsFile.apps;
    const [focused, setFocused] = useState('main');

    function backToMain() {
        setFocused('main');
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
        </div>
    );
}

export default MainContainer;