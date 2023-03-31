import React, { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = ({ apiId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get(
                route("reviews.all", {
                    apiId,
                })
            )
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            });
    }, []);
    return (
        <div>
            <h2 className="my-4 text-xl font-bold text-light">Reviews</h2>
            <div className="divide-y divide-secundary">
                {reviews.map((review) => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </div>
    );
};

export default Reviews;
