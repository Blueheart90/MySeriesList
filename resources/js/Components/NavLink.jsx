import { Link } from "@inertiajs/react";

export default function NavLink({ href, active, children, className }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <Link
            href={href}
            className={classNames(
                `w-fit font-bold transition duration-300 ease-in-out transform rounded-xl text-lg hover:text-kiwi ${className} `,
                active ? `text-kiwi` : "text-light"
            )}
        >
            {children}
        </Link>
    );
}
