import {useState, useEffect} from 'react'
import classes from './ReviewList.module.css'
import ReviewCard from '../components/ReviewCard'
import config from '../config/config.json'

function ReviewList(props) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        setReviews([]);
        fetchReviews();
    }, [props.appId])

    function fetchReviews(){
        fetch(config.server + '/appReviews?app_id=' + props.appId)
        .then(res => res.json())
        .then(data => {
            setReviews(data);
        })
        .catch(error => console.log("Error in REST response"))

    };

    function refreshReviews() {
        setReviews([]);
        fetchReviews();
    };

    return (
        <div >
            <h2 className={classes.header}>{props.appName}</h2>
            <span className={classes.refresh} onClick={refreshReviews}>Refresh Feed</span>
            <ul className={classes.reviewList}>
                {reviews.map(review => {
                    return (
                        <li className={classes.reviewItem} key={review.id}>
                            <ReviewCard review={review}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    ); 
};

export default ReviewList;