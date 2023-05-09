import React, { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = ({ apiId, reviews, setReviews }) => {
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
            <h2 className="mb-4 text-2xl font-bold">Reseñas</h2>
            {reviews.length > 0 ? (
                <div className="divide-y divide-secundary">
                    {reviews.map((review) => (
                        <Review review={review} key={review.id} />
                    ))}
                </div>
            ) : (
                <div className="p-10 bg-secundary">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <p className="text-xl text-kiwi">
                            Aún no hay reseñas disponibles, sé el primero en dar
                            tu opinión.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
