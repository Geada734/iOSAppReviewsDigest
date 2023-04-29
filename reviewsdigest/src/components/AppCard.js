import classes from './AppCard.module.css'

function AppCard(props) {
    function buttonClick(event, setFocused){
        setFocused(props.appId);
    }

    return (
        <div className={classes.appCard}>
            <h2>{props.name}</h2>
            <div>
                <span><i>{props.description}</i></span>
            </div>
            <br/>
            <span onClick={e => buttonClick(e, props.focusAction)} className={classes.goto}>Go to Reviews</span>
        </div>
    );

};

export default AppCard;