import './style.scss';
import ModalBase from '../ModalBase'
import months from '../../data/months';
import { useEffect } from 'react';
import { useGlobalContext } from '../../providers/globalContext';


export default function ModalAddIn({ callback }) {

    const { addInModal, setAddInModal } = useGlobalContext()

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

        console.log(addInModal)

    }, [addInModal.open])

    return (
        <ModalBase
            header={{
                title: `Adicionar ${addInModal.type} em?`,
                icon: addInModal.type === "receita" ? <img className="form-icon bg-green-1000" src="http://fluxofinanceiro.site/assets/receitas.png" alt="income icon" /> : <img className="form-icon bg-red-900" src="http://fluxofinanceiro.site/assets/despesa.png" alt="expense icon" />
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