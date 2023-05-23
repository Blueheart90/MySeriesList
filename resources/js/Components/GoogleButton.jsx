import React from "react";
import GoogleIcon from "./svg/GoogleIcon";

const GoogleButton = () => {
    return (
        <>
            <hr className="h-px my-8 border-t-0 opacity-100 bg-kiwi " />
            <div className="flex flex-col items-center justify-center gap-4 ">
                <span className="text-sm text-kiwi">O ingresa con</span>
                <a
                    href={route("google.auth")}
                    className="flex px-6 py-2 text-lg font-bold transition duration-300 ease-in-out transform border group w-fit hover:bg-kiwi hover:text-secundary text-light border-kiwi "
                >
                    <GoogleIcon className="w-6 h-6 mr-2 transition duration-300 ease-in-out fill-kiwi group-hover:fill-secundary " />
                    Google
                </a>
            </div>
        </>
    );
};

export default GoogleButton;
