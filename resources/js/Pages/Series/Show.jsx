import { useState, createContext } from "react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "@/Components/circular-progress/ProgressProvider";
import AccordionAddList from "@/Components/AccordionAddList";
import LogoSvg from "@/Components/svg/LogoSvg";
import Flag from "@/Components/Flag";
import Carousel from "@/Components/Carousel";
import CastCard from "@/Components/CastCard";
import MyTabs from "@/Components/MyTabs";
import MyGallery from "@/Components/MyGallery";
// import GalleryImg from "@/Components/GalleryImg";

export const ShowTvContext = createContext();
const Show = ({ auth, flash }) => {
    const {
        editMode,
        info,
        scoreList,
        tvListOldData,
        tvshow,
        stateWatchingList,
    } = usePage().props.data;

    const valueEnd = tvshow["vote_average"].toFixed(1);
    const { flags, language, name } = info.originalCountry;
    const tabs = [
        {
            id: 1,
            label: "Videos",
            Component: "mis videos",
        },
        {
            id: 2,
            label: "Imágenes",
            Component: "mis imagenes",
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
                <div
                    style={{
                        backgroundImage: `linear-gradient(90deg, #20234fdc 1%, #12062ecf 95%), url(${tvshow["random_bg"]})`,
                    }}
                    className={`overflow-hidden shadow-xl bg-no-repeat bg-cover    `}
                >
                    <div className="container py-20 mx-auto ">
                        <div>
                            <div className="grid grid-cols-8 gap-10 text-white ">
                                <div className="col-span-2 ">
                                    <figure className="overflow-hidden border-2 rounded-lg border-primary ">
                                        <img
                                            src={tvshow["poster_url"]}
                                            alt="poster"
                                            className="w-full mx-auto transition duration-150 ease-in-out lazyload hover:opacity-75"
                                        />
                                        <AccordionAddList />
                                    </figure>
                                </div>
                                <div className="col-span-6">
                                    <h1 className="text-4xl font-bold ">{`${tvshow.name} (${tvshow.year})`}</h1>
                                    <p>{tvshow.genres}</p>

                                    <div className="w-20 my-4 ">
                                        <ProgressProvider
                                            valueStart={0}
                                            valueEnd={valueEnd}
                                        >
                                            {(value) => (
                                                <CircularProgressbar
                                                    value={value}
                                                    text={`${value}%`}
                                                    strokeWidth={10}
                                                    styles={{
                                                        // Customize the root svg element
                                                        root: {},
                                                        // Customize the path, i.e. the "completed progress"
                                                        path: {
                                                            // Path color
                                                            stroke: `#7ddb29`,
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap:
                                                                "round",
                                                        },
                                                        // Customize the circle behind the path, i.e. the "total progress"
                                                        trail: {
                                                            // Trail color
                                                            stroke: "#12062e",
                                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                            strokeLinecap:
                                                                "butt",
                                                            // Rotate the trail
                                                            transform:
                                                                "rotate(0.25turn)",
                                                            transformOrigin:
                                                                "center center",
                                                        },
                                                        // Customize the text
                                                        text: {
                                                            fontWeight: "bold",
                                                            // Text color
                                                            fill: "#7ddb29",
                                                            // Text size
                                                            fontSize: "20px",
                                                        },
                                                    }}
                                                />
                                            )}
                                        </ProgressProvider>
                                    </div>

                                    {tvshow?.overview && (
                                        <p className="pb-4 text-lg ">
                                            {tvshow.overview}
                                        </p>
                                    )}

                                    {tvshow?.tagline && (
                                        <p
                                            className={`pb-4 italic before:content-['"'] after:content-['"'] before:text-xl after:text-xl before:font-bold after:font-bold`}
                                        >
                                            {tvshow.tagline}
                                        </p>
                                    )}

                                    {tvshow?.cast && (
                                        <div className="mb-2 ">
                                            <span className="font-extrabold ">
                                                Protagonistas
                                            </span>
                                            <p>{tvshow["cast_str_list"]}</p>
                                        </div>
                                    )}
                                    {tvshow["created_by"].length > 0 && (
                                        <div>
                                            <span className="font-extrabold ">
                                                Creado por
                                            </span>
                                            <p>
                                                {tvshow["created_by"].map(
                                                    (creator) => creator.name
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-10 md:grid md:gap-4 md:grid-flow-col md:grid-cols-4">
                    <div className=" text-light">
                        <div className="flex items-center mb-4">
                            <LogoSvg className="mr-2 w-7 fill-white" />
                            <h2 className="text-lg ">Información Adicional</h2>
                        </div>
                        <div className="space-y-4 ">
                            {Object.entries(info.basic).map(
                                ([label, value], index) => (
                                    <div key={index + label}>
                                        <span className="block font-bold">
                                            {label}
                                        </span>
                                        <span className="capitalize">
                                            {value}
                                        </span>
                                    </div>
                                )
                            )}

                            <div>
                                <span className="block font-bold">
                                    Pais de origen
                                </span>
                                <img
                                    className="w-12 "
                                    src={flags.svg}
                                    alt={flags.alt}
                                />
                            </div>
                            <div>
                                <a
                                    className="font-bold transition-all duration-300 hover:text-secundary hover:font-bold"
                                    href={info.homepage}
                                >
                                    Sitio Oficial
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 text-light">
                        <section className="mb-10 ">
                            <h2 className="mb-4 text-lg font-bold ">Actores</h2>
                            <Carousel data={tvshow.cast} card={CastCard} />
                        </section>
                        <MyTabs tabs={tabs} />
                        <MyGallery data={tvshow.images.gallery} />
                        {/* <x-swiper>
                                @foreach ($tvshow['cast'] as $actor)
                                    <div class="swiper-slide">
                                        <a  href="">
                                            <img  data-src="{{ $actor['profile_path'] }}" alt="poster" class="transition duration-150 ease-in-out lazyload hover:opacity-75">
                                        </a>
                                        <div class="mt-2">
                                            <a href="" class="block mt-2 text-lg hover:text-gray-300">{{ $actor['name'] }}</a>
                                            <a href="" class="mt-2 text-base text-gray-600">{{ $actor['character'] }}</a>
                                        </div>
                                    </div>
                                @endforeach
                            </x-swiper> */}
                    </div>
                </div>
            </ShowTvContext.Provider>
        </AppLayout>
    );
};

export default Show;
