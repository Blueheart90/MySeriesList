import { Head } from "@inertiajs/react";

export default function Guest({ children, className: styles }) {
    return (
        <div className="flex flex-col min-h-screen font-sans antialiased bg-primary ">
            <Head title="Welcome" />
            <main className={` ${styles} `}>{children}</main>
        </div>
    );
}
