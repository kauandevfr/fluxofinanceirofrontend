import * as Yup from 'yup';

const isValidColor = (value) => {
    const s = new Option().style;
    s.color = value;
    return s.color !== '';
};

const registerPaymentCategory = Yup.object().shape({
    titulo: Yup.string()
        .required('O título é obrigatório')
        .min(2, 'O título deve ter pelo menos 2 caracteres'),

    cor: Yup.string()
        .required('A cor é obrigatória')
        .test('is-valid-color', 'Cor inválida', isValidColor),

    status: Yup.boolean()
        .required('O status é obrigatório')
        .typeError('O status precisa ser verdadeiro ou falso'),
});


export default registerPaymentCategory