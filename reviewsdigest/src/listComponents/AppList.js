import classes from './AppList.module.css'

function AppList(props) {

    function setFocused(event, appId){
        props.focusAction(appId);
    };

    return(
        <div className={classes.list}>
            <div className={classes.labelItem}>App: </div>
            {props.apps.map(app => {
                return (
                    <div className={classes.appItem} key={app.id}>
                        <span onClick={e => setFocused(e, app.id)}>{app.name}</span>
                    </div>
                );
            })}  
        </div>
    );
};

export default AppList;