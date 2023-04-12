import React, { useContext, useState } from "react";
import { Disclosure } from "@headlessui/react";
import AddListForm from "./AddListForm";
import { ShowTvContext } from "@/Pages/Series/Show";

const AccordionAddList = () => {
    const { dataShow, updateDataShow } = useContext(ShowTvContext);
    const { editMode, info, scoreList, tvCheck, tvshow, stateWatchingList } =
        dataShow;
    const [isEditable, setIsEditable] = useState(editMode);
    return (
        <div className="w-full ">
            <Disclosure>
                {({ open, close }) => (
                    <>
                        <Disclosure.Button className="w-full ">
                            <div className="flex justify-between px-4 py-2 bg-primary ">
                                <div className="flex ">
                                    {isEditable && (
                                        <svg
                                            className="w-6 mr-2 text-green-500 bg-white rounded-full"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}

                                    <span className="select-none ">
                                        {editMode
                                            ? "Editar estado"
                                            : "Añadir a mi lista"}
                                    </span>
                                </div>

                                <svg
                                    className={`w-6 transition duration-500 ease-in-out cursor-pointer ${
                                        open ? "rotate-180 transform" : ""
                                    }   `}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel unmount={false}>
                            <AddListForm
                                close={close}
                                setIsEditable={setIsEditable}
                                isEditable={isEditable}
                            />
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default AccordionAddList;
