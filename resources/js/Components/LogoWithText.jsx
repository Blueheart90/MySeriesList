import React from "react";
import LogoSvg from "./svg/LogoSvg";
import { Link } from "@inertiajs/react";

const LogoWithText = ({ className, href = "/" }) => {
    return (
        <Link
            className={`flex items-center justify-center gap-2 text-2xl font-bold no-underline text-light hover:no-underline lg:text-3xl ${className}`}
            href={href}
        >
            <LogoSvg className=" fill-light" />
            MySeriesList
        </Link>
    );
};

export default LogoWithText;
