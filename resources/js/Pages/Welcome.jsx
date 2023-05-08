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
                <div className="grid items-center h-full mt-10 lg:grid-cols-5">
                    {/* Left Col */}
                    <div className="flex flex-col order-last col-span-2 p-4 text-left lg:px-10 lg:py-20 text-light">
                        <p className="w-full uppercase tracking-loose">
                            Organiza tu entretenimiento
                        </p>
                        <h1 className="my-4 text-3xl font-bold leading-tight xl:text-5xl text-kiwi">
                            Lleva el control de tus series y peliculas
                        </h1>
                        <p className="mb-2 leading-normal xl:text-xl ">
                            Comparte tus opiniones, califica y crea tus propias
                            listas.
                        </p>
                        <p className="mb-8 leading-normal xl:text-xl">
                            Millones de películas y programas de televisión por
                            descubrir. Explora ahora.
                        </p>
                        <LinkCustom
                            href={route("series.index")}
                            styles={
                                "bg-kiwi hover:bg-light text-secundary hover:scale-105 px-6 py-3"
                            }
                        >
                            ¡Vamos a probarlo!
                        </LinkCustom>
                    </div>
                    {/* Right Col */}

                    <div className="col-span-3 p-4">
                        <div className=" bg-kiwi">
                            <div className="max-w-4xl translate-x-1 bg-cover shadow-xl aspect-video bg-hero-welcome rotate-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
