import { useState, createContext } from "react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "@/Components/circular-progress/ProgressProvider";
import DropdownAddList from "@/Components/DropdownAddList";
import Dropdown from "@/Components/Dropdown";
import AccordionAddList from "@/Components/AccordionAddList";

export const ShowTvContext = createContext();
const Show = ({ auth }) => {
    const { editMode, info, scoreList, tvCheck, tvshow, stateWatchingList } =
        usePage().props.data;

    const valueEnd = tvshow["vote_average"].toFixed(1);
    console.log(usePage().props.data);
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
                                        {/* Desplegable con formulario */}
                                        {/* <div className="relative">
                                        <DropdownAddList>
                                            <DropdownAddList.Trigger />

                                            <DropdownAddList.Content>
                                                holamundo
                                            </DropdownAddList.Content>
                                        </DropdownAddList>
                                    </div> */}

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
            </ShowTvContext.Provider>
        </AppLayout>
    );
};

export default Show;
