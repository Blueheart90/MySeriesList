import React from "react";
import LikeIcon from "./svg/LikeIcon";

const BadgeLike = ({ like = true }) => {
    return (
        <div class="flex bg-secundary rounded-xl overflow-hidden">
            <div class="px-2 py-1">
                <LikeIcon
                    className={`w-6  ${
                        !like ? "rotate-180 stroke-red-600" : "stroke-kiwi"
                    }`}
                />
            </div>
            <span
                class={`px-2 py-1 text-primary ${
                    like ? "bg-kiwi" : "bg-red-600"
                }  w-full text-center`}
            >
                {like ? "Recomendado" : "No recomendado"}
            </span>
        </div>
    );
};

export default BadgeLike;
