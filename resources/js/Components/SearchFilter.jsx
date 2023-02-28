import { useState, useEffect } from "react";
import { useDebounce } from "@/Hooks/useDebounce";
import SearchIcon from "./svg/SearchIcon";
import CardList from "./CardList";

const SearchFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // si tiene algo el string hace la peticion
        if (searchValue) {
            axios
                .get(
                    route("series.search", {
                        query: searchValue,
                        page: currentPage,
                    })
                )
                .then((res) => {
                    setFilterData(res.data);
                });
        } else {
            setFilterData([]);
        }
    }, [currentPage]);

    const debouncedRequest = useDebounce(() => {
        // send request to the backend
        if (searchValue) {
            axios
                .get(
                    route("series.search", {
                        query: searchValue,
                        page: currentPage,
                    })
                )
                .then((res) => {
                    setFilterData(res.data);
                });
        } else {
            setFilterData([]);
        }

        // access to latest state here
        console.log(searchValue);
    });

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        debouncedRequest();
    };
    return (
        <>
            <div className="w-2/3 mx-auto mb-10">
                <div className="flex overflow-hidden border-2 rounded-full bg-light focus-within:border-kiwi border-secundary">
                    <input
                        className="w-full pl-4 border-none bg-light focus:ring-0 "
                        placeholder="Busca una serie..."
                        value={searchValue}
                        onChange={handleChange}
                        type="search"
                    />
                    <div className="relative top-0 bottom-0 right-0 flex items-center gap-1 pl-4 pr-6 font-extrabold transition-all duration-500 text-secundary icon-lupa bg-kiwi">
                        <SearchIcon className="w-6 h-6 stroke-secundary" />
                    </div>
                </div>
            </div>
            {filterData && (
                <>
                    <h2 className="mb-10 text-2xl text-center text-light">
                        Resultados
                    </h2>
                    <CardList
                        data={filterData}
                        pagination={true}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </>
    );
};

export default SearchFilter;
