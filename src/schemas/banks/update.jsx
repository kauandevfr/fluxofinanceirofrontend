import * as Yup from 'yup';

const isValidColor = (value) => {
    const s = new Option().style;
    s.color = value;
    return s.color !== '';
};

const updateBank = Yup.object().shape({
    titulo: Yup.string()
        .min(2, 'O título deve ter pelo menos 2 caracteres'),

    chavepix: Yup.string()
        .min(3, 'A chave PIX deve ter no mínimo 3 caracteres'),

    cor: Yup.string()
        .test('is-valid-color', 'Cor inválida', function (value) {
            if (!value) return true; // se vazio, pula validação
            return isValidColor(value);
        }),

    status: Yup.boolean()
        .typeError('O status precisa ser verdadeiro ou falso'),
});

export default updateBank;
