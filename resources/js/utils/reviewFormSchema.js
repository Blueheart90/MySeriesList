import * as Yup from "yup";

const reviewFormSchema = Yup.object({
    content: Yup.string()
        .min(20, "Muy corto, minimo 20 caracteres")
        .max(500, "Excediste el numero de caracteres")
        .required("Debes escribir una reseña"),
    recommended: Yup.boolean()
        .oneOf([true, false], "Debes indicar entre si o no")
        .required("Debes indicar si lo recomiendas"),
});

export default reviewFormSchema;
