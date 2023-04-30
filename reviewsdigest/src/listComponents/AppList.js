import classes from './AppList.module.css'

function AppList(props) {

    function setApp(event, appId){
        props.pagingAction(1);
        props.focusAction(appId);
    };

    return(
        <div className={classes.list}>
            {props.apps.map(app => {
                return (
                    <div className={classes.appItem} key={app.id}>
                        <span onClick={e => setApp(e, app.id)}>{app.name}</span>
                    </div>
                );
            })}  
        </div>
    );
};

export default AppList;