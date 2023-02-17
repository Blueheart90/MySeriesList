import LinkCustom from "@/Components/LinkCustom";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

export default function Welcome(props) {
    return (
        <AppLayout className="my-auto " auth={props.auth}>
            <Head>
                <title>Bienvenido</title>
                <meta name="description" content="Landing de bienvenida" />
            </Head>

            <div className="container mx-auto ">
                <div className="grid h-full grid-cols-5">
                    {/* Left Col */}
                    <div className="flex flex-col col-span-2 px-10 py-20 text-left text-light">
                        <p className="w-full uppercase tracking-loose">
                            Organiza tu entretenimiento
                        </p>
                        <h1 className="my-4 text-5xl font-bold leading-tight text-kiwi">
                            Lleva el control de tus series y peliculas
                        </h1>
                        <p className="mb-2 text-2xl leading-normal ">
                            Comparte tus opiniones, califica y crea tus propias
                            listas.
                        </p>
                        <p className="mb-8 text-2xl leading-normal">
                            Millones de películas y programas de televisión por
                            descubrir. Explora ahora.
                        </p>
                        <LinkCustom
                            href={route("dashboard")}
                            styles={
                                "bg-kiwi hover:bg-light text-secundary hover:scale-105 px-6 py-3"
                            }
                        >
                            ¡Vamos a probarlo!
                        </LinkCustom>
                    </div>
                    {/* Right Col */}

                    <div className="w-full col-span-3 bg-kiwi ">
                        <div className="h-full bg-cover shadow-xl bg-hero-welcome rotate-3"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
