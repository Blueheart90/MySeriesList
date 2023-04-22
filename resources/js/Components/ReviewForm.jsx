import React, { useContext, useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import { ShowTvContext } from "@/Pages/Series/Show";
import reviewFormSchema from "@/utils/reviewFormSchema";
import toast from "react-hot-toast";
import InputRichText from "./InputRichText";
import MyRadioGroup from "./MyRadioGroup";
import LikeIcon from "./svg/LikeIcon";
import MyButton from "./MyButton";
import LoadingScreen from "./LoadingScreen";

const ReviewForm = ({
    reviews,
    setReviews,
    user,
    media,
    oldListData,
    model,
}) => {
    const [oldReview, setOldReview] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    console.log("media", media);
    const handleSubmitReview = (values, resetForm) => {
        setIsLoading(true);
        const data = {
            api_id: media.id,
            tvlist_id: oldListData?.id,
            ...values,
        };

        console.log("data", data);
        axios
            .post(route("review.store", { model: model }), data)
            .then((res) => {
                // se agrega el nuevo review al array de reviews
                setTimeout(() => {
                    console.log("newrecord", res.data.newRecord);
                    setReviews([...reviews, res.data.newRecord]);
                    toast.success(res.data.message, {
                        position: "bottom-left",
                        duration: 4000,
                    });
                    setIsLoading(false);
                }, 500);
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: "bottom-left",
                });
                setIsLoading(false);
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

    const handleUpdateReview = (values, review) => {
        setIsLoading(true);
        axios
            .put(route("review.update", { review: review.id }), values)
            .then((res) => {
                // se actualiza el review en el array de reviews
                const updatedReviews = reviews.map((review) => {
                    if (review.id === res.data.newRecord.id) {
                        review.content = res.data.newRecord.content;
                        review.recommended = res.data.newRecord.recommended;
                    }
                    return review;
                });

                setTimeout(() => {
                    setReviews(updatedReviews);
                    toast.success(res.data.message, {
                        position: "bottom-left",
                        duration: 4000,
                    });
                    setIsLoading(false);
                }, 500);
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: "bottom-left",
                });
            });
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
            <div className="relative">
                <div
                    className={` transition-all duration-300 ${
                        isLoading ? "opacity-30" : ""
                    }`}
                >
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
                                //llenar formulario con los datos anteriores
                                if (reviews.length > 0) {
                                    const myReview = reviews.find(
                                        (review) => review.user_id == user.id
                                    );
                                    if (myReview) {
                                        setOldReview(myReview);
                                        setFieldValue(
                                            "content",
                                            myReview.content
                                        );
                                        setFieldValue(
                                            "recommended",
                                            myReview.recommended * 1
                                        );
                                        console.log("mi review", myReview);
                                        console.log("form values", values);
                                    }
                                }
                            }, [reviews]);

                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="flex items-center justify-between ">
                                        <MyRadioGroup
                                            radioOptions={[
                                                {
                                                    name: "Si",
                                                    value: 1,
                                                    icon: (
                                                        <LikeIcon className="w-6 " />
                                                    ),
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
                                        {Object.keys(oldReview).length ? (
                                            <MyButton
                                                type="button"
                                                onClick={() => {
                                                    handleUpdateReview(
                                                        values,
                                                        oldReview
                                                    );
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
                                    <InputRichText
                                        height={300}
                                        name="content"
                                    />
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
                {isLoading ? <LoadingScreen /> : null}
            </div>
        </div>
    );
};

export default ReviewForm;
