import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const MyRadioGroup = ({ radioOptions, label }) => {
    const [plan, setPlan] = useState("startup");
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <RadioGroup
            value={plan}
            onChange={setPlan}
            className="flex items-center gap-4 "
        >
            <RadioGroup.Label>{label}</RadioGroup.Label>
            <div className="inline-flex my-4 overflow-hidden border rounded-xl bg-secundary border-light ">
                {radioOptions.map((option, index) => (
                    <RadioGroup.Option
                        key={option.name + index}
                        value={option.value}
                    >
                        {({ checked }) => (
                            <button
                                className={classNames(
                                    "  py-2 px-4 font-bold outline-none flex gap-2  ",
                                    checked
                                        ? `bg-${option.color} shadow text-secundary`
                                        : "text-white hover:bg-kiwi/[0.24] hover:text-white"
                                )}
                            >
                                {option.icon ? option.icon : null}
                                {option.name}
                            </button>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

export default MyRadioGroup;
