import ProgressProvider from "@/Components/circular-progress/ProgressProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ImdbIcon from "./svg/ImdbIcon";
import ShowMoreStr from "./ShowMoreStr";

const MovieInfo = ({ info }) => {
    const valueEnd = info["vote_average"].toFixed(1);
    return (
        <>
            <div className="flex flex-wrap items-center gap-4 mb-2 md:mb-0 ">
                <h1 className="text-4xl font-bold ">{`${info.name} (${info.year})`}</h1>
                <a
                    href={info.imdb_link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ImdbIcon />
                </a>
            </div>
            <p>{info.genres}</p>

            <div className="w-20 my-4 ">
                <ProgressProvider valueStart={0} valueEnd={valueEnd}>
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
                                    strokeLinecap: "round",
                                },
                                // Customize the circle behind the path, i.e. the "total progress"
                                trail: {
                                    // Trail color
                                    stroke: "#12062e",
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: "butt",
                                    // Rotate the trail
                                    transform: "rotate(0.25turn)",
                                    transformOrigin: "center center",
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

            {info?.overview && <p className="pb-4 text-lg ">{info.overview}</p>}

            {info?.tagline && (
                <p
                    className={`pb-4 italic before:content-['"'] after:content-['"'] before:text-xl after:text-xl before:font-bold after:font-bold`}
                >
                    {info.tagline}
                </p>
            )}

            {info.cast.length > 0 && (
                <div className="mb-2 ">
                    <span className="font-extrabold ">Protagonistas</span>
                    <ShowMoreStr length={400}>
                        {info["cast_str_list"]}
                    </ShowMoreStr>
                </div>
            )}
        </>
    );
};

export default MovieInfo;
