import React from "react";

const SerieCard = ({ serie }) => {
    return (
        <figure
            className={` relative rounded-md overflow-hidden border-2 border-kiwi group  `}
        >
            <a href="#">
                <img
                    src={serie.poster_thumbnail}
                    alt="poster"
                    className="w-full transition duration-500 ease-in-out lazyload group-hover:opacity-50"
                />
            </a>
            <footer className="absolute left-0 right-0 px-4 py-2 transition-all duration-300 -bottom-full rounded-b-md group-hover:bottom-0">
                <span className="font-semibold select-none text-light text-md">
                    {serie.name}
                </span>
            </footer>
        </figure>
    );
};

export default SerieCard;
