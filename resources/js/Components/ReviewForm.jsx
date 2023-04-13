import React, { useContext, useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ShowTvContext } from "@/Pages/Series/Show";
import reviewFormSchema from "@/utils/reviewFormSchema";
import toast from "react-hot-toast";
import InputRichText from "./InputRichText";
import MyRadioGroup from "./MyRadioGroup";
import LikeIcon from "./svg/LikeIcon";
import MyButton from "./MyButton";

const ReviewForm = ({ reviews, setReviews, user }) => {
    const { dataShow, updateDataShow } = useContext(ShowTvContext);
    const { info, scoreList, tvshow, stateWatchingList, tvListOldData } =
        dataShow;
    const [editMode, setEditMode] = useState(false);

    // useEffect(() => {
    //     if (reviews.length > 0) {
    //         const myReview = reviews.find(
    //             (review) => review.user_id == user.id
    //         );
    //         // setOldDataMyReview()
    //         console.log("mi review", myReview);
    //     }
    // }, [reviews, editMode]);

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
                console.log("rspuesta fomr review", res.data.newRecord);
                setReviews([...reviews, res.data.newRecord]);
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
            <div className="mb-4 ">
                <h2 className="text-2xl font-bold text-center ">
                    Danos tu opinión
                </h2>
                <p className="text-lg ">
                    Describe lo que te ha gustado o no de esta serie/pelicula y
                    si se lo recomendarías a otros. Recuerda ser educado/a y
                    seguir las Normas y directrices.
                </p>
            </div>
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
                }) => {
                    useEffect(() => {
                        if (reviews.length > 0) {
                            const myReview = reviews.find(
                                (review) => review.user_id == user.id
                            );
                            if (myReview) {
                                setFieldValue("content", myReview.content);
                                setFieldValue(
                                    "recommended",
                                    myReview.recommended * 1
                                );
                                setEditMode(true);
                                console.log("mi review", myReview);
                                console.log("form values", values);
                            }
                        }
                    }, [reviews, editMode]);

                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between ">
                                <MyRadioGroup
                                    radioOptions={[
                                        {
                                            name: "Si",
                                            value: 1,
                                            icon: <LikeIcon className="w-6 " />,
                                            color: "kiwi",
                                        },
                                        {
                                            name: "No",
                                            value: 0,
                                            icon: (
                                                <LikeIcon className="w-6 rotate-180" />
                                            ),
                                            color: "red-600",
                                        },
                                    ]}
                                    label="¿Lo recomiendas?"
                                    name="recommended"
                                />
                                {editMode ? (
                                    <MyButton
                                        type="button"
                                        onClick={() => {
                                            console.log("actualizando");
                                        }}
                                        disable={!(dirty && isValid)}
                                        label="Actualizar"
                                    />
                                ) : (
                                    <MyButton
                                        type="submit"
                                        disable={!(dirty && isValid)}
                                        label="Publicar"
                                    />
                                )}
                            </div>
                            <InputRichText height={300} name="content" />
                            <div className="mt-4 ">
                                <ErrorMessage
                                    name="content"
                                    render={(msg) => (
                                        <div className="text-red-600 ">
                                            *{msg}
                                        </div>
                                    )}
                                />
                                <ErrorMessage
                                    name="recommended"
                                    render={(msg) => (
                                        <div className="text-red-600 ">
                                            *{msg}
                                        </div>
                                    )}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ReviewForm;
