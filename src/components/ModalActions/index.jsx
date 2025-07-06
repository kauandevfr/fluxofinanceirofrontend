import "./style.scss"

export default function ModalActions({ selected, setSelected }) {

    const closeModal = () => {
        setSelected([])
    }

    return (
        <div className="actions bg-gray-800 br">
            <header className="actions__header bg-gradient-2 p2 horizontal-align ai-center jc-between">
                <h1 className="form-subtitle text-left">{selected.length} itens selecionados</h1>
                <button className="form-icon__close pointer" type="button" onClick={closeModal}>
                    <img src="https://fluxofinanceiro.site/assets/fechar.png" alt="close icon" />
                </button>
            </header>
            <ul className="actions__content p1 gap1  vertical-align">
                {selected.map(element =>
                    <li className="actions__content-row bg-gray-700 br horizontal-align ai-center jc-between gap1" key={element.id}>
                        <h1 className="actions__content-row-title">{element.title}</h1>
                        <h2 className="actions__content-row-subtitle">{element.price}</h2>
                    </li>
                )}
            </ul>
            <div className="actions__content-buttons vertical-align fx-wrap gap1 p2 bg-gray-700">
                <div className="horizontal-align gap1">
                    <button className="button bg-green-1000 w100" type="button">Pagar</button>
                    <button className="button bg-gradient-red w100" type="button">Não pagar</button>
                </div>
                <button className="button bg-main-500" type="button">Clonar</button>
                <button className="button bg-gradient-red" type="button">Excluir</button>
            </div>
        </div>
    )
}