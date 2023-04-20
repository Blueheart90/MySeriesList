import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import MyTabs from "@/Components/MyTabs";
import Carousel from "@/Components/Carousel";
import CardList from "@/Components/CardList";
import Tags from "@/Components/Tags";
import SearchFilter from "@/Components/SearchFilter";
import CardListAside from "@/Components/CardListAside";
import MovieCard from "@/Components/MovieCard";

const Index = ({ auth }) => {
    const {
        genres,
        nowPlayingMovie,
        popularMovie,
        topRatedMovie,
        trendingMovie,
    } = usePage().props.data;

    console.log(usePage().props.data);

    const tabs = [
        {
            id: 1,
            label: "Populares",
            Component: <CardList data={popularMovie} card={MovieCard} />,
        },
        {
            id: 2,
            label: "Al Aire",
            Component: <CardList data={nowPlayingMovie} card={MovieCard} />,
        },
        {
            id: 3,
            label: "Categorias",
            Component: <Tags tags={genres} type="movie" card={MovieCard} />,
        },
        {
            id: 4,
            label: "Busqueda",
            Component: <SearchFilter type="movie" card={MovieCard} />,
        },
    ];
    return (
        <AppLayout auth={auth}>
            <Head>
                <title>Peliculas</title>
                <meta
                    name="description"
                    content="Pagina principal con las peliculas mas poulares de la semana, ultimos lanzamientos, filtradas por categorias"
                />
            </Head>
            <div className="container py-20 mx-auto ">
                <section>
                    <h1 className="text-4xl font-bold text-white">Peliculas</h1>
                    <h2 className="mb-4 text-xl font-bold text-kiwi">
                        Tendencia esta semana
                    </h2>
                    <Carousel data={trendingMovie.results} card={MovieCard} />
                </section>
                <div className="grid gap-4 mt-10 lg:grid-cols-4 ">
                    <section className="col-span-3 ">
                        <MyTabs tabs={tabs} />
                    </section>
                    <section className="hidden lg:block">
                        <CardListAside
                            title={"Mejor calificadas"}
                            data={topRatedMovie}
                        />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
