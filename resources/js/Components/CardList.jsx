import { useState } from "react";
import Pagination from "./Pagination";
import SerieCard from "./serieCard";

const CardList = ({
    data,
    pagination = false,
    currentPage,
    setCurrentPage,
}) => {
    const { results, total_pages } = data;

    return (
        <>
            <div className="flex flex-wrap justify-center gap-4">
                {results?.map((card) => (
                    <SerieCard serie={card} key={card.id} />
                ))}
            </div>
            {pagination && results ? (
                <Pagination
                    totalPages={total_pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : null}
        </>
    );
};

export default CardList;
