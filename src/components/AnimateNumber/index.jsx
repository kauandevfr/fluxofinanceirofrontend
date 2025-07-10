import { useEffect, useRef } from "react";
import gsap from "gsap";
import Skeleton from "../Skeleton";
import { useGlobalContext } from "../../providers/globalContext";

export default function AnimatedNumber({ value }) {
    const numberRef = useRef();
    const { resume } = useGlobalContext();

    useEffect(() => {
        if (resume.loading) return;

        const finalValue = parseFloat(value) || 0;
        const obj = { val: 0 };

        const formatBRL = (val) => {
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val);
        };

        gsap.to(obj, {
            val: finalValue,
            duration: 1.5,
            ease: "power4.out",
            onUpdate: () => {
                if (numberRef.current) {
                    numberRef.current.innerText = formatBRL(obj.val);
                }
            }
        });
    }, [resume]);

    if (resume.loading) {
        return <Skeleton />
    }

    return <span className="financial-summary__sum-subtitle fontw-500 text-5xl" ref={numberRef}>R$ 0,00</span>;
}
