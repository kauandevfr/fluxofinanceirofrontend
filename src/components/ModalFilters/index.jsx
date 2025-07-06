import { useEffect, useState } from 'react';
import { useExpenseContext } from '../../providers/expenseContext';
import CardCategory from '../CardCategory';
import ModalBase from '../ModalBase';
import Skeleton from '../Skeleton';
import WithoutListing from '../WithoutListing';
import './style.scss';
import { useGlobalContext } from '../../providers/globalContext';

export default function ModalFilters() {
    const { filtersModal, setFiltersModal, categories, paymentForms, listingExpenses } = useExpenseContext()

    const { redirect, queryParams } = useGlobalContext()

    const { query } = queryParams();

    const initialValues = {
        status: null,
        categorias: [],
        formapgamento: []
    }

    const [selected, setSelected] = useState(initialValues)

    const closeModal = () => {
        setSelected(initialValues)
        setFiltersModal(false)
    }

    const handleSelectToggle = (field, id) => {
        setSelected(prev => {
            const alreadySelected = prev[field].includes(id);
            return {
                ...prev,
                [field]: alreadySelected
                    ? prev[field].filter(itemId => itemId !== id)
                    : [...prev[field], id]
            };
        });
    };

    const applyFilters = (e) => {
        e.preventDefault();

        const newQuery = query
        const { categorias, formapgamento, status } = selected;

        if (typeof status === "boolean") {
            newQuery.set("status", status === false ? 0 : 1)
        }
        else {
            newQuery.delete("status")
        }

        const filtrosArray = { categorias, formapgamento };
        Object.entries(filtrosArray).forEach(([chave, valor]) => {
            valor?.length
                ? newQuery.set(chave, valor.join(','))
                : newQuery.delete(chave);
        });

        redirect(`expenses/?${newQuery.toString()}`);
        closeModal();
    };

    const removeFilters = () => {
        const newQuery = new URLSearchParams();
        if (query.has('mes')) {
            newQuery.append('mes', query.get('mes'));
        }
        if (query.has('ano')) {
            newQuery.append('ano', query.get('ano'));
        }
        closeModal()
        redirect(`expenses/?${newQuery.toString()}`);
    };


    return (
        <ModalBase
            isOpen={filtersModal}
            onClose={closeModal}
            header={{
                title: "Filtros",
                icon: <img className='form-icon bg-gray-700' src="https://fluxofinanceiro.site/assets/filtros.png" alt="filters icon" />
            }}
            onSubmit={(e) => applyFilters(e)}
        >
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
                                    clickable={true}
                                    onClick={() => handleSelectToggle('categorias', element.id)}
                                    active={!selected.categorias.includes(element.id)}
                                />
                            )
                        }) : <WithoutListing tag="category" />}
                </div>
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
                                    clickable={true}
                                    onClick={() => handleSelectToggle('formapgamento', element.id)}
                                    active={!selected.formapgamento.includes(element.id)}
                                />
                            )
                        }) : <WithoutListing tag="paymentform" />}
                </div>
            </div>
            <div className="item-form">
                <label className="label" htmlFor="status">Status</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    <CardCategory color="var(--green-1000)" title="Pago" clickable={true}
                        active={selected.status === null ? true : selected.status !== true}
                        onClick={() =>
                            setSelected(prev => ({
                                ...prev,
                                status: prev.status === true ? null : true
                            }))
                        }
                    />
                    <CardCategory color="var(--red-1000)" title="Não pago" clickable={true}
                        active={selected.status === null ? true : selected.status !== false}
                        onClick={() =>
                            setSelected(prev => ({
                                ...prev,
                                status: prev.status === false ? null : false
                            }))
                        }
                    />
                </div>
            </div>
            <div className="horizontal-align gap2">
                {Array.from(new URLSearchParams(location.search).keys()).some(param => param !== 'mes' && param !== 'ano') && (
                    <button className="button bg-gradient-red w100" onClick={removeFilters}>
                        Remover filtros
                    </button>
                )}
                <button className="button w100" type="submit">Aplicar filtros</button>
            </div>
        </ModalBase>
    );
}