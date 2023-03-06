import { router } from "@inertiajs/react";
import axios from "axios";
import { useState, useEffect } from "react";
import CardList from "./CardList";

const Tags = ({ tags }) => {
    const [filterGenres, setFilterGenres] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // convierte array a string separado por comas (,)
        const stringGenre = filterGenres.join();

        // si tiene algo el string hace la peticion
        if (stringGenre) {
            setIsLoading(true);
            axios
                .get(
                    route("series.genres", {
                        with_genres: stringGenre,
                        page: currentPage,
                    })
                )
                .then((res) => {
                    setFilterData(res.data);
                    setIsLoading(false);
                });
        } else {
            setFilterData([]);
        }
    }, [filterGenres, currentPage]);

    const handlerFilter = (genreId) => {
        setCurrentPage(1);
        // Si existe el genre se elimina del array, del lo contrario se agrega
        if (filterGenres.includes(genreId)) {
            const updatedGenres = filterGenres.filter(
                (genre) => genre != genreId
            );
            setFilterGenres(updatedGenres);
        } else {
            setFilterGenres([...filterGenres, genreId]);
        }
    };
    return (
        <>
            <div className="flex flex-wrap justify-center gap-3 px-4 mb-10">
                {tags.map((tag) => (
                    <span
                        key={tag.id}
                        onClick={() => handlerFilter(tag.id)}
                        className={`px-3 py-2 transition-all font-semibold duration-200 border rounded-md cursor-pointer select-none ${
                            filterGenres.includes(tag.id)
                                ? "bg-kiwi border-kiwi text-secundary active:bg-kiwi/70 "
                                : "bg-secundary text-light hover:bg-secundary/30 active:bg-secundary"
                        }`}
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
            {filterData && (
                <CardList
                    data={filterData}
                    pagination={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default Tags;
