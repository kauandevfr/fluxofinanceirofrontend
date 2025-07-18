import './style.scss';
import { useGlobalContext } from "../../providers/globalContext"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';

export default function Alert() {
    const [progress, setProgress] = useState(100)
    const { alertModal, setAlertModal } = useGlobalContext()

    const tag = alertModal.tag

    const closeModal = () => {
        if (alertModal.onClose) {
            alertModal.onClose();
        }
        setAlertModal({
            open: false,
            tag: "sucess",
            message: "",
            onClose: null
        });
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
        if (alertModal.open) {
            setProgress(100); // Reseta a barra sempre que abrir
            const start = Date.now();
            const duration = 3500;

            const interval = setInterval(() => {
                const elapsed = Date.now() - start;
                const percentage = Math.max(100 - (elapsed / duration) * 100, 0);
                setProgress(percentage);
            }, 50);

            const timeout = setTimeout(() => {
                closeModal();
            }, duration);

            return () => {
                clearTimeout(timeout);
                clearInterval(interval);
            };
        }
    }, [alertModal.open]);

    return (
        <AnimatePresence>
            {alertModal.open &&
                <motion.div
                    className="horizontal-align ai-center gap2 alert br bg-gray-600"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    style={{ backgroundColor: configs[tag].color, overflow: "hidden" }}
                >
                    {configs[tag].icon}
                    <span className="text-3xl">{alertModal.message}</span>

                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: "4px",
                            backgroundColor: "#fff",
                            width: `${progress}%`
                        }}
                        initial={{ width: "100%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0 }}
                    />
                </motion.div>}
        </AnimatePresence>
    );
}