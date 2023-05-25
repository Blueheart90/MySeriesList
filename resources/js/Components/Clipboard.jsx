import React from "react";
import PrimaryButton from "./PrimaryButton";
import CopyIcon from "./svg/CopyIcon";
import useCopyToClipboard from "@/Hooks/useCopyToClipboard";

const Clipboard = ({ copyText, className = "" }) => {
    const [value, copy] = useCopyToClipboard();

    const handleCopy = () => {
        console.log("copiando");
        copy(copyText);
    };

    const handleFocus = (e) => {
        e.target.select();
    };
    return (
        <div className={"my-4 " + className}>
            <p className="mb-2 text-sm font-semibold text-light">
                Compartir lista
            </p>
            <div className="flex items-center">
                <input
                    className="h-10 border border-r-0 bg-primary border-kiwi text-light"
                    type="text"
                    value={copyText}
                    readOnly
                    onFocus={handleFocus}
                />
                <PrimaryButton
                    className="h-10 text-sm bg-secundary"
                    onClick={handleCopy}
                >
                    <CopyIcon />
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Clipboard;
