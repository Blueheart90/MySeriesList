import { useState } from "react";

export function useSortTable(data) {
    const [orderedData, setOrderedData] = useState(data);

    const handleSorting = (sortColumn, sortOrder) => {
        const sorted = [...data].sort((a, b) => {
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

        setOrderedData(sorted);
    };
    return [orderedData, handleSorting];
}
