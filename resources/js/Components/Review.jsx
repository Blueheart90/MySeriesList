import React from "react";
import Avatar from "./Avatar";
import BadgeLike from "./BadgeLike";
import BadgeScore from "./BadgeScore";
import { dateforHumans } from "@/utils/helpers";

const Review = ({ review }) => {
    return (
        <div className="py-10 ">
            <div class="flex gap-4 w-full">
                <Avatar
                    className="w-16 h-16"
                    src={`/storage/${review.user.profile_photo_path}`}
                    alt={`Foto de perfil de ${review.user.name}`}
                />
                <div class="flex justify-between w-full">
                    <div className="space-y-2 ">
                        <p className="font-bold text-kiwi">
                            {review.user.name}
                        </p>
                        <BadgeLike like={review.recommended} />
                        <BadgeScore score={review.tvlist.score_id} />
                    </div>
                    <div class="text-sm text-right text-gray-600 ">
                        <p>Publicado: {dateforHumans(review.created_at)}</p>
                        <p>Temp vistas: {review.tvlist.season}</p>
                        <p>Cap vistos: {review.tvlist.episode}</p>
                    </div>
                </div>
            </div>
            <div className="relative px-10 py-10 mt-4  bg-secundary shadow-[4px_4px_0px_0px_#7ddb29]">
                <p>{review.content}</p>
                {review.updated_at != review.created_at ? (
                    <p class="text-sm italic text-right text-gray-600  absolute  bottom-2.5 right-10 ">
                        Editada: {dateforHumans(review.updated_at)}
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default Review;
