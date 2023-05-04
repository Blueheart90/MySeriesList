import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ConfirmModal = ({ isOpen, setIsOpen, text, item, handleDelete }) => {
    const { name, poster } = item;
    function closeModal() {
        setIsOpen(false);
    }

    const handleOk = () => {
        handleDelete(item);
        closeModal();
    };
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
                                        className="mb-4 text-lg font-medium leading-6 text-kiwi"
                                    >
                                        {name}
                                    </Dialog.Title>
                                    <div className="flex gap-4">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185/${poster}`}
                                            alt="poster"
                                            className=" lazyload"
                                        />
                                        <div className="flex flex-col justify-between text-xl ">
                                            <section>
                                                <h2 className=" text-kiwi">
                                                    {text}
                                                </h2>
                                                <p className="text-base italic">
                                                    Si elimina el elemento, se
                                                    eliminara junto con sus
                                                    opiniones
                                                </p>
                                            </section>
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    type="button"
                                                    onClick={handleOk}
                                                    className="inline-flex justify-center px-3 py-2 text-sm font-medium text-white transition-all duration-300 bg-gray-600 border border-transparent shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 "
                                                >
                                                    Eliminar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="inline-flex justify-center px-3 py-2 text-sm font-medium text-white transition-all duration-300 bg-gray-600 border border-transparent shadow-sm hover:bg-kiwi hover:text-secundary focus:outline-none focus:ring-2 "
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
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

export default ConfirmModal;
