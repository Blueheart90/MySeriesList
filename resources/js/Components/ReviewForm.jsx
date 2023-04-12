import React, { useContext, useState } from "react";
import { router } from "@inertiajs/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ShowTvContext } from "@/Pages/Series/Show";
import reviewFormSchema from "@/utils/reviewFormSchema";
import toast from "react-hot-toast";
import InputRichText from "./InputRichText";
import MyRadioGroup from "./MyRadioGroup";
import LikeIcon from "./svg/LikeIcon";
import MyButton from "./MyButton";

const ReviewForm = () => {
    const { info, scoreList, tvshow, stateWatchingList, tvListOldData } =
        useContext(ShowTvContext);

    const handleSubmitReview = (values, resetForm) => {
        console.log(values);
        const data = {
            api_id: tvshow.id,
            tvlist_id: tvListOldData?.id,
            ...values,
        };
        console.log("enviando form", data);
        axios
            .post(route("review.store", data))
            .then((res) => {
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
            });

        // router.post(route("review.store"), data, {
        //     onSuccess: (page) => {
        //         console.log(page.props.toast);
        //     },
        //     onError: (errors) => {
        //         console.log("errors", errors);
        //     },
        // });
    };
    return (
        <div>
            <h2 className="mb-5 text-2xl font-bold text-center ">
                Danos tu opinión
            </h2>
            <Formik
                initialValues={{
                    content: "",
                    recommended: null,
                }}
                validationSchema={reviewFormSchema}
                onSubmit={(values, { resetForm }) =>
                    handleSubmitReview(values, resetForm)
                }
            >
                {({
                    handleSubmit,
                    values,
                    isValid,
                    setFieldValue,
                    errors,
                    dirty,
                }) => (
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
                                name="recommended"
                            />

                            <MyButton
                                type="submit"
                                disable={!(dirty && isValid)}
                                label="Publicar"
                            />
                        </div>
                        <InputRichText height={300} name="content" />
                        <div className="mt-4 ">
                            <ErrorMessage
                                name="content"
                                render={(msg) => (
                                    <div className="text-red-600 ">*{msg}</div>
                                )}
                            />
                            <ErrorMessage
                                name="recommended"
                                render={(msg) => (
                                    <div className="text-red-600 ">*{msg}</div>
                                )}
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default ReviewForm;
