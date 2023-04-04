import * as Yup from "yup";

const reviewFormSchema = Yup.object({
    content: Yup.string()
        .min(1, "Muy corto, minimo 10 caracteres")
        .max(500, "Excediste el numero de caracteres")
        .required("Debes escribir una reseña"),
    // recommended: Yup.boolean().oneOf([true, false]),
});

export default reviewFormSchema;
