import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const MyGallery = ({ data }) => {
    // data example
    // [
    //     {
    //         thumbnail: 'https://image.tmdb.org/t/p/w300//6Lw54zxm6BAEKJeGlabyzzR5Juu.jpg',
    //         source: 'https://image.tmdb.org/t/p/original//6Lw54zxm6BAEKJeGlabyzzR5Juu.jpg'
    //     }
    // ]
    const [toggler, setToggler] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleToggle = (index) => {
        setCurrentIndex(index);
        setToggler(!toggler);
    };

    return (
        <>
            <div className="flex flex-wrap gap-4 ">
                {data.map((item, index) => (
                    <figure
                        key={index}
                        className="overflow-hidden border-2 rounded-md border-kiwi"
                    >
                        <img
                            className="transition duration-500 ease-in-out hover:opacity-50"
                            src={item.thumbnail}
                            onClick={() => handleToggle(index)}
                        />
                    </figure>
                ))}
            </div>
            <FsLightbox
                sourceIndex={currentIndex}
                toggler={toggler}
                sources={data.map((item) => item.source)}
            />
        </>
    );
};

export default MyGallery;
