import React, { useState } from "react";

const WatchingStateSort = ({ states, stateFilter, setStateFilter, colors }) => {
    const handlefilter = (id) => {
        if (id === stateFilter) {
            setStateFilter(0);
        } else {
            setStateFilter(id);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-2 ">
            {states.map((state) => (
                <span
                    key={state.id}
                    onClick={() => handlefilter(state.id)}
                    className={`px-3 py-2 transition-all font-semibold duration-200  rounded-md cursor-pointer  select-none ${
                        stateFilter === state.id
                            ? `${
                                  colors[state.color]
                              } text-light    active:bg-kiwi/70 `
                            : "bg-secundary text-kiwi hover:bg-secundary/80 active:bg-secundary"
                    }`}
                >
                    {state.name}
                </span>
            ))}
        </div>
    );
};

export default WatchingStateSort;
