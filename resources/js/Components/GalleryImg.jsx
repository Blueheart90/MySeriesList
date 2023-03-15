import React from "react";

const GalleryImg = ({ item, name = "" }) => {
    return (
        <a
            data-lg-size={`${item.width}-${item.height}`}
            className="overflow-hidden border-2 rounded-md cursor-pointer gallery-item border-kiwi "
            data-src={`http://image.tmdb.org/t/p/original${item.file_path}`}
            data-sub-html={`<h4>${name}</h4><p>size: (${item.width}x${item.height})</p> `}
        >
            <img
                className="transition duration-500 ease-in-out img-responsive hover:opacity-50 "
                src={`http://image.tmdb.org/t/p/w500${item.file_path}`}
            />
        </a>
    );
};

export default GalleryImg;
