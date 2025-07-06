import './style.scss';
import ModalBase from '../ModalBase'
import months from '../../data/months';
import { useExpenseContext } from '../../providers/expenseContext';
import { useEffect } from 'react';


export default function ModalAddIn({ callback }) {

    const { addInModal, setAddInModal } = useExpenseContext()

    const closeModal = async () => {
        setAddInModal({
            open: false,
            mes: "",
            ano: ""
        })
    }

    useEffect(() => {
        if (addInModal.open === false) {
            closeModal()
        }

    }, [addInModal.open])

    return (
        <ModalBase
            header={{
                title: `Adicionar despesas em?`,
                icon: <img className="form-icon bg-red-900" src="http://fluxofinanceiro.site/assets/despesa.png" alt="expense icon" />
            }}
            isOpen={addInModal.open}
            onClose={closeModal}
            onSubmit={(e) => callback(e)}
        >
            <div className="horizontal-align gap2">
                <div className="item-form">
                    <label className="label" htmlFor="mes">Mês</label>
                    <input
                        className="input"
                        type="text"
                        id="mes"
                        list="meses"
                        value={addInModal.mes}
                        placeholder="Selecione o mês"
                        onChange={(e) => setAddInModal({ ...addInModal, mes: e.target.value })}
                    />
                    <datalist id="meses">
                        {months.map(month => (
                            <option key={month.id}
                                value={month.month}
                            >
                                {month.month}
                            </option>
                        ))}
                    </datalist>
                </div>
                <div className="item-form">
                    <label className="label" htmlFor="ano">Ano</label>
                    <input
                        className="input"
                        type="number"
                        id="ano"
                        value={addInModal.ano}
                        placeholder="Selecione o ano"
                        onChange={(e) => setAddInModal({ ...addInModal, ano: Number(e.target.value) })}
                    />
                </div>
            </div>

            <button className="button" type="submit">Adicionar</button>


        </ModalBase>
    );
}