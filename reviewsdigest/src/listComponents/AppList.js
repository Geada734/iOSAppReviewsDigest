import classes from './AppList.module.css'
import AppCard from '../components/AppCard'
import appsFile from '../static/apps.json'
import React, { useState } from 'react'

function AppList(props) {
    const apps = appsFile.apps;
    
    return(
        <ul className={classes.list}>
            {apps.map(app => {
                return (
                    <li className = {classes.appItem} key={app.id}>
                        <AppCard name={app.name} appId={app.id} description={app.description} focusAction={props.focusAction}/>
                    </li>
                );
            })}  
        </ul>
    );
};

export default AppList;