import React from "react";
import AccordionAddList from "./AccordionAddList";
import MovieInfo from "./MovieInfo";

const Hero = ({ media, editMode, form, children }) => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(90deg, #20234fdc 1%, #12062ecf 95%), url(${media["random_bg"]})`,
            }}
            className={`overflow-hidden shadow-xl bg-no-repeat bg-cover    `}
        >
            <div className="container py-20 mx-auto ">
                <div className="grid grid-cols-1 gap-10 text-white lg:grid-cols-8 ">
                    <div className="lg:col-span-2 w-fit justify-self-center ">
                        <figure className="overflow-hidden border-2 rounded-lg border-primary ">
                            <img
                                src={media["poster_url"]}
                                alt="poster"
                                className="mx-auto transition duration-150 ease-in-out lg:w-full lazyload hover:opacity-75"
                            />
                            <AccordionAddList editMode={editMode} form={form} />
                        </figure>
                    </div>
                    <div className="p-2 lg:col-span-6">
                        {/* <MovieInfo info={media} /> */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
