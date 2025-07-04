import { useExpenseContext } from '../../providers/expenseContext';
import CardCategory from '../CardCategory';
import ModalBase from '../ModalBase';
import Skeleton from '../Skeleton';
import WithoutListing from '../WithoutListing';
import './style.scss';
import { useState } from 'react';

export default function ModalExpense() {

    const { expenseModal, setExpenseModal, categories, paymentForms } = useExpenseContext();

    const [value, setValue] = useState('R$ 0,00');

    const formatCurrency = (value) => {
        const digitsOnly = value.replace(/\D/g, '');
        const numericValue = (parseInt(digitsOnly, 10) || 0).toString().padStart(3, '0');
        const cents = numericValue.slice(-2);
        const reais = numericValue.slice(0, -2);
        const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `R$ ${formattedReais},${cents}`;
    };

    const handleCurrencyChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        const formatted = formatCurrency(digitsOnly);
        setValue(formatted);
    };

    const handleKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '');
        setValue(formatCurrency(digitsOnly));
    };


    return (
        <ModalBase
            isOpen={expenseModal.open}
            onClose={() => setExpenseModal({ oepn: false, type: "", item: {} })}
            header={{
                title: `${expenseModal.type} despesa`,
                icon: <img className='form-icon bg-red-900' src="https://fluxofinanceiro.site/assets/despesa.png" alt="expense icon" />
            }}
        >

            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required autoFocus placeholder="Digite o título da cobrança"
                />
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
                                />
                            )
                        }) : <WithoutListing />}
                </div>
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
                                />
                            )
                        }) : <WithoutListing />}
                </div>
            </div>

            <div className="item-form">
                <label className="label" htmlFor="status">Status</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    <CardCategory color="var(--red-1000)" title="Não pago" />
                    <CardCategory color="var(--green-1000)" title="Pago" />
                </div>
            </div>

            <div className="item-form">
                <label className="label" htmlFor="status">Parcelamento</label>
                <div className="horizontal-align w100 gap1 ai-center">
                    <button className="button" type="button">+</button>
                    <span className="form-title w100 text-center">teste</span>
                    <button className="button" type="button">-</button>
                </div>
            </div>

            <div className="item-form">
                <label className="label" htmlFor="observation">Observação</label>
                <textarea className="input" id="observation" rows="4" cols="50" placeholder="Adicione uma observação (opcional)"></textarea>
            </div>

            <div className="item-form">
                <label className="label" htmlFor="value">Valor</label>
                <input
                    className="input"
                    type="text"
                    id="value"
                    value={value}
                    onChange={handleCurrencyChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    placeholder="R$ 0,00"
                />
            </div>

            <div className="item-form">
                <label className="label" htmlFor="overduedate" >Data de vencimento</label>
                <input className="input" type="date" id="overduedate" required
                />
            </div>

            <div className="item-form">
                <label className="label" htmlFor="inclusiondate" >Data de inclusão</label>
                <input className="input" type="date" id="inclusiondate" required
                />
            </div>

            <button className="button" type="submit" >Adicionar Despesa</button>
        </ModalBase>
    );
}
