import { useState } from "react";

export function useSortTable(data) {
    const [orderedData, setOrderedData] = useState(data);

    const handleSorting = (sortColumn, sortOrder) => {
        const sorted = [...orderedData].sort((a, b) => {
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

    const handleSearch = (searchText) => {
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setOrderedData(filtered);
    };
    return [orderedData, handleSorting, handleSearch];
}
