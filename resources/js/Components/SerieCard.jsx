import React from "react";
import { Link } from "@inertiajs/react";

const SerieCard = ({ item }) => {
    return (
        <figure
            className={` relative rounded-md overflow-hidden border-2 border-kiwi group  `}
        >
            <Link href={route("serie.show", { id: item.id, slug: item.slug })}>
                <img
                    src={item.poster_thumbnail}
                    alt="poster"
                    className="w-full transition duration-500 ease-in-out lazyload group-hover:opacity-50"
                />
            </Link>
            <footer className="absolute left-0 right-0 px-4 py-2 transition-all duration-300 -bottom-full rounded-b-md group-hover:bottom-0">
                <span className="font-semibold select-none text-light text-md">
                    {item.name}
                </span>
            </footer>
        </figure>
    );
};

export default SerieCard;
