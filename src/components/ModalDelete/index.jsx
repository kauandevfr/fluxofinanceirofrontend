import { useGlobalContext } from '../../providers/globalContext';
import ModalBase from '../ModalBase';
import './style.scss';
import instance from '../../utilities/instance';
import { useExpenseContext } from "../../providers/expenseContext"

export default function ModalDelete() {

    const { deleteModal, setDeleteModal } = useGlobalContext()

    const { listingExpenses, listingCategories, listingPaymentForms, listingBanks } = useExpenseContext()

    const closeModal = () => {
        setDeleteModal({
            open: false,
            item: {},
            type: ""
        })
    }

    const deleteItem = async (e, id) => {

        e.preventDefault()

        const configs = {
            despesa: { endpoint: `/cobranca/${id}`, callback: listingExpenses },
            // renda: { endpoint: `/renda/${id}`, callback: listarRendas },
            categoria: { endpoint: `/categoria/${id}`, callback: listingCategories },
            "forma de pagamento": { endpoint: `/formapagamento/${id}`, callback: listingPaymentForms },
            banco: { endpoint: `/instituicaofinanceira/${id}`, callback: listingBanks },
        };

        try {

            const { endpoint, callback } = configs[deleteModal.type];
            await instance.delete(endpoint);
            callback();

            closeModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ModalBase
            header={{
                title: `Excluir ${deleteModal.item.titulo}?`,
                icon: <img className="form-icon bg-red-900" src="http://fluxofinanceiro.site/assets/deletar.png" alt="delete icon" />
            }}
            isOpen={deleteModal.open}
            onClose={closeModal}
            onSubmit={(e) => deleteItem(e, deleteModal.item.id)}
        >
            <h2 className="form-subtitle">Esta ação excluirá permanentemente o(a) {deleteModal.type} selecionado(a) e não poderá ser desfeita.</h2>
            <div className="horizontal-align gap1 w100">
                <button className="button w100 bg-gray-500" type="button" onClick={closeModal}>Cancelar</button>
                <button className="button bg-gradient-red w100" type="submit">Excluir</button>
            </div>
        </ModalBase>
    );
}