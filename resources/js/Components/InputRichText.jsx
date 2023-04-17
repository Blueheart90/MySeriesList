import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useDebounce } from "@/Hooks/useDebounce";
import { useField, ErrorMessage } from "formik";
import "../../css/customJoditStyle.css";

const InputRichText = ({
    placeholder = "Escribe lo que quieras aquí",
    height = 400,
    ...props
}) => {
    const [field, meta, helpers] = useField(props.name);

    const [richContent, setRichContent] = useState("");

    const config = useMemo(
        () => ({
            readonly: false,
            height: height,
            placeholder: placeholder,
            beautyHTML: true,
            toolbarButtonSize: "large",
            buttons: [
                "source",
                "|",
                "bold",
                "italic",
                "|",
                "ul",
                "ol",
                "|",
                "font",
                "fontsize",
                "brush",
                "paragraph",
                "|",
                "table",
                "link",
                "|",
                "left",
                "center",
                "right",
                "justify",
                "|",
                "undo",
                "redo",
                "|",
                "hr",
                "eraser",
                "fullsize",
            ],
            theme: "custom",
        }),
        []
    );

    const debouncedRequest = useDebounce(() => {
        // send request to the backend
        helpers.setValue(richContent);
        // access to latest state here
    });

    const handleChange = (e) => {
        setRichContent(e);
        debouncedRequest();
    };

    return (
        <div className=" no-tailwindcss-base custom-jodit-style">
            <JoditEditor
                value={meta.value}
                config={config}
                onBlur={field.onBlur}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputRichText;
