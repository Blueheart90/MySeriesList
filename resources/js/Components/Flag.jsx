import React from "react";

const Flag = ({ codeCountry, ...props }) => {
    return (
        <img
            {...props}
            src={`https://flagcdn.com/${codeCountry}.svg`}
            alt="South Africa"
        />
    );
};

export default Flag;
