import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import addListFormSchema from "@/utils/addListFormSchema";
import { ShowTvContext } from "@/Pages/Series/Show";
import AddListSelect from "./AddListSelect";
import AddListInput from "./AddListInput";
import AddIcon from "./svg/AddIcon";

const AddListForm = () => {
    const { editMode, info, scoreList, tvCheck, tvshow, stateWatchingList } =
        useContext(ShowTvContext);
    const [seasonEpisodes, setseasonEpisodes] = useState(tvshow.seasons[1]);

    const handleSubmit = (values, resetForm) => {
        console.log(values);
    };
    return (
        <Formik
            initialValues={{
                watching_state: "0",
                season: "1",
                episode: "0",
                score_id: "0",
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
                        name={"watching_state"}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue("watching_state", value);
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
                            name="watching_state"
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
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full gap-2 py-2 font-bold rounded-sm bg-kiwi text-secundary hover:bg-kiwi/75 active:bg-kiwi/50"
                    >
                        {/* SVG add */}
                        <AddIcon className="w-6 " />
                        Añadir Serie
                    </button>

                    {editMode && (
                        <>
                            <button
                                type="button"
                                wire:click="updateTvList({{ $oldData->id }})"
                                className="min-w-full mb-2"
                                color="gray"
                            >
                                {/* SVG Update  */}
                                <svg
                                    className="w-4 mr-2 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Actualizar
                            </button>
                        </>
                    )}
                    {/* @if ($errors->any())
            <div class="text-red-600">
                <h2>Error, hay campos sin llenar</h2>
                <ul class="pl-4 list-disc">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif */}
                </form>
            )}
        </Formik>
    );
};

export default AddListForm;
