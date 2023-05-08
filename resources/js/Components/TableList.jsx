import React, { useEffect, useState } from "react";
import SortIcon from "./svg/SortIcon";
import { useSortTable } from "@/Hooks/useSortTable";
import WatchingStateSort from "./WatchingStateSort";
import toast from "react-hot-toast";
import MyModal from "./MyModal";
import EditIcon from "./svg/EditIcon";
import TrashIcon from "./svg/TrashIcon";
import ConfirmModal from "./ConfirmModal";
const TableList = ({ headers, fields, data }) => {
    const { lists, stateWatchingList } = data;
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [stateFilter, setStateFilter] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [dataTable, setDataTable] = useState(lists);
    const [isOpen, setIsOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState({});

    const colorVariants = {
        green: "bg-green-600",
        blue: "bg-blue-600",
        yellow: "bg-yellow-600",
        red: "bg-red-600",
        purple: "bg-purple-600",
    };

    const [getDataFiltered] = useSortTable(
        lists,
        sortColumn,
        sortOrder,
        stateFilter
    );

    useEffect(() => {
        setDataTable(getDataFiltered(searchText));
    }, [sortColumn, sortOrder, stateFilter, searchText]);

    const handleOpenModal = (item) => {
        setIsOpen(true);
        setItemSelected(item);
    };

    const handleDelete = (item) => {
        const endPoint =
            item.type === "TvShow" ? "tvlist.destroy" : "movielist.destroy";
        axios
            .delete(route(endPoint, { id: item.id }))
            .then((res) => {
                const itemDeleted = res.data.list;
                // se actualiza el review en el array de reviews
                const filtered = dataTable.filter(
                    (list) => list.id !== itemDeleted.id
                );
                setTimeout(() => {
                    setDataTable(filtered);
                    toast.success(res.data.message, {
                        position: "bottom-left",
                        duration: 4000,
                    });
                    setIsLoading(false);
                }, 500);
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: "bottom-left",
                });
                console.log(error);
            });
    };

    return (
        <div className="">
            <div className="flex flex-col gap-4 px-2 lg:items-center lg:flex-row lg:justify-between text-kiwi">
                <WatchingStateSort
                    states={stateWatchingList}
                    stateFilter={stateFilter}
                    setStateFilter={setStateFilter}
                    colors={colorVariants}
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    className="pl-4 border-none rounded-md placeholder:text-light w-fulllg:max-w-xl grow focus:ring-kiwi focus:border-kiwi bg-secundary lg:order-first"
                    placeholder="Busca una serie o pelicula..."
                />
                <div className="flex items-center gap-2">
                    <label className=" whitespace-nowrap" htmlFor="sort">
                        Ordernar por:
                    </label>
                    <select
                        className="py-1 pl-4 text-sm rounded-sm focus:ring-kiwi focus:border-kiwi bg-secundary"
                        name={"sort"}
                        onChange={(e) => {
                            setSortColumn(e.target.value);
                        }}
                    >
                        {fields.map((field, index) => (
                            <option key={index} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={`p-1 rounded-md bg-secundary  ${
                                sortOrder == "asc"
                                    ? " border border-kiwi"
                                    : "border border-secundary"
                            }`}
                            onClick={() => {
                                setSortOrder("asc");
                            }}
                        >
                            <SortIcon className="w-6 rotate-180 stroke-kiwi" />
                        </button>
                        <button
                            type="button"
                            className={`p-1 rounded-md bg-secundary ${
                                sortOrder == "desc"
                                    ? " border border-kiwi"
                                    : "border border-secundary"
                            }`}
                            onClick={() => {
                                setSortOrder("desc");
                            }}
                        >
                            <SortIcon className="w-6 stroke-kiwi" />
                        </button>
                    </div>
                </div>
            </div>

            <table className="table w-full space-y-6 text-sm text-gray-400 border-separate border-spacing-y-4 ">
                <thead className="bg-kiwi text-primary">
                    <tr>
                        <th></th>
                        {headers.map((header, index) => (
                            <th
                                key={index + header}
                                className="p-3 text-center"
                            >
                                {header}
                            </th>
                        ))}
                        <th className="p-3 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody className=" text-kiwi">
                    {dataTable.map((item, index) => (
                        <tr
                            key={index + item.name}
                            className="text-center transition-all duration-300 bg-secundary hover:bg-secundary/80"
                        >
                            <td
                                className={`w-1 ${
                                    colorVariants[
                                        stateWatchingList[
                                            item.watching_state_id - 1
                                        ]?.color
                                    ]
                                } `}
                            ></td>
                            <td className="p-3">
                                <div className="flex align-items-center">
                                    <img
                                        className=" h-14 w-9"
                                        src={`https://www.themoviedb.org/t/p/w92${item.poster}`}
                                        alt=""
                                    />
                                    <div className="my-auto ml-3">
                                        <a
                                            href={route(
                                                item.type === "Movie"
                                                    ? "movie.show"
                                                    : "serie.show",
                                                {
                                                    id: item.api_id,
                                                }
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3">{item.score_id}</td>
                            <td className="p-3 font-bold">{item.type}</td>
                            <td className="p-3">
                                {item.type === "TvShow"
                                    ? `${item.season}/${item.episode}`
                                    : "---"}
                            </td>
                            <td className="p-3 space-x-2">
                                <button
                                    className="p-2 rounded-full hover:bg-primary/80"
                                    type="button"
                                    onClick={() => handleOpenModal(item)}
                                >
                                    <EditIcon className="w-6 h-6" />
                                </button>
                                <button
                                    className="p-2 rounded-full hover:bg-primary/80"
                                    type="button"
                                    onClick={() => handleOpenModal(item)}
                                >
                                    <TrashIcon className="w-6 h-6 stroke-red-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {dataTable.length == 0 && (
                <div className="p-10 bg-secundary">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <p className="text-xl text-kiwi">
                            No hay listas disponibles.
                        </p>
                    </div>
                </div>
            )}

            <ConfirmModal
                item={itemSelected}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleDelete={handleDelete}
                text="¿Esta seguro de eliminar esta lista?"
            />
        </div>
    );
};

export default TableList;
