import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";
import MyTabs from "@/Components/MyTabs";
import Carousel from "@/Components/Carousel";

const Index = ({ auth }) => {
    const { genres, onAirTV, popularTv, topRatedTv, trendingTv } =
        usePage().props.data;
    console.log(trendingTv);
    return (
        <AppLayout auth={auth}>
            <div className="container py-20 mx-auto ">
                <section>
                    <h1 className="text-4xl font-bold text-white">Series</h1>
                    <h2 className="mb-4 text-xl font-bold text-kiwi">
                        Tendencia esta semana
                    </h2>
                    <Carousel data={trendingTv} />
                </section>
                <div className="grid grid-cols-4 gap-4 mt-10 ">
                    <section className="col-span-3 ">
                        <MyTabs />
                    </section>
                    <aside className="bg-red-500 ">dfdfdfg</aside>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
