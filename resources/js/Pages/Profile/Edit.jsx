import AppLayout from "@/Layouts/AppLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AppLayout className="my-auto " auth={auth}>
            <Head title="Mi Perfil" />

            <div className="py-12">
                <div className="p-4 mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 border  bg-secundary border-kiwi sm:p-8 shadow-[5px_5px_0px_0px_#7ddb29]">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 border  bg-secundary border-kiwi sm:p-8 shadow-[5px_5px_0px_0px_#7ddb29]">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 border  bg-secundary border-kiwi sm:p-8 shadow-[5px_5px_0px_0px_#7ddb29]">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
