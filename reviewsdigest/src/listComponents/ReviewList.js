import {useState, useEffect} from 'react'
import classes from './ReviewList.module.css'
import ReviewCard from '../components/ReviewCard'
import config from '../config/config.json'

function ReviewList(props) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if(!props.reviewsFromState){
            fetch(config.server + '/appReviews?app_id=' + props.appId)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
            .catch(error => console.log("Error in REST response"))
        } else {
            setReviews(props.reviewsFromState)
        }
    }, [])

    return (
        <ul className={classes.list}>
            {reviews.map(review => {
                return (
                    <li className={classes.reviewItem}>
                        <ReviewCard review={review}/>
                    </li>
                );
            })}
        </ul>
    ); 
};

export default ReviewList;