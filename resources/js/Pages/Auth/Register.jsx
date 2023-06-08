import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import GoogleButton from "@/Components/GoogleButton";
import LogoWithText from "@/Components/LogoWithText";
import ArrowBackIcon from "@/Components/svg/ArrowBackIcon";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout className="my-auto bg-center bg-cover bg-family-tv ">
            <Head title="Registro" />

            <form
                onSubmit={submit}
                className="px-6 h-fit py-8  sm:mx-auto sm:w-full sm:max-w-lg bg-secundary/90 backdrop-blur-sm shadow-[5px_5px_0px_0px_#7ddb29] border border-kiwi"
            >
                <div>
                    <LogoWithText />
                    <p className="my-4 text-lg text-center text-light ">
                        Registrate para agregar tus películas y series favoritas
                    </p>
                </div>
                <div>
                    <InputLabel
                        forInput="name"
                        value="Nombre"
                        className="font-bold text-kiwi"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1 rounded-sm"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel
                        forInput="username"
                        value="Username"
                        className="font-bold text-kiwi"
                    />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="block w-full mt-1 rounded-sm"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="email"
                        value="Correo electrónico"
                        className="font-bold text-kiwi"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1 rounded-sm"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password"
                        value="Contraseña"
                        className="font-bold text-kiwi"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1 rounded-sm"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password_confirmation"
                        value="Confirmar contraseña"
                        className="font-bold text-kiwi"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1 rounded-sm"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="text-sm underline rounded-md text-kiwi focus:outline-none "
                    >
                        ¿Ya tienes una cuenta?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Registrarse
                    </PrimaryButton>
                </div>
                <GoogleButton />
            </form>
            <Link
                className=" absolute top-2 font-bold gap-1 left-2 flex items-center justify-center bg-secundary shadow-[5px_5px_0px_0px_#7ddb29] border border-kiwi text-kiwi p-2 text-lg hover:bg-kiwi hover:text-secundary hover:shadow-[5px_5px_0px_0px_#20234f] hover:border-secundary transition-all duration-300"
                as="button"
                type="button"
                onClick={() => {
                    window.history.back();
                }}
            >
                <ArrowBackIcon />
                Volver
            </Link>
        </GuestLayout>
    );
}
