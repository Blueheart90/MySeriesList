import { useEffect } from "react";
import GoogleIcon from "../../Components/svg/GoogleIcon";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import LogoSvg from "@/Components/svg/LogoSvg";
import GoogleButton from "@/Components/GoogleButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
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

        post(route("login"));
    };

    return (
        <GuestLayout className="my-auto bg-center bg-cover bg-family-tv ">
            <Head title="Iniciar sesión" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="px-6 h-fit py-8  sm:mx-auto sm:w-full sm:max-w-lg bg-secundary/90 backdrop-blur-sm shadow-[5px_5px_0px_0px_#7ddb29] border border-kiwi"
            >
                <div>
                    <LogoSvg className="w-auto h-20 mx-auto fill-kiwi" />
                    <p className="my-4 text-lg text-center text-light ">
                        Inicia sesión para agregar tus películas y series
                        favoritas
                    </p>
                </div>
                <div>
                    <InputLabel
                        forInput="login"
                        value="Email / Username"
                        className="font-bold text-kiwi"
                    />

                    <TextInput
                        id="login"
                        type="text"
                        name="login"
                        value={data.login}
                        className="block w-full mt-1 rounded-sm"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.login} className="mt-2" />
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
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />
                        <span className="ml-2 text-sm text-kiwi">
                            Recuerdame
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end gap-4 mt-4">
                    <Link
                        href={route("register")}
                        className="text-sm underline rounded-md text-kiwi focus:outline-none "
                    >
                        Registrarse
                    </Link>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm underline rounded-md text-kiwi focus:outline-none "
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}

                    <PrimaryButton processing={processing}>
                        Inciar sesión
                    </PrimaryButton>
                </div>
                <GoogleButton />
            </form>
        </GuestLayout>
    );
}
