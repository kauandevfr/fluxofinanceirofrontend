import * as yup from "yup"

export const schemaRecoveryPass = yup.object().shape({
    senha: yup.string()
        .trim()
        .required("Este campo deve ser preenchido.")
        .min(8, "A senha deve ter no mínimo 8 caracteres.")
        .matches(/[0-9]/)
        .matches(/[a-z]/)
        .matches(/[A-Z]/)
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .test("no-spaces", (value) => !/\s/.test(value)),
    repitaSenha: yup.string()
        .oneOf([yup.ref("senha"), null], "As senhas não coincidem.")
        .required("Este campo deve ser preenchido.")
})


export const schemaUpdatePass = yup.object().shape({
    senhaAntiga: yup.string()
        .required("Informe a senha atual"),

    senhaNova: yup.string()
        .trim()
        .required("Este campo deve ser preenchido.")
        .min(8, "")
        .matches(/[0-9]/)
        .matches(/[a-z]/)
        .matches(/[A-Z]/)
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .test("no-spaces", (value) => !/\s/.test(value)),

    repitaSenha: yup.string()
        .required("Confirme a nova senha")
        .oneOf([yup.ref("senhaNova"), null], "As senhas não coincidem."),
})

export const schemaEmail = yup.object().shape({
    email: yup
        .string()
        .email("E-mail inválido")
        .required("O e-mail é obrigatório")
});