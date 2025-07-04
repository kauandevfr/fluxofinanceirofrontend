import './style.scss';
import ModalBase from "../../components/ModalBase"
import { useExpenseContext } from '../../providers/expenseContext';
import CardCategory from '../CardCategory';

export default function ModalBank() {

    const { bankModal, setModalBank } = useExpenseContext()

    const closeModal = () => {
        setModalBank({
            open: false,
            item: {},
            type: "Adicionar"
        })
    }

    return (
        <ModalBase
            header={{
                title: `${bankModal.type} banco`,
                icon: <img className="form-icon bg-main-500" src="http://fluxofinanceiro.site/assets/banco.png" alt="bank icon" />
            }}
            isOpen={bankModal.open}
            onClose={closeModal}
        >
            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required placeholder="Digite o título do banco"
                />
            </div>

            <div className="item-form">
                <label htmlFor="pixkey" className="label">Chave PIX vinculada</label>
                <input className="input" type="text" id="title" required placeholder="Digite a chave PIX"
                />
            </div>

            <div className="item-form">
                <label className="label" htmlFor="status">Status</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    <CardCategory color="var(--red-1000)" title="Indisponível" />
                    <CardCategory color="var(--green-1000)" title="disponível" />
                </div>
            </div>

            <div class="item-form">
                <label className="label" htmlFor="color">Cor:</label>
                <input class="color-input" type="color" id="color" required />
            </div>

            <button type="submit" className="button">{bankModal.type}</button>
        </ModalBase>
    );
}