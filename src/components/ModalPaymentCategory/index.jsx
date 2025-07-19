import { useForm } from 'react-hook-form';
import { useExpenseContext } from '../../providers/expenseContext';
import CardCategory from '../CardCategory';
import ModalBase from '../ModalBase';
import './style.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import registerPaymentCategory from '../../schemas/paymentcategory/register';
import updatePaymentCategory from '../../schemas/paymentcategory/update';
import { useEffect } from 'react';
import instance from '../../utilities/instance';
import { useGlobalContext } from '../../providers/globalContext';
import ButtonSubmit from '../ButtonSubmit';

export default function ModalPaymentCategory() {

    const { paymentCategory, setPaymentCategory, listingCategories, listingPaymentForms } = useExpenseContext()

    const { showError, setAlertModal } = useGlobalContext()

    const { reset, register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm({
            resolver: yupResolver(paymentCategory.type === "Adicionar" ? registerPaymentCategory : updatePaymentCategory),
        })

    const closeModal = () => {
        setPaymentCategory({
            open: false,
            type: "",
            item: {},
            tag: ""
        })
    }

    const addEditPaymentCategory = async (data) => {
        const { type, item, tag } = paymentCategory;
        const id = item?.id;

        const config = {
            categoria: { endpoint: '/categoria', callback: listingCategories },
            "forma de pagamento": { endpoint: '/formapagamento', callback: listingPaymentForms }
        };

        const { endpoint, callback } = config[tag];

        try {
            if (type === "Adicionar") {
                await instance.post(endpoint, data);
            } else {
                await instance.put(`${endpoint}/${id}`, data);
            }

            setAlertModal({
                open: true,
                tag: "sucess",
                message: `Sucesso ao ${type.toLowerCase()} ${tag}!`
            })

            callback();
            closeModal();
        } catch (error) {
            showError(error)
        }
    };

    useEffect(() => {

        if (paymentCategory.open) {
            reset({
                titulo: paymentCategory.item?.titulo ?? '',
                cor: paymentCategory.item?.cor ?? '#B3B3B3',
                status: paymentCategory.item?.status === 1
                    ? true
                    : paymentCategory.item?.status ?? true,
            });
        }
        console.log(paymentCategory.item)
    }, [paymentCategory.open])

    return (
        <ModalBase
            header={{
                title: `${paymentCategory.type} ${paymentCategory.tag} `,
                icon: <img className="form-icon bg-main-500" src={`http://fluxofinanceiro.site/assets/${paymentCategory.tag.toLowerCase()}.png`} alt="bank icon" />
            }}
            isOpen={paymentCategory.open}
            onClose={closeModal}
            onSubmit={handleSubmit(addEditPaymentCategory)}

        >
            <div className="item-form">
                <label htmlFor="title" className="label">Titulo</label>
                <input className="input" type="text" id="title" required placeholder={`Digite o título da ${paymentCategory.tag}`}
                    {...register("titulo")}
                />
                {errors.cor && <span className="span-message error">{errors.cor?.message}</span>}
            </div>

            <div className="item-form">
                <label className="label" htmlFor="color">Cor:</label>
                <input className="color-input" type="color" id="color" required
                    {...register("cor")}
                />
                {errors.cor && <span className="span-message error">{errors.cor?.message}</span>}
            </div>

            <div className="horizontal-align ai-center gap1 jc-end">
                <label htmlFor="status" className="label">Disponível</label>
                <input className="input" type="checkbox" id="status"
                    {...register("status")}
                />
            </div>
            <ButtonSubmit isLoading={isSubmitting}>{paymentCategory.type}</ButtonSubmit>
        </ModalBase>
    );
}