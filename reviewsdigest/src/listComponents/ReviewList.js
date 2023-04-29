import {useState} from 'react'
import classes from './ReviewList.module.css'
import ReviewCard from '../components/ReviewCard'

function ReviewList(props) {
    const [reviews, setReviews] = useState([]);

    return (
        <ul className={classes.list}>
            {reviews.map(review => {
                return (<ReviewCard review={review}/>);
            })}
        </ul>
    ); 
};

export default ReviewList;