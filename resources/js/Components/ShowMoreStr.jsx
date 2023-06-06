import React from "react";
import { useState } from "react";

const ShowMoreStr = ({ children, length = 250 }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <p>
            {showMore ? children : `${children.substring(0, length)}`}
            {children.length > length && (
                <button
                    className="block font-bold text-kiwi"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? "Ver menos" : "Ver más"}
                </button>
            )}
        </p>
    );
};

export default ShowMoreStr;
