import React, { useEffect, useState } from "react";
import SortIcon from "./svg/SortIcon";
import { useSortTable } from "@/Hooks/useSortTable";
import WatchingStateSort from "./WatchingStateSort";
const TableList = ({ headers, fields, data }) => {
    const { lists, stateWatchingList } = data;
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [stateFilter, setStateFilter] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [dataTable, setDataTable] = useState(lists);

    const [getDataFiltered] = useSortTable(
        lists,
        sortColumn,
        sortOrder,
        stateFilter
    );

    useEffect(() => {
        setDataTable(getDataFiltered(searchText));
    }, [sortColumn, sortOrder, stateFilter, searchText]);

    return (
        <div className="">
            <div className="flex flex-col gap-4 px-2 lg:items-center lg:flex-row lg:justify-between text-kiwi">
                <WatchingStateSort
                    states={stateWatchingList}
                    stateFilter={stateFilter}
                    setStateFilter={setStateFilter}
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
                        {headers.map((header, index) => (
                            <th
                                key={index + header}
                                className={`p-3 ${
                                    index != 0 ? "text-left" : "text-center"
                                }`}
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
                            className="  bg-secundary  shadow-[2px_2px_0px_0px_#7ddb29] "
                        >
                            <td className="p-3">
                                <div className="flex align-items-center">
                                    <img
                                        className=" h-14 w-9"
                                        src={`https://www.themoviedb.org/t/p/w92${item.poster}`}
                                        alt=""
                                    />
                                    <div className="ml-3">
                                        <div className="">{item.name}</div>
                                        <div className="text-gray-500">
                                            mail@rgmail.com
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3">{item.score_id}</td>
                            <td className="p-3 font-bold">{item.type}</td>
                            <td className="p-3">
                                {item.season}/{item.episode}
                            </td>
                            <td className="p-3">
                                <a href="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </a>
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
        </div>
    );
};

export default TableList;
