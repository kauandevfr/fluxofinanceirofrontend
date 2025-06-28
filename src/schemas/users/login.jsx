import * as yup from "yup";

const loginUsers = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required("Este campo deve ser preenchido.")
        .email("Insira um email no formato válido."),
    senha: yup.string()
        .trim()
        .required("Este campo deve ser preenchido.")
})

export default loginUsers;