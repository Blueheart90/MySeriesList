import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import addListFormSchema from "@/utils/addListFormSchema";
import { ShowTvContext } from "@/Pages/Series/Show";
import AddListSelect from "./AddListSelect";
import AddListInput from "./AddListInput";
import AddIcon from "./svg/AddIcon";
import toast from "react-hot-toast";
import UpdateIcon from "./svg/UpdateIcon";

const AddListForm = ({ close, isEditable, setIsEditable }) => {
    const { dataShow, updateDataShow } = useContext(ShowTvContext);
    const { info, scoreList, tvshow, stateWatchingList, tvListOldData } =
        dataShow;
    const [seasonEpisodes, setseasonEpisodes] = useState(tvshow.seasons[1]);
    const [oldData, setOldData] = useState(tvListOldData || {});

    const handleSubmit = (values, resetForm) => {
        const data = {
            name: tvshow.name,
            api_id: tvshow.id,
            poster: tvshow["poster_path"],
            ...values,
        };

        axios
            .post(route("tvlist.store", data))
            .then((res) => {
                updateDataShow({ ...dataShow, tvListOldData: res.data.tvlist });
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
        console.log("updatting..", tvListOldData);
        const data = {
            name: tvshow.name,
            api_id: tvshow.id,
            poster: tvshow["poster_path"],
            ...values,
        };
        axios
            .put(route("tvlist.update", { tvList: tvListOldData.id }), data)
            .then((res) => {
                setOldData(data);
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

    // comprobamos que cuando no halla un lista agregada devuelva un obj vacio antes del destructuring
    const { watching_state_id, season, episode, score_id } = oldData;
    return (
        <Formik
            initialValues={{
                watching_state_id: watching_state_id || "0",
                season: season || "1",
                episode: episode || "0",
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
                            if (value === "2") {
                                const objKeys = Object.keys(tvshow.seasons);
                                const lastSeason = objKeys[objKeys.length - 1];
                                setFieldValue("season", lastSeason);
                                console.log(errors);
                                setseasonEpisodes(tvshow.seasons[lastSeason]);
                                setFieldValue(
                                    "episode",
                                    tvshow.seasons[lastSeason]
                                );
                            }
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
                        label={"Temporada"}
                        name={"season"}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue("season", value);
                            setseasonEpisodes(tvshow.seasons[value]);
                            setFieldValue("episode", 0);
                        }}
                    >
                        {Object.keys(tvshow.seasons).map((index) => (
                            <option key={index} value={index}>
                                {index}
                            </option>
                        ))}
                    </AddListSelect>
                    <div className="flex items-center">
                        <AddListInput
                            className="w-12 py-1 pl-2 pr-1 text-sm rounded-sm focus:ring-kiwi focus:border-kiwi bg-secundary"
                            label={"Cap. Vistos"}
                            id="episode"
                            type="number"
                            min="0"
                            max={seasonEpisodes}
                            name="episode"
                        />{" "}
                        <span className="pl-2 ">/</span>
                        <span className="pl-2 ">{seasonEpisodes}</span>
                    </div>

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
                            // wire:click="updateTvList({{ $oldData->id }})"
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
                            Añadir Serie
                        </button>
                    )}
                </form>
            )}
        </Formik>
    );
};

export default AddListForm;
