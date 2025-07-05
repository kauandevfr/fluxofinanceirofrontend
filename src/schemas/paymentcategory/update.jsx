import * as Yup from 'yup';

// Mesma função para validar cor
const isValidColor = (value) => {
    const s = new Option().style;
    s.color = value;
    return s.color !== '';
};

const updatePaymentCategory = Yup.object().shape({
    titulo: Yup.string()
        .notRequired(),

    cor: Yup.string()
        .notRequired()
        .test('is-color', 'Cor inválida', value => {
            if (!value) return true; // ignora se não foi fornecida
            return isValidColor(value);
        }),

    status: Yup.boolean()
        .notRequired()
});



export default updatePaymentCategory;