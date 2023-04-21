import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import addListFormSchema from "@/utils/addListFormSchema";
import { MovieContext } from "@/Pages/Movies/Show";
import AddListSelect from "./AddListSelect";
import AddListInput from "./AddListInput";
import AddIcon from "./svg/AddIcon";
import toast from "react-hot-toast";
import UpdateIcon from "./svg/UpdateIcon";

const AddMovieListForm = ({ close, isEditable, setIsEditable }) => {
    const { dataShow, updateDataShow } = useContext(MovieContext);
    const { info, scoreList, movie, stateWatchingList, movieListOldData } =
        dataShow;
    // const [seasonEpisodes, setseasonEpisodes] = useState(tvshow.seasons[1]);
    const [oldData, setOldData] = useState(movieListOldData || {});

    const handleSubmit = (values, resetForm) => {
        const data = {
            name: movie.name,
            api_id: movie.id,
            poster: movie["poster_path"],
            ...values,
        };

        axios
            .post(route("movielist.store", data))
            .then((res) => {
                updateDataShow({
                    ...dataMedia,
                    movieListOldData: res.data.movie,
                });
                setOldData(data);
                setIsEditable(true);
                close();
                console.log(res);
                toast.success(res.data.message, {
                    position: "bottom-left",
                    duration: 4000,
                });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: "bottom-left",
                });
                console.log(error);
            });
    };

    const handleUpdate = (values) => {
        console.log("updatting..", movieListOldData);
        const data = {
            name: movie.name,
            api_id: movie.id,
            poster: movie["poster_path"],
            ...values,
        };
        axios
            .put(route("tvlist.update", { id: movieListOldData.id }), data)
            .then((res) => {
                if (res.data.hasOwnProperty("success")) {
                    setOldData(data);
                    // setIsEditable(true);
                    // close();
                    toast.success("Se actualizó tu lista con exito.", {
                        position: "bottom-left",
                        duration: 4000,
                    });
                } else {
                    toast.error("Debes iniciar sesion antes.", {
                        position: "bottom-left",
                        duration: 4000,
                    });
                }
            })
            .catch((error) => {
                toast.error("Se produjo un error", {
                    position: "bottom-left",
                });
                console.log(error);
            });
    };

    // comprobamos que cuando no halla un lista agregada devuelva un obj vacio antes del destructuring
    const { watching_state_id, score_id } = oldData;
    return (
        <Formik
            initialValues={{
                watching_state_id: watching_state_id || "0",
                score_id: score_id || "0",
            }}
            validationSchema={addListFormSchema}
            onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
            }
        >
            {({ handleSubmit, values, isValid, setFieldValue, errors }) => (
                <form
                    onSubmit={handleSubmit}
                    className="px-10 py-4 space-y-2 text-sm bg-opacity-75 text-kiwi bg-secundary rounded-b-md "
                >
                    <AddListSelect
                        className="w-full py-1 pl-4 text-sm rounded-sm focus:ring-kiwi focus:border-kiwi bg-secundary"
                        label={"Estado"}
                        name={"watching_state_id"}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue("watching_state_id", value);
                        }}
                    >
                        <option defaultValue disabled value="0">
                            Selecciona
                        </option>
                        {stateWatchingList.map((state) => (
                            <option key={state.id} value={state.id}>
                                {state.name}
                            </option>
                        ))}
                    </AddListSelect>

                    <AddListSelect
                        className="w-full py-1 pl-4 text-sm rounded-sm focus:ring-kiwi focus:border-kiwi bg-secundary"
                        label={"Punt."}
                        name={"score_id"}
                    >
                        <option defaultValue disabled value="0">
                            Selecciona
                        </option>
                        {scoreList.map((score) => (
                            <option key={score.id} value={score.id}>
                                {score.name}
                            </option>
                        ))}
                    </AddListSelect>

                    <div>
                        <ErrorMessage
                            name="watching_state_id"
                            render={(msg) => (
                                <div className="text-red-600 ">*{msg}</div>
                            )}
                        />
                        <ErrorMessage
                            name="score_id"
                            render={(msg) => (
                                <div className="text-red-600 ">*{msg}</div>
                            )}
                        />
                    </div>

                    {isEditable ? (
                        <button
                            type="button"
                            onClick={() => handleUpdate(values)}
                            className="flex items-center justify-center w-full gap-2 py-1 font-bold rounded-sm bg-kiwi text-secundary hover:bg-kiwi/75 active:bg-kiwi/50"
                        >
                            <UpdateIcon className="w-6 " />
                            Actualizar
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full gap-2 py-1 font-bold rounded-sm bg-kiwi text-secundary hover:bg-kiwi/75 active:bg-kiwi/50"
                        >
                            <AddIcon className="w-6 " />
                            Añadir Pelicula
                        </button>
                    )}
                </form>
            )}
        </Formik>
    );
};

export default AddMovieListForm;
