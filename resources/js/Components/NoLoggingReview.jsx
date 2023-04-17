import React from "react";
import FaceSadIcon from "./svg/FaceSadIcon";

const NoLoggingReview = () => {
    return (
        <div className="p-10 bg-secundary">
            <div className="flex flex-col items-center justify-center gap-4 mb-4 md:flex-row">
                <FaceSadIcon className="w-8 stroke-kiwi" />
                <p className="text-xl text-center text-kiwi">
                    Debes inciar sesion para hacer una reseña
                </p>
            </div>
            <div className="flex items-center justify-center divide-x">
                <a
                    className="px-4 transition-all duration-200 hover:text-kiwi "
                    href={route("login")}
                >
                    Iniciar sesion
                </a>

                <a
                    className="px-4 transition-all duration-200 hover:text-kiwi "
                    href={route("register")}
                >
                    Registrarse
                </a>
            </div>
        </div>
    );
};

export default NoLoggingReview;
