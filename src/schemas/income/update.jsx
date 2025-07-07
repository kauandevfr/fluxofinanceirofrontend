import * as Yup from 'yup';

const updateIncome = Yup.object().shape({
    titulo: Yup.string(),

    preco: Yup.string(),

    datainclusao: Yup.date()
        .nullable(),

});

export default updateIncome;
