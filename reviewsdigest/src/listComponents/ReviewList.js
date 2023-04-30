import {useState, useEffect} from 'react'
import classes from './ReviewList.module.css'
import ReviewCard from '../components/ReviewCard'
import PaginationControl from '../components/PaginationControl'
import config from '../config/config.json'

function ReviewList(props) {
    const [reviews, setReviews] = useState([]);
    const [nextPage, setNextPage] = useState();

    useEffect(() => {
        setReviews([]);
        fetchReviews();
    }, [props.appId, props.page])

    function fetchReviews(){
        fetch(config.server + '/appReviews?app_id=' + props.appId + '&page=' + props.page)
        .then(res => res.json())
        .then(data => {
            setReviews(data.reviews);
            setNextPage(data.nextPage);
        })
        .catch(error => console.log("Error in REST response"))

    };

    function refreshReviews() {
        if (props.page === 1) {
            fetchReviews();
        }
        else {
            props.paginationAction(1);
        };
    };

    return (
        <div >
            <h2 className={classes.header}>{props.appName}</h2>
            <span className={classes.refresh} onClick={refreshReviews}>Refresh Feed</span>
            <br />
            <div class={classes.paginationControler}>
                <PaginationControl page={props.page} nextPage={nextPage} pagingAction={props.paginationAction}/>
            </div>
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