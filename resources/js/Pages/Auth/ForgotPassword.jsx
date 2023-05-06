import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        login: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout className="flex-col my-auto bg-center bg-cover bg-family-tv ">
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="px-6 h-fit py-8  sm:mx-auto sm:w-full sm:max-w-lg bg-secundary/90 backdrop-blur-sm shadow-[5px_5px_0px_0px_#7ddb29] border border-kiwi"
            >
                <div className="block mb-4 text-lg text-light ">
                    ¿Olvidaste tu contraseña? No hay problema. Solo indícanos tu
                    correo electrónico o nombre de usuario y te enviaremos un
                    enlace para restablecer tu contraseña por correo electrónico
                    que te permitirá elegir una nueva.
                </div>
                <TextInput
                    id="password"
                    type="text"
                    name="login"
                    value={data.login}
                    className="block w-full mt-1"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.login} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Restablecer contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
