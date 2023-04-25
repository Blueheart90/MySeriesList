import React, { useEffect, useState } from "react";
import AddListSelect from "./AddListSelect";
import SortIcon from "./svg/SortIcon";
const TableList = ({ headers, list, fields }) => {
    const [data, setData] = useState(list);
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        console.log("cambió", sortColumn);

        const orderedData = [...data].sort((a, b) => {
            if (sortOrder == "asc") {
                return a[sortColumn]
                    .toString()
                    .localeCompare(b[sortColumn].toString(), "en", {
                        numeric: true,
                    });
            } else if (sortOrder == "desc") {
                return b[sortColumn]
                    .toString()
                    .localeCompare(a[sortColumn].toString(), "en", {
                        numeric: true,
                    });
            }
        });
        setData(orderedData);
    }, [sortColumn, sortOrder]);

    return (
        <div className="">
            <div className="flex items-center justify-end gap-2 text-kiwi">
                <div className="flex items-center gap-2">
                    <label htmlFor="sort">Ordernar por:</label>
                    <select
                        className="py-1 pl-4 text-sm rounded-sm focus:ring-kiwi focus:border-kiwi bg-secundary"
                        name={"sort"}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSortColumn(value);
                            console.log(value);
                        }}
                    >
                        {fields.map((field, index) => (
                            <option key={index} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                </div>
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
                    {data.map((item, index) => (
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
        </div>
    );
};

export default TableList;
