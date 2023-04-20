import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import MyTabs from "@/Components/MyTabs";
import Carousel from "@/Components/Carousel";
import CardList from "@/Components/CardList";
import Tags from "@/Components/Tags";
import SearchFilter from "@/Components/SearchFilter";
import CardListAside from "@/Components/CardListAside";
import SerieCard from "@/Components/SerieCard";

const Index = ({ auth }) => {
    const { genres, onAirTv, popularTv, topRatedTv, trendingTv } =
        usePage().props.data;
    const tabs = [
        {
            id: 1,
            label: "Populares",
            Component: <CardList data={popularTv} card={SerieCard} />,
        },
        {
            id: 2,
            label: "Al Aire",
            Component: <CardList data={onAirTv} card={SerieCard} />,
        },
        {
            id: 3,
            label: "Categorias",
            Component: <Tags tags={genres} type="tv" card={SerieCard} />,
        },
        {
            id: 4,
            label: "Busqueda",
            Component: <SearchFilter type="tv" card={SerieCard} />,
        },
    ];
    return (
        <AppLayout auth={auth}>
            <Head>
                <title>Series</title>
                <meta
                    name="description"
                    content="Pagina principal con las series mas poulares de la semana, ultimos lanzamientos, filtradas por categorias"
                />
            </Head>
            <div className="container py-20 mx-auto ">
                <section>
                    <h1 className="text-4xl font-bold text-white">Series</h1>
                    <h2 className="mb-4 text-xl font-bold text-kiwi">
                        Tendencia esta semana
                    </h2>
                    <Carousel data={trendingTv.results} card={SerieCard} />
                </section>
                <div className="grid gap-4 mt-10 lg:grid-cols-4 ">
                    <section className="col-span-3 ">
                        <MyTabs tabs={tabs} />
                    </section>
                    <section className="hidden lg:block">
                        <CardListAside
                            title={"Mejor calificadas"}
                            data={topRatedTv}
                        />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
