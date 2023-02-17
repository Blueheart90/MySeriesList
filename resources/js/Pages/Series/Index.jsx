import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";

const Index = ({ auth }) => {
    console.log(usePage().props);
    return (
        <AppLayout auth={auth} className={" bg-kiwi"}>
            home series
        </AppLayout>
    );
};

export default Index;
