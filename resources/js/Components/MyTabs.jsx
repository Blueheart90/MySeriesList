import React from "react";
import { Tab } from "@headlessui/react";

const MyTabs = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <Tab.Group>
            <Tab.List className="flex gap-4 ">
                <Tab
                    className={({ selected }) =>
                        classNames(
                            " rounded-lg py-2 px-4 font-bold text-white",
                            selected
                                ? "bg-kiwi shadow text-primary"
                                : "text-white hover:bg-white/[0.12] hover:text-white"
                        )
                    }
                >
                    Populares
                </Tab>
                <Tab
                    className={({ selected }) =>
                        classNames(
                            " rounded-lg py-2 px-4 font-bold text-gray-800",
                            selected
                                ? "bg-white shadow"
                                : "text-white hover:bg-white/[0.12] hover:text-white"
                        )
                    }
                >
                    Al Aire
                </Tab>
                <Tab
                    className={({ selected }) =>
                        classNames(
                            " rounded-lg py-2 px-4 font-bold text-gray-800",
                            selected
                                ? "bg-white shadow"
                                : "text-white hover:bg-white/[0.12] hover:text-white"
                        )
                    }
                >
                    Categorias
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>Content 1</Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default MyTabs;
