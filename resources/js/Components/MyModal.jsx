import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CloseIcon from "./svg/CloseIcon";

const MyModal = ({ children, item, isOpen, setIsOpen }) => {
    const { name, poster } = item;
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform border shadow-[5px_5px_0px_0px_#7ddb29] backdrop-blur-sm bg-secundary/80 border-kiwi text-light ">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-kiwi"
                                    >
                                        {name}
                                    </Dialog.Title>
                                    <div className="flex ">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w342/${poster}`}
                                            alt="poster"
                                            className=" lazyload"
                                        />
                                        <div className="mt-2">{children}</div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MyModal;
