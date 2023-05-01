import classes from './ReviewCard.module.css'

/* 
* Layout used to display each component.    
*/
function ReviewCard(props) {
    // Takes in a review as a prop, and renders every value into the card.
    return (
        <div className={classes.reviewCard}>
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