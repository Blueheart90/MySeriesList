import React from "react";

const MyButton = ({ disable, type, label, ...props }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <button
            {...props}
            type={type}
            disabled={disable}
            className={classNames(
                " duration-200 transition-all flex items-center justify-center gap-2 px-4 py-2 text-lg font-bold rounded-sm h-fit  text-secundary ",
                disable
                    ? "bg-kiwi/25"
                    : "bg-kiwi hover:bg-kiwi/75 active:bg-kiwi/50"
            )}
        >
            {label}
        </button>
    );
};

export default MyButton;
