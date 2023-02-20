import React from "react";
import SerieCard from "./serieCard";

const CardList = ({ data }) => {
    return (
        <div className="flex flex-wrap gap-4 ">
            {data?.map((card) => (
                <SerieCard serie={card} key={card.id} />
            ))}
        </div>
    );
};

export default CardList;
