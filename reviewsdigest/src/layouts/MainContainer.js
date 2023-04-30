import AppList from '../listComponents/AppList'
import ReviewList from '../listComponents/ReviewList'
import React, { useState } from 'react'
import appsFile from '../static/apps.json'

function MainContainer() {
    const apps = appsFile.apps;
    const [focused, setFocused] = useState(apps[0].id);

    function getAppName(appId){
        return apps.find(app => app.id === appId).name;
    };

    if(focused){
        return(
        <div>
            <div>
                <AppList focusAction={setFocused} apps={apps}/>
            </div>
            <div>
                <ReviewList appId={focused} appName={getAppName(focused)}/>
            </div>
        </div>);
    }
    
    return (
        <div>
            <AppList focusAction={setFocused} apps={apps}/>
        </div>
    );
}

export default MainContainer;