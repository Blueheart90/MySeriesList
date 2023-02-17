import AppLayout from "@/Layouts/AppLayout";
import React from "react";

const Index = ({ auth }) => {
    return (
        <AppLayout auth={auth} className={" bg-kiwi"}>
            home series
        </AppLayout>
    );
};

export default Index;
