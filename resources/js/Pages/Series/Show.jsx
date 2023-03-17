import { createContext } from "react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Carousel from "@/Components/Carousel";
import CastCard from "@/Components/CastCard";
import MyTabs from "@/Components/MyTabs";
import MyGallery from "@/Components/MyGallery";
import TvAdditionalInfo from "@/Components/TvAdditionalInfo";
import TvHero from "@/Components/TvHero";
import Review from "@/Components/Review";

export const ShowTvContext = createContext();
const Show = ({ auth }) => {
    const { info, tvshow } = usePage().props.data;

    const tabs = [
        {
            id: 1,
            label: "Videos",
            Component: <MyGallery data={tvshow.gallery.videos} type="video" />,
        },
        {
            id: 2,
            label: "Imágenes",
            Component: <MyGallery data={tvshow.gallery.images} type="image" />,
        },
    ];

    console.log(tvshow);
    return (
        <AppLayout auth={auth}>
            <Head>
                <title>{tvshow.name}</title>
                <meta
                    name="description"
                    content={`Pagina con información detallada sobre la serie de television ${tvshow.name}`}
                />
            </Head>
            <ShowTvContext.Provider value={usePage().props.data}>
                <TvHero tvshow={tvshow} />
                <div className="p-10 md:grid md:gap-4 md:grid-flow-col md:grid-cols-4 text-light">
                    <div className="col-span-1 ">
                        <TvAdditionalInfo info={info} />
                    </div>
                    <div className="md:col-span-3 ">
                        {tvshow.cast.length > 0 && (
                            <section className="mb-10 ">
                                <h2 className="mb-4 text-lg font-bold ">
                                    Actores
                                </h2>
                                <Carousel data={tvshow.cast} card={CastCard} />
                            </section>
                        )}
                        <MyTabs tabs={tabs} />
                        <Review apiId={tvshow.id} />
                    </div>
                </div>
            </ShowTvContext.Provider>
        </AppLayout>
    );
};

export default Show;
