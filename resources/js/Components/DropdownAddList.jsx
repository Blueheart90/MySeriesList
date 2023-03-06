import { useState, createContext, useContext, Fragment } from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

const DropDownContext = createContext();

const DropdownAddList = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div>{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = () => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>
                <div class="flex px-4 py-4  bg-primary    ">
                    {/* <svg
                        class="w-6 mr-2 text-green-500 bg-white rounded-full"
                        x-show="editMode"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                        />
                    </svg> */}
                    <span
                        class="flex-grow select-none"
                        x-text="editMode ? 'Editar estado' : 'Añadir a mi lista'"
                    >
                        Añadir a mi lista
                    </span>

                    <svg
                        class="w-6 transition duration-500 ease-in-out cursor-pointer "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* Permite que cuando se hace click por fuera se cierre el desplegable */}
            {/* {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )} */}
        </>
    );
};

const Content = ({ contentClasses = " bg-secundary", children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`  z-50    shadow-lg `}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={
                            ` ring-1 ring-black ring-opacity-5 ` +
                            contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

DropdownAddList.Trigger = Trigger;
DropdownAddList.Content = Content;

export default DropdownAddList;
