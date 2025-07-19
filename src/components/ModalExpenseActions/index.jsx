import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import months from "../../data/months";
import { useExpenseContext } from "../../providers/expenseContext";
import { useGlobalContext } from "../../providers/globalContext";
import instance from "../../utilities/instance";
import ModalAddIn from "../ModalAddIn";
import "./style.scss";

export default function ModalExpenseActions({ selected, setSelected }) {

    const { setAddInModal, addInModal, queryParams, listingResume, setAlertModal, showError } = useGlobalContext()

    const { listingExpenses } = useExpenseContext()

    const { objQuery } = queryParams()

    const [show, setShow] = useState(true)

    const [progress, setProgress] = useState(0);

    const [selectedCopy, setSelectedCopy] = useState(selected)

    const closeModal = () => {
        setSelected([])
        setAddInModal({
            open: false,
            mes: "",
            ano: ""
        })
    }

    const closeAndListing = () => {
        closeModal();
        listingExpenses();
    };

    const removeFromSelected = (id) => {
        setSelectedCopy(prev => {
            const updated = prev.filter(item => item.id !== id);
            setProgress(((selectedCopy.length - updated.length) / selectedCopy.length) * 100);
            return updated;
        });
    };


    const deleteExpenses = async () => {
        try {
            for (let i = 0; i < selectedCopy.length; i++) {
                const element = selectedCopy[i];
                await instance.delete(`/cobranca/${element.id}`);
                removeFromSelected(element.id);
            }

            setAlertModal({
                open: true,
                tag: "sucess",
                message: `Sucesso ao excluir ${selected.length} despesas!`
            })

            listingResume();

            closeAndListing();

        } catch (error) {
            showError(error)
        }

    };

    const changeStatusExpenses = async status => {
        try {
            const newStatus = status ? 1 : 0;

            for (let i = 0; i < selectedCopy.length; i++) {
                const element = selectedCopy[i];

                if (element.status !== newStatus) {
                    await instance.put(`/cobranca/${element.id}`, { status: newStatus });
                }
                removeFromSelected(element.id);
            }

            closeAndListing();

            setAlertModal({
                open: true,
                tag: "sucess",
                message: `Sucesso ao ${status ? "pagar" : "não pagar"} ${selected.length} despesas!`
            });

        } catch (error) {
            showError(error);
        }
    };


    const addAnotherPeriod = async (e) => {
        e.preventDefault();

        const mesId = months.find(month => month.month === addInModal.mes).id + 1;

        const mustList = objQuery.mes == mesId && objQuery.ano == addInModal.ano;

        setAddInModal({ open: false, mes: "", ano: "", type: "" });

        try {
            for (const { id, datapagamento, dataalteracao, idusuario, pendente, precoBR, ...element } of selectedCopy) {
                const payload = {
                    ...element,
                    formapagamento: element.formapagamento.id,
                    categoria: element.categoria.id,
                    mes: mesId,
                    ano: addInModal.ano,
                    datainclusao: new Date()
                };
                await instance.post('/cobranca', payload);
                removeFromSelected(id);
            }

            if (mustList) {
                closeAndListing()
                listingResume();
            } else { closeModal() }

            setAlertModal({
                open: true,
                tag: "sucess",
                message: `Sucesso ao adicionar ${selected.length} despesas em ${addInModal.mes} de ${addInModal.ano}`
            })

        } catch (error) {
            showError(error)
        }
    };

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
                        <AnimatePresence>
                            {selectedCopy.map(element =>
                                <motion.li
                                    key={element.id}
                                    className="actions__content-row bg-gray-700 br horizontal-align ai-center jc-between gap1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h1 className="actions__content-row-title">{element.titulo}</h1>
                                    <h2 className="actions__content-row-subtitle">{element.precoBR}</h2>
                                </motion.li>
                            )}
                        </AnimatePresence>
                    </ul>
                    <div className="actions__content-buttons vertical-align fx-wrap gap1 p2 bg-gray-700">
                        <div className="horizontal-align gap1">
                            <button className="button bg-green-1000 w100" type="button" onClick={() => changeStatusExpenses(true)}>Pagar</button>
                            <button className="button bg-gradient-red w100" type="button" onClick={() => changeStatusExpenses(false)}>Não pagar</button>
                        </div>
                        <button className="button bg-gradient-red" type="button" onClick={deleteExpenses}>Excluir</button>
                        <button className="button bg-main-500" type="button" onClick={() => setAddInModal({ open: true, mes: "", ano: "", type: "despesa" })}>Clonar</button>
                    </div>

                </>
            }
            {progress > 0 && (
                <motion.div
                    className="progress-bar-container"
                    style={{ width: "100%", background: "#333", height: "6px", borderRadius: "4px", overflow: "hidden" }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: "100%",
                            background: "var(--bg-gradient)"
                        }}
                    />
                </motion.div>
            )}
            <ModalAddIn callback={addAnotherPeriod} />
        </div>
    )
}