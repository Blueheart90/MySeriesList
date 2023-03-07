import * as Yup from "yup";

const addListFormSchema = Yup.object({
    watching_state: Yup.number().moreThan(0, "Debes elegir un estado"),
    // season: Yup.string()
    //     .email("Debe ser un correo valido")
    //     .required("El email es requerido"),
    // episode: Yup.string()
    //     .min(10, "Muy corto, minimo 10 caracteres")
    //     .max(500, "Excediste el numero de caracteres")
    //     .required("El mensaje es requerido"),
    score_id: Yup.number().moreThan(0, "Debes elegir una calificación"),
});

export default addListFormSchema;
