import { motion, AnimatePresence } from "framer-motion";
import './style.scss';
import { useEffect } from "react";

export default function ModalBase({ header, children, isOpen, onClose, onSubmit }) {

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal__bg center-align"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.section
                        className="form"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="header-form horizontal-align p2 jc-between">
                            <div className="horizontal-align gap1 ai-center">
                                {header.icon}
                                <h1 className="form-title">{header.title}</h1>
                            </div>
                            <button className="form-icon__close pointer" type="button" onClick={onClose}>
                                <img src="https://fluxofinanceiro.site/assets/fechar.png" alt="close icon" />
                            </button>
                        </header>
                        <form className="vertical-align p2 gap2"
                            onSubmit={onSubmit}
                        >
                            {children}
                        </form>
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


