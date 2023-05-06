import React from "react";

const CardListAside = ({ data, title, card: Card }) => {
    const { results } = data;
    return (
        <aside className="flex flex-col gap-4 p-4  bg-primary shadow-[5px_5px_0px_0px_#7ddb29] border border-kiwi ">
            <h3 className="text-lg font-bold text-light">{title}</h3>
            {results.map((item, index) => (
                <Card key={index + item.name} data={{ item, index }} />
            ))}
        </aside>
    );
};

export default CardListAside;
