import { useExpenseContext } from '../../providers/expenseContext';
import CardCategory from '../CardCategory';
import ModalBase from '../ModalBase';
import './style.scss';

export default function ModalPaymentCategory() {

    const { paymentCategory, setPaymentCategory } = useExpenseContext()

    const closeModal = () => {
        setPaymentCategory({
            open: false,
            type: "",
            item: {},
            tag: ""
        })
    }

    return (
        <ModalBase
            header={{
                title: `${paymentCategory.type} ${paymentCategory.tag} `,
                icon: <img className="form-icon bg-main-500" src={`http://fluxofinanceiro.site/assets/${paymentCategory.tag.toLowerCase()}.png`} alt="bank icon" />
            }}
            isOpen={paymentCategory.open}
            onClose={closeModal}
        >

            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required placeholder={`Digite o título da ${paymentCategory.tag}`}
                />
            </div>

            <div className="item-form">
                <label className="label" htmlFor="status">Status</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    <CardCategory color="var(--red-1000)" title="Indisponível" />
                    <CardCategory color="var(--green-1000)" title="disponível" />
                </div>
            </div>

            <div className="item-form">
                <label className="label" htmlFor="color">Cor:</label>
                <input className="color-input" type="color" id="color" required />
            </div>

            <button type="submit" className="button">{paymentCategory.type}</button>

        </ModalBase>
    );
}