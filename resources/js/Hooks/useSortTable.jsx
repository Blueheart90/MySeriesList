export function useSortTable(data, sortColumn, sortOrder, stateFilter) {
    const handleSorting = () => {
        const sorted = [...data].sort((a, b) => {
            if (sortOrder === "desc") {
                return a[sortColumn]
                    .toString()
                    .localeCompare(b[sortColumn].toString(), "en", {
                        numeric: true,
                    });
            } else if (sortOrder === "asc") {
                return b[sortColumn]
                    .toString()
                    .localeCompare(a[sortColumn].toString(), "en", {
                        numeric: true,
                    });
            }
        });
        return sorted;
    };

    const handleWatchingStateFilter = () => {
        const sorted = handleSorting();
        if (stateFilter) {
            return sorted.filter(
                (item) => item.watching_state_id == stateFilter
            );
        }
        return sorted;
    };

    const getDataFiltered = (searchText) => {
        const filteredData = handleWatchingStateFilter();
        if (searchText) {
            return filteredData.filter((item) =>
                item?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        return filteredData;
    };

    return [getDataFiltered];
}
