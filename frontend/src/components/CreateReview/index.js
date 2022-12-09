import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { thunkCreateReview } from '../../store/reviews'
import { thunkGetSpotById } from "../../store/spots";
import "./CreateReview.css"


function CreateReviewForm() {

    const history = useHistory();

    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);

    const user = useSelector((state) => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const newErrors = [];

        if (review.length <= 0) {
            newErrors.push("Please write a review.");
        }

        if (stars < 1 || stars > 5) {
            newErrors.push("Rating must be an integer from 1 to 5.");
        }

        setErrors(newErrors);
    }, [review, stars]);

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId)).then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitted(true)

        if (errors.length > 0) {
            return alert("invalid submission");
        }

        const payload = {
            spotId,
            review,
            stars,
        };

        const createdReview = dispatch(thunkCreateReview(payload));

        if (createdReview) {
            history.push(`/spots/${spotId}`);
        }
    };

    if (spot?.Owners?.id === user.id) {
        <Redirect to={`/spots/${spot.id}`} />;
    }

    const errorList = errors.map((error) => (
        <p key={error}>{error}</p>
    ))

    return (
        isLoaded && (
            <div className="create-review-container">
                <div className="create-review-wrapper">
                    <div className="create-review-container-left">
                        <div className="rate-review-title"><h2 >Rate & Review</h2></div>
                        <img className='spot-review-img' src={spot.Images[0].url} alt='' />
                        <div className="create-review-spot-details-container">
                            <div className="review-spot-name"> Stayed at
                                &nbsp;<span style={{ fontWeight: "bold" }}>{spot.name}</span>
                            </div>
                            <div className="review-spot-location">{spot.city}, {spot.state}, {spot.country}</div>
                            <div className="review-spot-owner">Stay hosted by
                                &nbsp;<span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    {spot.Owner.firstName} {spot.Owner.lastName}
                                </span>
                            </div>
                            <div className='review-spot-price'>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    ${spot.price}
                                </span>
                                &nbsp;night
                            </div>
                        </div>
                    </div>
                    <div className="create-review-container-right">
                        <form className="create-review-form" onSubmit={handleSubmit}>
                            <div className="create-review-header-container">
                                <h3 className="create-review-header">How was your stay?</h3>
                            </div>
                            <div className="create-review-errors">
                                {isSubmitted && errorList}
                            </div>
                            <div className="modal-body">
                                <label className="create-review-label">
                                    Describe Your Experince:
                                    <div className="create-review-input-container">
                                        <textarea
                                            className="review-input"
                                            type="string"
                                            placeholder="What was it like to stay here?"
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                        />
                                    </div>
                                </label>
                                <label className="create-review-label">
                                    Rating:
                                    <div className="rating-input-container">
                                        <input
                                            className="rating-input"
                                            type="number"
                                            placeholder="1 - 5 stars"
                                            minLength="1"
                                            maxLength="5"
                                            step="1"
                                            value={stars}
                                            onChange={(e) => setStars(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="review-submit-container">
                                <button
                                    className="create-review-button"
                                    type="submit"
                                    disabled={isSubmitted && errors.length > 0}
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}


export default CreateReviewForm;
