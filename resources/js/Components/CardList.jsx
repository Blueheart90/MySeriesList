import { useState } from "react";
import Pagination from "./Pagination";
import SerieCard from "./serieCard";
import { TailSpin } from "react-loader-spinner";

const CardList = ({
    data,
    pagination = false,
    currentPage,
    setCurrentPage,
    isLoading,
}) => {
    const { results, total_pages } = data;

    return (
        <>
            {isLoading ? (
                <TailSpin
                    height="80"
                    width="80"
                    color="#7ddb29"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="flex justify-center "
                    visible={true}
                />
            ) : (
                <>
                    {results?.length ? (
                        <div className="flex flex-wrap justify-center gap-4">
                            {results?.map((card) => (
                                <SerieCard serie={card} key={card.id} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-2xl text-center text-light">
                            No hay coincidencias
                        </p>
                    )}

                    {pagination && results?.length ? (
                        <Pagination
                            totalPages={total_pages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    ) : null}
                </>
            )}
        </>
    );
};

export default CardList;
