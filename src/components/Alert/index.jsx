import './style.scss';
import { useGlobalContext } from "../../providers/globalContext"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';

export default function Alert() {

    const { alertModal, setAlertModal } = useGlobalContext()

    const tag = alertModal.tag

    const closeModal = () => {
        setAlertModal({
            open: false,
            tag: "sucess",
            message: ""
        })
    }

    const configs = {
        alert: {
            color: "var(--yellow-1000)",
            icon: <img src="https://fluxofinanceiro.site/assets/alerta.png" alt="alert icon" />
        },
        error: {
            color: "var(--red-900)",
            icon: <img src="https://fluxofinanceiro.site/assets/erro.png" alt="error icon" />
        },
        sucess: {
            color: "var(--green-1000)",
            icon: <img src="https://fluxofinanceiro.site/assets/sucesso.png" alt="sucess icon" />
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            closeModal();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [alertModal.open])

    return (
        <AnimatePresence>
            {alertModal.open &&
                <motion.div
                    className="horizontal-align ai-center gap2 alert br bg-gray-600"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    style={{ backgroundColor: configs[tag].color }}
                >
                    {configs[tag].icon}
                    <span className="text-3xl">{alertModal.message}</span>
                </motion.div>
            }
        </AnimatePresence>
    );
}