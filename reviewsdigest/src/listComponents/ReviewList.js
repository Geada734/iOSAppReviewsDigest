import {useState, useEffect} from 'react'
import ReviewCard from '../components/ReviewCard'
import PaginationControl from '../components/PaginationControl'
import config from '../config/config.json'
import classes from './ReviewList.module.css'

/* 
* Component that controls the page the app is currently on.    
*/
function ReviewList(props) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Resets the array while we wait for new data.
        setReviews([]);
        // Checks for data to populate from the app state.
        if(props.reviewData){
            setReviews(props.reviewData)
            props.reviewAction(null);
        }
        // If there is no state (first time opening the app),
        // calls the backend to populate the list and the state file
        // on server side.
        else{
            fetchReviews();
        }
    }, [props.appId, props.page])

    // Calls the backend to fetch new reviews, this also updates the state file on
    // server side.
    function fetchReviews(){
        fetch(config.server + '/appReviews?app_id=' + props.appId + '&page=' + props.page)
        .then(res => res.json())
        .then(data => {
            setReviews(data.reviews);
            props.setNextPage(data.nextPage);
        })
        .catch(error => console.log("Error in REST response"))

    };

    // Function for the 'Refresh Feed' clickable text.
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
            <div className={classes.paginationControler}>
                <PaginationControl page={props.page} nextPage={props.nextPage} pagingAction={props.paginationAction}/>
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