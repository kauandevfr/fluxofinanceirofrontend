import './style.scss';
import ModalBase from "../../components/ModalBase"
import { useExpenseContext } from '../../providers/expenseContext';
import CardCategory from '../CardCategory';
import instance from '../../utilities/instance';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerBank from '../../schemas/banks/register';
import updateBank from '../../schemas/banks/update';
import { useEffect } from 'react';

export default function ModalBank() {

    const { bankModal, setBankModal, listingBanks } = useExpenseContext()
    const { reset, register, setValue, watch, handleSubmit, formState: { errors } } =
        useForm({
            resolver: yupResolver(bankModal.type === "Adicionar" ? registerBank : updateBank),
        })

    const closeModal = () => {
        setBankModal({
            open: false,
            item: {},
            type: "Adicionar"
        })
    }

    const status = watch("status");

    const addEditBank = async data => {
        const { id } = bankModal.item

        try {
            if (bankModal.type === "Adicionar") {
                await instance.post("/instituicaofinanceira", data)
            } else {
                await instance.put(`/instituicaofinanceira/${id}`, data)
            }

            closeModal()
            listingBanks()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (bankModal.open) {
            reset({
                titulo: bankModal.item?.titulo ?? '',
                chavepix: bankModal.item?.chavepix ?? '',
                cor: bankModal.item?.cor ?? '#B3B3B3',
                status: bankModal.item?.status === 1 ? true : false,
            });
            console.log(bankModal.item)
        }
    }, [bankModal.open]);

    return (
        <ModalBase
            header={{
                title: `${bankModal.type} banco`,
                icon: <img className="form-icon bg-main-500" src="http://fluxofinanceiro.site/assets/banco.png" alt="bank icon" />
            }}
            isOpen={bankModal.open}
            onClose={closeModal}
            onSubmit={handleSubmit(addEditBank)}

        >
            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required placeholder="Digite o título do banco"
                    {...register("titulo")}
                />
                {errors.titulo && <span className="span-message error">{errors.titulo?.message}</span>}
            </div>

            <div className="item-form">
                <label htmlFor="pixkey" className="label">Chave PIX vinculada</label>
                <input className="input" type="text" id="title" required placeholder="Digite a chave PIX"
                    {...register("chavepix")}
                />
                {errors.chavepix && <span className="span-message error">{errors.chavepix?.message}</span>}
            </div>

            <div className="item-form">
                <label className="label" htmlFor="status">Status</label>
                <div className="horizontal-align gap1 fx-wrap bg-gray-700 w100 p1 br">
                    <CardCategory color="var(--red-1000)" title="Indisponível" onClick={() => setValue("status", false)} active={status === false} />
                    <CardCategory color="var(--green-1000)" title="Disponível" onClick={() => setValue("status", true)} active={status === true} />
                </div>
            </div>


            <div className="item-form">
                <label className="label" htmlFor="color">Cor:</label>
                <input className="color-input" type="color" id="color" required
                    {...register("cor")}
                />
                {errors.cor && <span className="span-message error">{errors.cor?.message}</span>}
            </div>

            <button type="submit" className="button">{bankModal.type}</button>
        </ModalBase>
    );
}