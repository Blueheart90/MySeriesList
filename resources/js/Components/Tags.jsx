import { useState, useEffect } from "react";

const Tags = ({ tags }) => {
    const [filterGenres, setFilterGenres] = useState([]);

    useEffect(() => {}, [filterGenres]);

    const handlerFilter = (genreId) => {
        if (filterGenres.includes(genreId)) {
            const updatedGenres = filterGenres.filter(
                (genre) => genre != genreId
            );
            setFilterGenres(updatedGenres);
        } else {
            setFilterGenres([...filterGenres, genreId]);
        }
    };
    return (
        <div className="flex flex-wrap justify-center gap-3 px-4">
            {tags.map((tag) => (
                <span
                    key={tag.id}
                    onClick={() => handlerFilter(tag.id)}
                    className={`px-3 py-2 transition-all font-semibold duration-200 border rounded-md cursor-pointer select-none ${
                        filterGenres.includes(tag.id)
                            ? "bg-kiwi border-kiwi text-secundary active:bg-kiwi/70 "
                            : "bg-secundary text-light hover:bg-secundary/30 active:bg-secundary"
                    }`}
                >
                    {tag.name}
                </span>
            ))}
        </div>
    );
};

export default Tags;
