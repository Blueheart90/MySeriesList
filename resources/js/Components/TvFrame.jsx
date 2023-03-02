import React from "react";

const TvFrame = ({ children }) => {
    return (
        <div id="monitor">
            <div id="monitorscreen">{children}</div>
        </div>
    );
};

export default TvFrame;
