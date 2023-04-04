import React, { useMemo } from "react";
import JoditEditor from "jodit-react";
import { useField, ErrorMessage } from "formik";
import DOMPurify from "dompurify";
import "../../css/customJoditStyle.css";

const InputRichText = ({
    placeholder = "Escribe lo que quieras aquí",
    height = 400,
    ...props
}) => {
    const [field, meta, helpers] = useField(props.name);

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

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };

    return (
        <div className=" no-tailwindcss-base custom-jodit-style">
            <JoditEditor
                value={meta.value}
                config={config}
                onBlur={field.onBlur}
                onChange={(value) => {
                    console.log(value);
                    helpers.setValue(value);
                }}
            />
            {/* <div
                className="p-5 mt-10 text-current bg-red-300 no-tailwindcss-base"
                dangerouslySetInnerHTML={createMarkup(content)}
            ></div> */}
        </div>
    );
};

export default InputRichText;
