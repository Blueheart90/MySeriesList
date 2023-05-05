import { Head } from "@inertiajs/react";

export default function Guest({ children, className: styles }) {
    return (
        <>
            <Head title="Welcome" />
            <main
                className={`flex items-center justify-center  min-h-screen font-sans antialiased bg-primary  ${styles} `}
            >
                {children}
            </main>
        </>
    );
}
