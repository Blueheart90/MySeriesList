import { createContext, useCallback, useState } from "react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Carousel from "@/Components/Carousel";
import CastCard from "@/Components/CastCard";
import MyTabs from "@/Components/MyTabs";
import MyGallery from "@/Components/MyGallery";
import Hero from "@/Components/Hero";
import Reviews from "@/Components/Reviews";
import ReviewForm from "@/Components/ReviewForm";
import NoLoggingReview from "@/Components/NoLoggingReview";
import AddMovieListForm from "@/Components/AddMovieListForm";
import MovieAdditionalInfo from "@/Components/MovieAdditionalInfo";
import MovieInfo from "@/Components/MovieInfo";

export const MovieContext = createContext();
const Show = ({ auth }) => {
    const [dataShow, setDataShow] = useState(usePage().props.data);
    const {
        data: { info, movie, editMode, movieListOldData },
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
            Component: <MyGallery data={movie.gallery.videos} type="video" />,
        },
        {
            id: 2,
            label: "Imágenes",
            Component: <MyGallery data={movie.gallery.images} type="image" />,
        },
    ];

    return (
        <AppLayout auth={auth}>
            <Head>
                <title>{movie.name}</title>
                <meta
                    name="description"
                    content={`Pagina con información detallada sobre la pelicula ${movie.name}`}
                />
            </Head>
            <MovieContext.Provider value={{ dataShow, updateDataShow }}>
                <Hero media={movie} editMode={editMode} form={AddMovieListForm}>
                    <MovieInfo info={movie} />
                </Hero>
                <div className="container grid grid-cols-1 gap-4 px-2 py-20 mx-auto lg:gap-6 lg:grid-flow-col lg:grid-cols-4 text-light">
                    <div className="lg:col-span-1 ">
                        <MovieAdditionalInfo info={info} />
                    </div>
                    <div className="lg:col-span-3 ">
                        {movie.cast.length > 0 && (
                            <section className="mb-10 ">
                                <h2 className="mb-4 text-2xl font-bold">
                                    Actores
                                </h2>
                                <Carousel data={movie.cast} card={CastCard} />
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
                                apiId={movie.id}
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
                                    media={movie}
                                    oldListData={movieListOldData}
                                    model="movie"
                                />
                            ) : (
                                <NoLoggingReview />
                            )}
                        </section>
                    </div>
                </div>
            </MovieContext.Provider>
        </AppLayout>
    );
};

export default Show;
