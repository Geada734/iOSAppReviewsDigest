import AppList from '../listComponents/AppList'
import ReviewList from '../listComponents/ReviewList'
import React, { useState } from 'react'
import appsFile from '../static/apps.json'

function MainContainer() {
    const apps = appsFile.apps;
    const [focused, setFocused] = useState(apps[0].id);
    const [page, setPage] = useState(1);

    function getAppName(appId){
        return apps.find(app => app.id === appId).name;
    };

    if(focused){
        return(
        <div>
            <div>
                <AppList focusAction={setFocused} apps={apps} pagingAction={setPage}/>
            </div>
            <div>
                <ReviewList  page={page} appId={focused} appName={getAppName(focused)} paginationAction={setPage}/>
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