import { useField, ErrorMessage } from "formik";

const AddListInput = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="flex items-center ">
            <label htmlFor={field.name} className="pr-2 font-bold">
                {label}
            </label>
            <input {...field} {...props} />

            {/* {meta.touched && meta.error ? (
                <div className=" text-xl mt-4 after:content-['}'] before:content-['{'] before:text-accent after:font-bold after:text-accent before:font-bold">
                    error:
                    <span
                        className={`pl-2  text-light  after:content-['"'] before:content-['"'] `}
                    >
                        <span className="underline decoration-wavy decoration-red-500">
                            {meta.error}
                        </span>
                    </span>
                </div>
            ) : null} */}
        </div>
    );
};

export default AddListInput;
