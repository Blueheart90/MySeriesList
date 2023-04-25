import * as React from "react";
const SortIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        {...props}
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M4 6h7M4 12h7M4 18h9M15 9l3-3 3 3M18 6v12" />
    </svg>
);
export default SortIcon;
