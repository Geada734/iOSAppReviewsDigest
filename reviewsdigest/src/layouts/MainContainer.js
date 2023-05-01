import AppList from '../listComponents/AppList'
import ReviewList from '../listComponents/ReviewList'
import React, { useState, useEffect } from 'react'
import appsFile from '../static/apps.json'
import config from '../config/config.json'

function MainContainer() {
    const apps = appsFile.apps;
    const [focused, setFocused] = useState();
    const [page, setPage] = useState();
    const [nextPage, setNextPage] = useState(false);
    const [reviewData, setReviewData] = useState();

    useEffect(() => {
        fetch(config.server + '/appState')
        .then(res => res.json())
        .then(data => {
            if(data.hasOwnProperty("data")){
                setFocused(data.appId);
                setReviewData(data.data);
                setPage(Number(data.page));
                setNextPage(data.nextPage);
            }
            else {
                setPage(1);
                setFocused(apps[0].id);

            };
        });
    }, []);

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
    
    return (
        <div>
            <AppList focusAction={setFocused} apps={apps}/>
        </div>
    );
}

export default MainContainer;