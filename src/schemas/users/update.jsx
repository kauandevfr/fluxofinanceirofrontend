import * as yup from "yup";

const updateUsers = yup.object(
    {
        nome: yup.string().trim().matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Somente letras."),
        email: yup.string().trim().email("Insira um email no formato válido."),
        datadenascimento: yup.date().max(new Date(), "A data de nascimento não pode ser maior que a data atual.").nullable().notRequired(),
        numerocontato: yup.string().trim().matches(/^\d+$/, "O número de contato deve conter apenas dígitos.").nullable().notRequired(),
        senhaAntiga: yup.string().trim(),
        senhaNova: yup.string().trim()
    }
)

export default updateUsers