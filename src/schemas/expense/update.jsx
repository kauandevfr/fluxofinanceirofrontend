import * as Yup from 'yup';

const updateExpense = Yup.object().shape({
    titulo: Yup.string(),

    formapagamento: Yup.mixed()
        .test('is-valid-formapagamento', 'Deve ser número ou texto', value =>
            value === undefined || typeof value === 'string' || typeof value === 'number'
        ),

    categoria: Yup.mixed()
        .test('is-valid-categoria', 'Deve ser número ou texto', value =>
            value === undefined || typeof value === 'string' || typeof value === 'number'
        ),

    parcelado: Yup.number()
        .typeError('Parcelado deve ser um número')
        .nullable(),

    observacao: Yup.string()
        .nullable(),

    preco: Yup.string(),

    datainclusao: Yup.date()
        .nullable(),

    datavencimento: Yup.date()
        .nullable()
        .transform((_, val) => val === '' ? null : val)
        .typeError('Data de vencimento inválida'),

    status: Yup.boolean()
        .typeError('Status deve ser verdadeiro ou falso')
        .nullable(),
});

export default updateExpense;
