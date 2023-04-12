import React from "react";
import CardAside from "./CardAside";

const CardListAside = ({ data, title }) => {
    const { results } = data;
    return (
        <aside className="flex flex-col gap-4 p-4 rounded-lg bg-secundary ">
            <h3 className="text-lg font-bold text-light">{title}</h3>
            {results.map((item, index) => (
                <CardAside key={index + item.name} data={{ item, index }} />
            ))}
        </aside>
    );
};

export default CardListAside;
