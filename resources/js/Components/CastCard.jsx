import React from "react";

const CastCard = ({ item }) => {
    return (
        <figure
            className={` relative rounded-md overflow-hidden border-2 border-kiwi group  `}
        >
            <img
                src={item.profile_path}
                alt={`Imagen de ${item.name}`}
                className="w-full transition duration-500 ease-in-out lazyload group-hover:opacity-50"
            />

            <footer className="absolute left-0 right-0 px-4 py-2 transition-all duration-300 -bottom-full rounded-b-md group-hover:bottom-0">
                <span className="block font-bold select-none text-light text-md">
                    {item.name}
                </span>
                <span className="select-none text-light text-md">
                    {item.character}
                </span>
            </footer>
        </figure>
    );
};

export default CastCard;
