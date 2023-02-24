import { useEffect, useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const [ArrPages, setArrPages] = useState([]);

    useEffect(() => {
        // Devulve un array de 7 o menos dependiendo del numero de paginas totales
        if (totalPages <= 6) {
            setArrPages(
                Array.from({ length: totalPages }, (value, index) => index + 1)
            );
        } else {
            setArrPages(Array.from({ length: 7 }, (v, i) => i + 1));
        }
    }, [totalPages]);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            if (ArrPages.indexOf(currentPage) == 3 && ArrPages[0] > 1) {
                setArrPages(Array.from(ArrPages, (x) => x - 1));
            }
            // setTimeout(function(){ a.scrollIntoView({ behavior: 'smooth' }); }, 500);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            if (ArrPages.indexOf(currentPage) < 3) {
                setCurrentPage(currentPage + 1);
            } else {
                // solo actializa el array si el ultimo item es menor del total de paginas
                if (ArrPages[ArrPages.length - 1] < totalPages) {
                    setArrPages(Array.from(ArrPages, (x) => x + 1));
                    setCurrentPage(currentPage + 1);
                } else {
                    // si el vector ya llego a su fin (el ultimo item es = total_pages, incrementa current_page)
                    setCurrentPage(currentPage + 1);
                }
            }
            // setTimeout(function () {
            //     a.scrollIntoView({ behavior: "smooth" });
            // }, 500);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="flex justify-center gap-2 px-4 mb-2 text-light ">
                <button
                    className={`px-4 transition-all duration-300 select-none text-xl font-extrabold text-light active:bg-kiwi  hover:bg-secundary rounded-lg active:text-secundary ${
                        currentPage === 1 ? "invisible" : null
                    }`}
                    onClick={prevPage}
                >
                    {"<"}
                </button>
                {ArrPages.map((item, id) => (
                    <span
                        key={id}
                        className={`px-4 py-1 rounded-lg font-bold transition-all duration-200 select-none   ${
                            currentPage === item
                                ? "bg-kiwi text-secundary "
                                : " text-light bg-secundary"
                        }`}
                    >
                        {item}
                    </span>
                ))}

                <button
                    className={`px-4 transition-all duration-300 select-none text-xl font-extrabold text-light active:bg-kiwi  hover:bg-secundary rounded-lg active:text-secundary ${
                        currentPage === totalPages ? " invisible" : null
                    }`}
                    onClick={nextPage}
                >
                    {">"}
                </button>
            </div>
            <span className="font-bold select-none text-light">
                {currentPage} de {totalPages}
            </span>
        </div>
    );
};

export default Pagination;
