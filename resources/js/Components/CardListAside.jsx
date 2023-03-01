import React from "react";

const CardListAside = ({ data, title }) => {
    const { results } = data;
    console.log(results);
    return (
        <aside className="flex flex-col gap-4 p-4 rounded-lg bg-secundary ">
            <h3 className="text-lg font-bold text-light">{title}</h3>
            {results.map((item, index) => (
                <div className="flex ">
                    <figure className="relative overflow-hidden border rounded-lg border-kiwi ">
                        <span className="absolute pl-3.5 pr-2  bg-kiwi rounded-br-md text-primary font-semibold  text-sm">
                            #{index + 1}
                        </span>
                        <span className="absolute bottom-0 right-0 px-2 text-sm font-semibold text-primary bg-kiwi rounded-tl-md">
                            {item.year}
                        </span>
                        <img
                            src={item.poster_thumbnail}
                            alt={`Poster de ${item.name}`}
                            className="w-32 "
                        />
                    </figure>
                    <div className="flex flex-col justify-around w-40 px-4">
                        <div className="">
                            <h3 className="font-bold text-kiwi ">
                                {item.name}
                            </h3>
                            <span className=" text-light">Tv Show</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm italic info text-light ">
                                Promedio de votos:
                            </span>
                            <span className="font-bold text-yellow-400 ">
                                {item.vote_average}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </aside>
    );
};

export default CardListAside;
