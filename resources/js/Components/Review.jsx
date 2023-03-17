import React, { useEffect, useState } from "react";

const Review = ({ apiId }) => {
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
            <h2 className=" text-light">Reviews</h2>
            {reviews.map((review) => (
                <div>
                    <div class="flex w-full">
                        {/* <img class="object-cover w-16 h-16 mr-4 rounded-full " src="{{ $review->user->profile_photo_url }}" alt="{{ $review->user->name }}" /> */}
                        <div class="flex justify-between w-full">
                            <div>
                                <p class="mb-2">{review.user.name}</p>
                                <div class="flex">
                                    {review.recommended ? (
                                        <>
                                            <div class="px-2 py-1 rounded-l-xl bg-cool-gray-600">
                                                {/* <x-like-svg class="text-green-400 " ></x-like-svg> */}
                                            </div>
                                            <span class="px-2 py-1 text-gray-800 bg-green-400 rounded-r-xl">
                                                Recomendado
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div class="px-2 py-1 rounded-l-xl bg-cool-gray-600">
                                                {/* <x-dislike-svg class="text-red-400 " ></x-dislike-svg> */}
                                            </div>
                                            <span class="px-2 py-1 text-gray-800 bg-red-400 rounded-r-xl">
                                                No Recomendado
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* <div class="text-sm text-right text-gray-600 ">
                            <p>Publicado: {{ $review->created_at->diffForHumans() }}</p>
                            <p>Temp vistas: {{ $review->tvlist->season }}</p>
                            <p>Cap vistos: {{ $review->tvlist->episode }}</p>
                        </div> */}
                        </div>
                    </div>
                    <p class="mt-4">{review.content}</p>
                    {/* @if ($review->updated_at != $review->created_at)
                    <p class="text-sm italic text-right text-gray-600 ">Editada {{ \Carbon\Carbon::parse($review->updated_at)->isoFormat('MMMM D, YYYY') }}</p>
                @endif */}
                </div>
            ))}
        </div>
    );
};

export default Review;
