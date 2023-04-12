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
                setReviews(res.data);
            });
    }, []);
    return (
        <div>
            <h2 className="text-2xl font-bold">Reseñas</h2>
            <div className="divide-y divide-secundary">
                {reviews.map((review) => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </div>
    );
};

export default Reviews;
