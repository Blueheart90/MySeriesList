export default function PrimaryButton({
    type = "submit",
    className = "",
    processing,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `w-fit font-bold transition duration-300 ease-in-out transform   text-lg hover:bg-kiwi hover:text-secundary text-light px-6 py-2 mb-2 border border-kiwi  ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
