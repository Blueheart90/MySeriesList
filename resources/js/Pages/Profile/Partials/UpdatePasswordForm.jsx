import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-kiwi">
                    Actualizar contraseña
                </h2>

                <p className="mt-1 text-sm text-light">
                    Asegúrese de que su cuenta utiliza una contraseña larga y
                    aleatoria para permanecer segura.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        for="current_password"
                        value="Contraseña Actual"
                        className=" text-light"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        handleChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="block w-full mt-1"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        for="password"
                        value="Nueva Contraseña"
                        className=" text-light"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        handleChange={(e) =>
                            setData("password", e.target.value)
                        }
                        type="password"
                        className="block w-full mt-1"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        for="password_confirmation"
                        value="Confirmar Contraseña"
                        className=" text-light"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        handleChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="block w-full mt-1"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>
                        Guardar
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
