import { yupResolver } from '@hookform/resolvers/yup';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useExpenseContext } from '../../providers/expenseContext';
import { useGlobalContext } from '../../providers/globalContext';
import registerExpense from '../../schemas/expense/register';
import updateExpense from '../../schemas/expense/update';
import instance from '../../utilities/instance';
import CardCategory from '../CardCategory';
import ModalBase from '../ModalBase';
import Skeleton from '../Skeleton';
import WithoutListing from '../WithoutListing';
import './style.scss';

export default function ModalExpense() {
    const { expenseModal, setExpenseModal, categories, paymentForms, listingExpenses } = useExpenseContext();

    const { queryParams } = useGlobalContext()

    const { objQuery } = queryParams()

    const [real, setReal] = useState('R$ 0,00');

    const isAdding = expenseModal.type

    const { reset, register, watch, setValue, handleSubmit, formState: { errors } } =
        useForm({
            resolver: yupResolver(isAdding === "Adicionar" ? registerExpense : updateExpense),
        })

    const parcelas = watch("parcelas")

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

    const addEditExpense = async (data) => {
        const { mes, ano } = objQuery
        const preco = parseFloat((data.preco?.toString().replace(/\D/g, '') || '0')) / 100;
        const status = data.status === true ? 1 : 0;

        try {
            const payload = { ...data, status, preco, mes, ano };
            const endpoint = "/cobranca";
            const method = isAdding === "Adicionar" ? "post" : "put";
            const url = isAdding === "Adicionar" ? endpoint : `${endpoint}/${expenseModal.item?.id}`;
            await instance[method](url, payload);

            listingExpenses()
            closeModal();
        } catch (error) {
            console.error("Erro ao salvar despesa:", error);
        }
    };

    const closeModal = () => {
        setExpenseModal({ open: false, type: "", item: {} })
        reset()
    }

    useEffect(() => {
        const precoBruto = watch("preco") || "";
        setReal(formatCurrency(precoBruto.toString()));
    }, [watch("preco")]);

    useEffect(() => {
        if (expenseModal.open) {
            const getItem = (path, fallback) => get(expenseModal, `item.${path}`, fallback);
            const formatDate = (dateStr) => dateStr?.split('T')[0] || '';

            reset({
                titulo: getItem('titulo', ''),
                formapagamento: getItem('formapagamento.id', ''),
                categoria: getItem('categoria.id', ''),
                observacao: getItem('observacao', ''),
                preco: getItem('precoBR', ''),
                datainclusao: formatDate(getItem('datainclusao', '')),
                datavencimento: formatDate(getItem('datavencimento', '')),
                status: getItem('status') === 1 ? true : getItem('status', true),
                parcelas: 0

            });
        }
    }, [expenseModal.open]);

    return (
        <ModalBase
            isOpen={expenseModal.open}
            onClose={closeModal}
            header={{
                title: `${isAdding} despesa`,
                icon: <img className='form-icon bg-red-900' src="https://fluxofinanceiro.site/assets/despesa.png" alt="expense icon" />
            }}
            onSubmit={handleSubmit(addEditExpense)}
        >
            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required autoFocus placeholder="Digite o título da cobrança"
                    {...register("titulo")}
                />
                {errors.titulo && <span className="span-message error">{errors.titulo?.message}</span>}
            </div>
            <div className="item-form">
                <label className="label" htmlFor="paymentforms">Formas de pagamento</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    {paymentForms.loading ? <Skeleton /> :
                        paymentForms.items.length ? paymentForms.items.map(element => {
                            return (
                                <CardCategory
                                    color={element.cor}
                                    title={element.titulo}
                                    key={element.id}
                                    onClick={() => setValue("formapagamento", element.id)}
                                    active={watch("formapagamento") !== element.id}
                                    clickable={true}
                                />
                            )
                        }) : <WithoutListing tag="paymentform" />}
                </div>
                {errors.formapagamento && <span className="span-message error">{errors.formapagamento?.message}</span>}
            </div>
            <div className="item-form">
                <label className="label" htmlFor="categories">Categorias</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    {categories.loading ? <Skeleton /> :
                        categories.items.length ? categories.items.map(element => {
                            return (
                                <CardCategory
                                    color={element.cor}
                                    title={element.titulo}
                                    key={element.id}
                                    onClick={() => setValue("categoria", element.id)}
                                    active={watch("categoria") !== element.id}
                                    clickable={true}
                                />
                            )
                        }) : <WithoutListing tag="category" />}
                </div>
                {errors.categoria && <span className="span-message error">{errors.categoria?.message}</span>}
            </div>
            {isAdding === "Adicionar" &&
                <div className="item-form">
                    <label className="label" htmlFor="status">Parcelamento</label>
                    <div className="horizontal-align w100 gap1 ai-center">
                        <button className="button" type="button"
                            onClick={() => setValue("parcelas", Math.max(0, parcelas - 1))}
                        >-</button>
                        <span className="form-subtitle w100 text-center">
                            {parcelas === 0
                                ? "Pagamento à vista (sem parcelamento)"
                                : `${parcelas} ${parcelas > 1 ? "parcelas" : "parcela"} no pagamento`}
                        </span>
                        <button className="button" type="button"
                            onClick={() => setValue("parcelas", parcelas + 1)}
                        >+</button>
                    </div>
                </div>
            }
            <div className="item-form">
                <label className="label" htmlFor="observation">Observação</label>
                <textarea className="input" id="observation" rows="4" cols="50" placeholder="Adicione uma observação (opcional)"
                    {...register("observacao")}
                ></textarea>
                {errors.observacao && <span className="span-message error">{errors.observacao?.message}</span>}
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
                <label className="label" htmlFor="overduedate" >Data de vencimento</label>
                <input className="input" type="date" id="overduedate"
                    {...register("datavencimento")}
                />
                {errors.datavencimento && <span className="span-message error">{errors.datavencimento?.message}</span>}
            </div>
            <div className="item-form">
                <label className="label" htmlFor="inclusiondate" >Data de inclusão</label>
                <input className="input" type="date" id="inclusiondate" required
                    {...register("datainclusao")}
                />
                {errors.datainclusao && <span className="span-message error">{errors.datainclusao?.message}</span>}
            </div>
            <div className="horizontal-align ai-center gap1 jc-end">
                <label htmlFor="status" className="label">Paga</label>
                <input className="input" type="checkbox" id="status"
                    {...register("status")}
                />
                {errors.status && <span className="span-message error">{errors.status?.message}</span>}
            </div>
            <button className="button" type="submit" >{isAdding} despesa</button>
        </ModalBase>
    );
}
