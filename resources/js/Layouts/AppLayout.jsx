import React from "react";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

const AppLayout = ({ auth, children, className: styles }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans antialiased bg-primary ">
            <Head title="Welcome" />
            <Header auth={auth} />

            <main className={` ${styles} `}>
                <Toaster />
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
