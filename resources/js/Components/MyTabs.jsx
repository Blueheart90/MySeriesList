import { Tab } from "@headlessui/react";

const MyTabs = ({ tabs }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <Tab.Group>
            <Tab.List className="flex flex-wrap justify-center gap-4 mb-10">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        className={({ selected }) =>
                            classNames(
                                " rounded-lg py-2 px-4 font-bold outline-none ",
                                selected
                                    ? "bg-kiwi shadow text-secundary"
                                    : "text-white hover:bg-white/[0.12] hover:text-white"
                            )
                        }
                    >
                        {tab.label}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                {tabs.map((tab) => (
                    <Tab.Panel key={tab.id}>{tab.Component}</Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default MyTabs;
