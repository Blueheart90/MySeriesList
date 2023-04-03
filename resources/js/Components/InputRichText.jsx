import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import "../../css/customJoditStyle.css";

const InputRichText = ({
    placeholder = "Escribe lo que quieras aquí",
    height = 400,
}) => {
    const editor = useRef(null);
    const [content, setContent] = useState(null);

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

    // const handleUpdate = (content) => {
    //     const editorContent = content;
    //     console.log(editorContent);
    //     setContent(editorContent);
    // };

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };

    return (
        <div className=" no-tailwindcss-base custom-jodit-style">
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                // onBlur={handleUpdate}
                onChange={(value) => {
                    console.log(value);
                    setContent(value);
                }}
            />
            <div
                className="p-5 mt-10 text-current bg-red-300 no-tailwindcss-base"
                dangerouslySetInnerHTML={createMarkup(content)}
            ></div>
        </div>
    );
};

export default InputRichText;
