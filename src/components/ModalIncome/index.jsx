import { yupResolver } from '@hookform/resolvers/yup';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../providers/globalContext';
import { useIncomeContext } from '../../providers/incomeContext';
import registerIncome from '../../schemas/income/register';
import updateIncome from '../../schemas/income/update';
import instance from '../../utilities/instance';
import ModalBase from '../ModalBase';
import './style.scss';
import { format } from 'date-fns';

export default function ModalIncome() {

    const { incomeModal, setIncomeModal, listingIncomes } = useIncomeContext()

    const { queryParams } = useGlobalContext()

    const { objQuery } = queryParams()

    const [real, setReal] = useState('R$ 0,00');

    const isAdding = incomeModal.type

    const { reset, register, watch, setValue, handleSubmit, formState: { errors } } =
        useForm({
            resolver: yupResolver(isAdding === "Adicionar" ? registerIncome : updateIncome),
        })

    const closeModal = () => {
        setIncomeModal({
            open: false,
            item: {},
            type: ""
        })
    }

    const formatCurrency = value => {
        const digitsOnly = value.replace(/\D/g, '');
        const numericValue = (parseInt(digitsOnly, 10) || 0).toString().padStart(3, '0');
        const cents = numericValue.slice(-2);
        const reais = numericValue.slice(0, -2);
        const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `R$ ${formattedReais},${cents}`;
    };

    const handleCurrencyChange = e => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        const formatted = formatCurrency(digitsOnly);
        setReal(formatted);
        setValue("preco", digitsOnly);
    };

    const handleKeyDown = e => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handlePaste = e => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '');
        setReal(formatCurrency(digitsOnly));
    };

    const addEditincome = async data => {
        const { mes, ano } = objQuery
        const preco = parseFloat((data.preco?.toString().replace(/\D/g, '') || '0')) / 100;

        try {
            const payload = { ...data, preco, mes, ano }
            const endpoint = "/renda";
            const method = isAdding === "Adicionar" ? "post" : "put";
            const url = isAdding === "Adicionar" ? endpoint : `${endpoint}/${incomeModal.item?.id}`;
            await instance[method](url, payload);

            listingIncomes()
            closeModal()

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (incomeModal.open) {
            console.log(incomeModal)
            const getItem = (path, fallback) => get(incomeModal, `item.${path}`, fallback);
            const formatDate = (dateStr) => dateStr?.split('T')[0] || '';

            reset({
                titulo: getItem('titulo', ''),
                preco: getItem('precoBR', ''),
                datainclusao: formatDate(getItem('datainclusao', format(new Date(), 'yyyy-MM-dd'))),
            });
        }
    }, [incomeModal.open]);

    useEffect(() => {
        const precoBruto = watch("preco") || "";
        setReal(formatCurrency(precoBruto.toString()));
    }, [watch("preco")]);

    return (
        <ModalBase
            header={{
                title: `${isAdding} receita`,
                icon: <img className='form-icon bg-green-1000' src="https://fluxofinanceiro.site/assets/receitas.png" alt="income icon" />
            }}
            isOpen={incomeModal.open}
            onClose={closeModal}
            onSubmit={handleSubmit(addEditincome)}
        >
            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required autoFocus placeholder="Digite o título da receita"
                    {...register("titulo")}
                />
                {errors.titulo && <span className="span-message error">{errors.titulo?.message}</span>}
            </div>

            <div className="item-form">
                <label className="label" htmlFor="value">Valor</label>
                <input
                    className="input"
                    type="text"
                    id="value"
                    value={real}
                    onChange={handleCurrencyChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    placeholder="R$ 0,00"
                />
                <input type="hidden" {...register("preco")} />
                {errors.preco && <span className="span-message error">{errors.preco?.message}</span>}
            </div>

            <div className="item-form">
                <label className="label" htmlFor="inclusiondate" >Data de inclusão</label>
                <input className="input" type="date" id="inclusiondate" required
                    {...register("datainclusao")}
                />
                {errors.datainclusao && <span className="span-message error">{errors.datainclusao?.message}</span>}
            </div>

            <button className="button" type="submit"> {isAdding} </button>

        </ModalBase>
    );
}