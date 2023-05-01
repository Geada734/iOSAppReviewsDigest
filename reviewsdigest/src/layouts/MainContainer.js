import React, { useState, useEffect } from 'react'
import AppList from '../listComponents/AppList'
import ReviewList from '../listComponents/ReviewList'
import appsFile from '../static/apps.json'
import config from '../config/config.json'

/*
* Main container for the app's components.    
*/
function MainContainer() {
    // The values for the app state.
    const apps = appsFile.apps;
    const [focused, setFocused] = useState();
    const [page, setPage] = useState();
    const [nextPage, setNextPage] = useState(false);
    const [reviewData, setReviewData] = useState();

    useEffect(() => {
        // Calls the app state to check if there's one.
        fetch(config.server + '/appState')
        .then(res => res.json())
        .then(data => {
            // Checks for the 'data' key in the json, if it exists,
            // it passes the json values as props to the reviews list
            // components.
            if(data.hasOwnProperty("data")){
                setFocused(data.appId);
                setReviewData(data.data);
                setPage(Number(data.page));
                setNextPage(data.nextPage);
            }
            // Passes default data in case there is no populated app state.
            else {
                setPage(1);
                setFocused(apps[0].id);
            };
        });
    }, []);

    // Gets app name to display it on the reviews list.
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
                <ReviewList  page={page} appId={focused} appName={getAppName(focused)} 
                    paginationAction={setPage} nextPage={nextPage} setNextPage={setNextPage} 
                    reviewData={reviewData} reviewAction={setReviewData}/>
            </div>
        </div>);
    }
    // In case something goes wrong and there's no focused app.
    return (
        <div>
            <AppList focusAction={setFocused} apps={apps}/>
        </div>
    );
}

export default MainContainer;