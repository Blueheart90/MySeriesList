import React from "react";
import FaceSadIcon from "./svg/FaceSadIcon";

const NoLoggingReview = () => {
    return (
        <div className="py-10 bg-secundary">
            <div className="flex items-center justify-center gap-4 mb-4">
                <FaceSadIcon className="w-8 stroke-kiwi" />
                <p className="text-xl text-kiwi">
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
