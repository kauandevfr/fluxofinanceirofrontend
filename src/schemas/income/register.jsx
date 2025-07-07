import * as Yup from 'yup';

const registerIncome = Yup.object().shape({
    titulo: Yup.string()
        .required('O título é obrigatório'),

    preco: Yup.number()
        .typeError('Valor deve ser um número')
        .nullable(),

    datainclusao: Yup.date()
        .typeError('Data de inclusão inválida')
        .required('A data de inclusão é obrigatória'),

});


export default registerIncome