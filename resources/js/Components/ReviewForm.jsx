import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import reviewFormSchema from "@/utils/reviewFormSchema";
import toast from "react-hot-toast";
import InputRichText from "./InputRichText";
import MyRadioGroup from "./MyRadioGroup";
import LikeIcon from "./svg/LikeIcon";

const ReviewForm = () => {
    const handleSubmit = (values, resetForm) => {
        console.log(values);

        // axios
        //     .post(route("tvlist.store", data))
        //     .then((res) => {
        //         if (res.data.hasOwnProperty("success")) {
        //             setOldData(data);
        //             setIsEditable(true);
        //             close();
        //             toast.success("Se agregó a tu lista con exito.", {
        //                 position: "bottom-left",
        //                 duration: 4000,
        //             });
        //         } else {
        //             toast.error("Debes iniciar sesion antes.", {
        //                 position: "bottom-left",
        //                 duration: 4000,
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         toast.error("Se produjo un error", {
        //             position: "bottom-left",
        //         });
        //         console.log(error);
        //     });
    };
    return (
        <div>
            <h2 className="mb-5 text-2xl font-bold text-center ">
                Danos tu opinión
            </h2>
            <Formik
                initialValues={{
                    content: "",
                    recommended: true,
                }}
                validationSchema={reviewFormSchema}
                onSubmit={(values, { resetForm }) =>
                    handleSubmit(values, resetForm)
                }
            >
                {({ handleSubmit, values, isValid, setFieldValue, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-between ">
                            <MyRadioGroup
                                radioOptions={[
                                    {
                                        name: "Si",
                                        value: true,
                                        icon: <LikeIcon className="w-6 " />,
                                        color: "kiwi",
                                    },
                                    {
                                        name: "No",
                                        value: false,
                                        icon: (
                                            <LikeIcon className="w-6 rotate-180" />
                                        ),
                                        color: "red-600",
                                    },
                                ]}
                                label="¿Lo recomiendas?"
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 px-4 py-2 text-lg font-bold rounded-sm h-fit bg-kiwi text-secundary hover:bg-kiwi/75 active:bg-kiwi/50"
                            >
                                Publicar
                            </button>
                        </div>
                        <InputRichText height={300} name="content" />
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default ReviewForm;
