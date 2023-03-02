import React from "react";

const GlitchText = ({ text, className = "" }) => {
    return (
        <p className={"glitch " + className}>
            <span aria-hidden="true">{text}</span>
            {text}
            <span aria-hidden="true">{text}</span>
        </p>
    );
};

export default GlitchText;
