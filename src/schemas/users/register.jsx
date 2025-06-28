import * as yup from "yup";

const registerUsers = yup.object().shape({
    nome: yup
        .string()
        .trim()
        .required("Este campo deve ser preenchido.")
        .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Somente letras."),
    email: yup
        .string()
        .trim()
        .required("Este campo deve ser preenchido.")
        .email("Insira um email no formato válido."),
    senha: yup.string()
        .trim()
        .required("Este campo deve ser preenchido.")
        .min(8, "A senha deve ter no mínimo 8 caracteres.")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número.")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial.")
        .test("no-spaces", "A senha não pode conter espaços.", (value) => !/\s/.test(value)),
})
export default registerUsers