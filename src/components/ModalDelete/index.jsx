import { useEffect } from 'react';
import { useGlobalContext } from '../../providers/globalContext';
import ModalBase from '../ModalBase';
import './style.scss';

export default function ModalDelete() {

    const { deleteModal, setDeleteModal } = useGlobalContext()

    const closeModal = () => {
        setDeleteModal({
            open: false,
            item: {}
        })
    }

    useEffect(() => {
        console.log(deleteModal);
    }, [])

    return (
        <ModalBase
            header={{
                title: `Confirmar exclusão?`,
                icon: <img className="form-icon bg-red-900" src="http://fluxofinanceiro.site/assets/deletar.png" alt="delete icon" />
            }}
            isOpen={deleteModal.open}
            onClose={closeModal}
        >
            <h2 className="form-subtitle">Esta ação excluirá permanentemente a {deleteModal.type} selecionada e não poderá ser desfeita.</h2>

            <div className="horizontal-align gap1 w100">
                <button className="button w100 bg-gray-500" type="button">Cancelar</button>
                <button className="button bg-gradient-red w100" type="submit">Excluir</button>
            </div>
        </ModalBase>
    );
}