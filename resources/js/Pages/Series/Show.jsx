import { createContext, useCallback, useState } from "react";
import TvInfo from "../../Components/TvInfo";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Carousel from "@/Components/Carousel";
import CastCard from "@/Components/CastCard";
import MyTabs from "@/Components/MyTabs";
import MyGallery from "@/Components/MyGallery";
import TvAdditionalInfo from "@/Components/TvAdditionalInfo";
import Hero from "@/Components/Hero";
import Reviews from "@/Components/Reviews";
import ReviewForm from "@/Components/ReviewForm";
import NoLoggingReview from "@/Components/NoLoggingReview";
import AddListForm from "@/Components/AddListForm";

export const ShowTvContext = createContext();
const Show = ({ auth }) => {
    const [dataShow, setDataShow] = useState(usePage().props.data);
    const {
        data: { info, tvshow, editMode, tvListOldData },
    } = usePage().props;
    const [reviews, setReviews] = useState([]);
    const updateDataShow = useCallback(
        (data) => {
            setDataShow(data);
        },
        [setDataShow]
    );

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
            <ShowTvContext.Provider value={{ dataShow, updateDataShow }}>
                <Hero media={tvshow} editMode={editMode} form={AddListForm}>
                    <TvInfo info={tvshow} />
                </Hero>
                <div className="container grid grid-cols-1 gap-4 px-2 py-20 mx-auto lg:gap-6 lg:grid-flow-col lg:grid-cols-4 text-light">
                    <div className="lg:col-span-1 ">
                        <TvAdditionalInfo info={info} />
                    </div>
                    <div className="lg:col-span-3 ">
                        {tvshow.cast.length > 0 && (
                            <section className="mb-10 ">
                                <h2 className="mb-4 text-2xl font-bold">
                                    Actores
                                </h2>
                                <Carousel data={tvshow.cast} card={CastCard} />
                            </section>
                        )}
                        <section className="mb-10 ">
                            <h2 className="mb-4 text-2xl font-bold">
                                Multimedia
                            </h2>
                            <MyTabs tabs={tabs} />
                        </section>
                        <section className="mb-10 ">
                            <Reviews
                                apiId={tvshow.id}
                                reviews={reviews}
                                setReviews={setReviews}
                            />
                        </section>
                        <section className="mb-10 ">
                            {auth?.user ? (
                                <ReviewForm
                                    reviews={reviews}
                                    setReviews={setReviews}
                                    user={auth.user}
                                    media={tvshow}
                                    oldListData={tvListOldData}
                                    model="tv"
                                />
                            ) : (
                                <NoLoggingReview />
                            )}
                        </section>
                    </div>
                </div>
            </ShowTvContext.Provider>
        </AppLayout>
    );
};

export default Show;
