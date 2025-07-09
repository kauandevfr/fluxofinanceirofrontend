import { useEffect, useState } from "react";
import instance from "../../utilities/instance";
import { useGlobalContext } from "../../providers/globalContext";
import { useIncomeContext } from "../../providers/incomeContext";
import ModalAddIn from "../ModalAddIn";
import months from "../../data/months";

export default function ModalIncomesActions({ selected, setSelected }) {

    const { setAddInModal, addInModal, listingResume, queryParams } = useGlobalContext()

    const { listingIncomes } = useIncomeContext()

    const [show, setShow] = useState(true)

    const [selectedCopy, setSelectedCopy] = useState(selected)

    const { objQuery } = queryParams()

    const closeModal = () => {
        setSelected([])
        setAddInModal({
            type: "",
            open: false,
            mes: "",
            ano: ""
        })
    }

    const closeAndListing = () => {
        closeModal();
        listingIncomes();
    };

    const deleteIncomes = async () => {
        try {
            for (let i = 0; i < selectedCopy.length; i++) {
                const element = selectedCopy[i];
                await instance.delete(`/renda/${element.id}`);
                setSelectedCopy(prev => prev.filter(item => item.id !== element.id));
            }
            closeAndListing()
            listingResume();

        } catch (error) {
            console.error(error)
        }

    };

    const addAnotherPeriod = async e => {
        e.preventDefault();

        const mesId = months.find(month => month.month === addInModal.mes).id + 1;

        const mustList = objQuery.mes == mesId && objQuery.ano == addInModal.ano;

        setAddInModal({ open: false, mes: "", ano: "", type: "" });

        try {
            for (const { id, datapagamento, dataalteracao, idusuario, pendente, precoBR, ...element } of selectedCopy) {

                const payload = {
                    ...element,
                    mes: mesId,
                    ano: addInModal.ano
                }
                console.log(payload)
                await instance.post('/renda', payload);
                setSelectedCopy(prev => prev.filter(item => item.id !== id));
            }

            if (mustList) {
                closeAndListing()
                listingResume();
            } else { closeModal() }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setSelectedCopy(selected.map(item => ({ ...item })));
    }, [selected]);

    return (
        <div className="actions bg-gray-800 br">
            <header className="actions__header bg-gradient-2 p2 horizontal-align ai-center jc-between">
                <h1 className="form-subtitle text-left" onClick={() => setShow(!show)} >{selectedCopy.length} itens selecionados</h1>

                <div className="actions__header-buttons horizontal-align gap1">

                    <button className=" pointer" type="button" onClick={() => setShow(!show)}>
                        <img src={`https://fluxofinanceiro.site/assets/${!show ? 'maximizar' : 'minimizar'}.png`} alt="maximize and minimize icon" />
                    </button>
                    <button className=" pointer" type="button" onClick={closeModal}>
                        <img src="https://fluxofinanceiro.site/assets/fechar.png" alt="close icon" />
                    </button>
                </div>
            </header>

            {show &&
                <>
                    <ul className="actions__content p1 gap1  vertical-align">
                        {selectedCopy.map(element =>
                            <li className="actions__content-row bg-gray-700 br horizontal-align ai-center jc-between gap1" key={element.id}>
                                <h1 className="actions__content-row-title">{element.titulo}</h1>
                                <h2 className="actions__content-row-subtitle">{element.precoBR}</h2>
                            </li>
                        )}
                    </ul>
                    <div className="actions__content-buttons vertical-align fx-wrap gap1 p2 bg-gray-700">
                        <button className="button bg-gradient-red" type="button" onClick={deleteIncomes}>Excluir</button>
                        <button className="button bg-main-500" type="button" onClick={() => setAddInModal({ open: true, mes: "", ano: "", type: "receita" })}>Clonar</button>
                    </div>
                </>
            }
            <ModalAddIn callback={addAnotherPeriod} />
        </div>
    )
}