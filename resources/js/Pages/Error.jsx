import GlitchText from "@/Components/GlitchText";
import TvFrame from "@/Components/TvFrame";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

// import { usePage } from '@inertiajs/inertia-react';

export default ({ status, auth }) => {
    // const { status } = usePage().props;

    // const title = {
    //     503: "503: Service Unavailable",
    //     500: "500: Server Error",
    //     404: "404: Page Not Found",
    //     403: "403: Forbidden",
    // }[status];

    // const description = {
    //     503: "Sorry, we are doing some maintenance. Please check back soon.",
    //     500: "Whoops, something went wrong on our servers.",
    //     404: "Sorry, the page you are looking for could not be found.",
    //     403: "Sorry, you are forbidden from accessing this page.",
    // }[status];

    return (
        <AppLayout className="my-auto " auth={auth}>
            <Head>
                <title>Pagina de error</title>
                <meta
                    name="description"
                    content="Pagina con información sobre un error"
                />
            </Head>
            <div className="flex items-center justify-center bg-primary">
                <div className="flex flex-col items-center text-light">
                    <TvFrame>
                        <img
                            src="../storage/img/nosignal.gif"
                            alt="Gif animado de television sin señal"
                        />
                    </TvFrame>

                    <GlitchText className="text-7xl" text={` ${status.code}`} />
                    <GlitchText className="text-3xl " text={"Error page"} />
                    <p className="text-2xl ">{status.message}</p>
                </div>
            </div>
        </AppLayout>
    );
};
