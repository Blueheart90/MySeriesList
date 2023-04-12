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
import Reviews from "@/Components/Reviews";
import InputRichText from "@/Components/InputRichText";
import ReviewForm from "@/Components/ReviewForm";
import FaceSad from "@/Components/svg/FaceSadIcon";
import NoLoggingReview from "@/Components/NoLoggingReview";

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
                <div className="container py-20 mx-auto md:grid md:gap-4 md:grid-flow-col md:grid-cols-4 text-light">
                    <div className="col-span-1 ">
                        <TvAdditionalInfo info={info} />
                    </div>
                    <div className="md:col-span-3 ">
                        {tvshow.cast.length > 0 && (
                            <section className="mb-10 ">
                                <h2 className="mb-4 text-2xl font-bold">
                                    Actores
                                </h2>
                                <Carousel data={tvshow.cast} card={CastCard} />
                            </section>
                        )}
                        <section className="mb-10 ">
                            <MyTabs tabs={tabs} />
                        </section>
                        <section className="mb-10 ">
                            <Reviews apiId={tvshow.id} />
                        </section>
                        <section className="mb-10 ">
                            {auth?.user ? <ReviewForm /> : <NoLoggingReview />}
                        </section>
                    </div>
                </div>
            </ShowTvContext.Provider>
        </AppLayout>
    );
};

export default Show;
