import { Link } from "@inertiajs/react";
import React from "react";

const LinkCustom = ({ href, styles, children }) => {
    return (
        <Link
            href={href}
            className={` w-fit font-bold transition duration-300 ease-in-out transform rounded-xl  text-lg   ${styles}`}
        >
            {children}
        </Link>
    );
};

export default LinkCustom;
