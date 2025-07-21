import { useEffect, useRef, useState } from "react";
import Alert from "../../components/Alert";
import ButtonSubmit from "../../components/ButtonSubmit";
import FooterCopyright from "../../components/FooterCopyright";
import "./style.scss"
import { useGlobalContext } from "../../providers/globalContext";
import instance from "../../utilities/instance";
import { useUserContext } from "../../providers/userContext";
import { motion, AnimatePresence } from "framer-motion";


export default function VerifyEmail() {
    const { setAlertModal, redirect, currentMonthYear, showError } = useGlobalContext()

    const { logoutSystem, listUser, user, justVerified } = useUserContext()

    const [code, setCode] = useState(["", "", "", "", ""]);

    const inputsRef = useRef([]);

    const [remaining, setRemaining] = useState(0)

    const { mes, ano } = currentMonthYear()

    const handleChange = (e, i) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 1);
        const newCode = [...code]
        newCode[i] = value
        setCode(newCode)

        if (value && i < inputsRef.current.length - 1) {
            inputsRef.current[i + 1].focus();
        }

        if (newCode.every((v) => v !== "")) {
            sendCode(newCode.join(""));
        }
    }

    const handleKeyDown = (e, i) => {
        const newCode = [...code]

        if ((e.key === "Backspace" || e.key === "ArrowLeft") && !code[i] && i > 0) {

            if (code[i]) {
                newCode[i] = "";
            } else if (i > 0) {
                newCode[i - 1] = "";
                inputsRef.current[i - 1].focus();
            }
            inputsRef.current[i - 1].focus();
        }
    };

    const sendCode = async code => {

        if (user.data.codeemail !== code) {
            setAlertModal({
                open: true,
                tag: "error",
                message: "Código inválido.",
            })

            return
        } else {
            try {

                await instance.post("/user/verify-email", { code })

                setAlertModal({
                    open: true,
                    tag: "sucess",
                    message: "Email validado! Redirecionando para o painel.",
                    onClose: () => redirect(`/dashboard/?mes=${mes}&ano=${ano}`)
                })

                inputsRef.current.forEach((input, index) => {
                    setTimeout(() => {
                        if (input) input.style.border = "1.3px solid var(--green-1000)";
                    }, index * 160)
                });

            } catch (error) {
                showError(error)
            }
        }

    }

    const resendCode = async (e) => {
        e.preventDefault();
        try {
            await instance.post("/user/resend-code");

            const expireAt = Date.now() + (user.data.retryafter * 1000);
            localStorage.setItem("resendExpireAt", expireAt);

            setRemaining(user.data.retryafter);

            setAlertModal({
                open: true,
                tag: "sucess",
                message: "Código reenviado!",
            });

            listUser();
        } catch (error) {
            showError(error);
        }
    };


    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    useEffect(() => {

        if (justVerified) {
            setAlertModal({
                open: true,
                tag: "sucess",
                message: "Email já verificado. Redirecionando...",
                onClose: () => redirect(`/dashboard/?mes=${mes}&ano=${ano}`)
            })
        }

    }, [justVerified])

    useEffect(() => {
        listUser();

        const storedExpire = localStorage.getItem("resendExpireAt");
        const now = Date.now();
        if (storedExpire && now < storedExpire) {
            setRemaining(Math.floor((storedExpire - now) / 1000));
        } else {
            const lastSent = new Date(user.data.lastsendcode).getTime();
            const expireAt = lastSent + user.data.retryafter * 1000;
            if (expireAt > now) {
                setRemaining(Math.floor((expireAt - now) / 1000));
                localStorage.setItem("resendExpireAt", expireAt);
            }
        }

        document.title = "Verificar Email | Fluxo Financeiro";
    }, [])

    useEffect(() => {
        if (remaining > 0) {
            const interval = setInterval(() => {
                setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [remaining]);

    return (
        <>
            <main className="center-align animated-gradient min-h-100vh">


                {justVerified &&
                    <AnimatePresence>
                        <motion.div className="block-page center-align"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <img className="block-page__icon br p1 bg-gray-800" src="https://fluxofinanceiro.site/assets/carteira.png" alt="wallet icon" />
                        </motion.div>
                    </AnimatePresence>
                }

                <form className="form vertical-align p2 gap4">
                    <header className="vertical-align ai-center gap1">
                        <img className="form-icon bg-gradient-2 w5rem" src="http://fluxofinanceiro.site/assets/email.png" alt="mail icon" />
                        <h1 className="form-title">Verificar Email</h1>
                        <h2 className="form-subtitle">Digite o código de 5 dígitos que enviamos para seu email.</h2>
                    </header>
                    <div className="verify-email horizontal-align gap4 jc-center">
                        {code.map((element, index) => {
                            return (
                                <input className="input text-center"
                                    key={index}
                                    value={element}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    style={{ border: element && "1.3px solid var(--red-1000)" }}
                                />
                            )
                        })}
                    </div>

                    <div className="vertical-align gap1 text-center ai-center">
                        <span className="page-subtitle">Não recebeu o código?</span>
                        <button className="link pointer"
                            onClick={(e) => resendCode(e)}
                            disabled={remaining > 0}
                        >{remaining > 0 ? `Reenviar em ${formatTime(remaining)}` : "Reenviar código"}</button>
                    </div>
                </form>
                <span className="text-2xl text-gray-500">Por segurança, esse código expira em 15 minutos.</span>

                <button className="verify-email-button button menu w100 bg-gradient-red" type="button"
                    onClick={logoutSystem}
                    data-tooltip="Sair">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
                                fill="var(--white)"
                            />
                            <path
                                d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
                                fill="var(--white)"
                            />
                            <path
                                d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z"
                                fill="var(--white)"
                            />
                        </g>
                    </svg>
                </button>

            </main>
            <Alert />
            <FooterCopyright />
        </>
    );
}
