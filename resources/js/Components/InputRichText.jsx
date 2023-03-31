import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const InputRichText = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    console.log(convertedContent);

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html),
        };
    }
    return (
        <div className="text-black ">
            <Editor
                wrapperClassName="bg-secundary shadow-[5px_5px_0px_0px_#7ddb29]"
                editorClassName="text-light px-5 no-tailwindcss-base"
                toolbarClassName=""
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                    ],
                }}
            />
            <div
                className="p-5 bg-light no-tailwindcss-base"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}
            ></div>
        </div>
    );
};

export default InputRichText;
