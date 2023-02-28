import React from "react";
import { usePage } from "@inertiajs/inertia-react";

const Test = () => {
    const { filters } = usePage().props;
    console.log(filters);
    return <div className="p-4 bg-white  text-primary">{filters.search}</div>;
};

export default Test;
