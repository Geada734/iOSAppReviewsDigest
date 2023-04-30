import classes from './ReviewCard.module.css'

function ReviewCard(props) {
    return (
        <div className={classes.appCard}>
            <h2>{props.review.title}</h2>
            <div>
                <span><i>{props.review.content}</i></span>
            </div>
            <div>
                <span>Rating: <i>{props.review.rating + "/5"}</i></span>
            </div>
            <br/>
            <div>
                <span>{'By ' + props.review.author + ' on ' + props.review.date}</span>
            </div>
        </div>
    );
};

export default ReviewCard;