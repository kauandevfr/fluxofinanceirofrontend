import * as Yup from 'yup';

const registerExpense = Yup.object().shape({
    titulo: Yup.string()
        .required('O título é obrigatório'),

    formapagamento: Yup.mixed()
        .required('A forma de pagamento é obrigatória')
        .test('is-valid-formapagamento', 'Deve ser número ou texto', value =>
            typeof value === 'string' || typeof value === 'number'
        ),

    categoria: Yup.mixed()
        .required('A categoria é obrigatória')
        .test('is-valid-categoria', 'Deve ser número ou texto', value =>
            typeof value === 'string' || typeof value === 'number'
        ),

    parcelado: Yup.number()
        .typeError('Parcelado deve ser um número')
        .nullable(),

    observacao: Yup.string()
        .nullable(),

    preco: Yup.number()
        .typeError('Valor deve ser um número')
        .nullable(),

    datainclusao: Yup.date()
        .typeError('Data de inclusão inválida')
        .required('A data de inclusão é obrigatória'),

    datavencimento: Yup.date()
        .typeError('Data de vencimento inválida')
        .nullable(),

    status: Yup.boolean()
        .required('O status é obrigatório')
});


export default registerExpense