import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../providers/globalContext';
import './style.scss';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {

  const [scroll, setScroll] = useState(0)

  const { redirect } = useGlobalContext()

  const words = ['eficiente', 'inteligente', 'inovadora', 'moderna', 'descomplicada'];
  const wordRef = useRef(null)
  const intervalId = useRef(null);
  const wordIndex = useRef(0);

  const [contentPrev, setContentPrev] = useState(false)
  const [valuePrev, setValuePrev] = useState(0)
  const obj = useRef({ numero: 0 });

  const timelineFeatures = gsap.timeline();
  const timelineEtapas = gsap.timeline();

  const redirectToLogin = () => {
    setContentPrev(true)
    gsap.timeline({
      onComplete: () => redirect("/login")
    }).set('.apresentation__preview', {
      justifyContent: 'center'
    })
      .to('.apresentation__preview > *', { opacity: 0, duration: 0.3 })
      .to('.apresentation__preview', { zIndex: '10', x: '-50%', duration: 0.6 })
      .to('.apresentation__preview', {
        scale: 4
      })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    document.title = "Fluxo Financeiro | Controle suas finanças";
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);

    const animateWord = () => {
      const word = words[wordIndex.current];

      gsap.to(wordRef.current, {
        duration: 1,
        text: word + "|",
        ease: "none",
        onComplete: () => {
          gsap.to({}, { duration: 1, onComplete: deleteWord });
        }
      });
    };

    const deleteWord = () => {
      const word = words[wordIndex.current].split("");
      let i = word.length;

      intervalId.current = setInterval(() => {
        i--;
        if (wordRef.current) {
          wordRef.current.textContent = word.slice(0, i).join("") + "|";
        }

        if (i <= 0) {
          clearInterval(intervalId.current);
          wordIndex.current = (wordIndex.current + 1) % words.length;
          animateWord();
        }
      }, 100);
    };

    animateWord()

    const ctx = gsap.context(() => {
      const tlPrev = gsap.timeline();
      tlPrev.to(".apresentation__preview", {
        y: -15,
        duration: 0.4,
        ease: 'power3.out'
      });
      tlPrev.to(obj.current, {
        numero: 1000,
        duration: 7,
        ease: 'power4.out',
        onUpdate: () => setValuePrev(obj.current.numero)
      });
      tlPrev.to(".apresentation__preview", {
        y: 5,
        duration: 1.6,
        ease: 'power2.inOut'
      }, '-=1.6');
      tlPrev.to(".apresentation__preview", {
        y: 0,
        duration: 0.3,
        ease: 'power3.out'
      }, '-=0.2');

      timelineFeatures.current = gsap.timeline({
        scrollTrigger: {
          trigger: '.features__items-item.master',
          scrub: false,
          start: "top 90%",
          end: "bottom center",
        }
      })
        .fromTo(".features__items-item",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.2 }
        );

      timelineEtapas.current = gsap.timeline({
        scrollTrigger: {
          trigger: '#howitworks__steps-step-1',
          start: "top 95%",
          end: "bottom center",
        }
      })
        .fromTo('#howitworks__steps-step-1', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo('#howitworks__steps-line-1', { height: 0, opacity: 0 }, { height: "6rem", opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo('#howitworks__steps-step-2', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo('#howitworks__steps-line-2', { height: 0, opacity: 0 }, { height: "6rem", opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo('#howitworks__steps-step-3', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo('#howitworks__steps-line-3', { height: 0, opacity: 0 }, { height: "6rem", opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo('#howitworks__steps-step-4', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
    });

    return () => {
      // ✅ Limpa interval
      clearInterval(intervalId.current);
      // ✅ Mata todas as animações GSAP desse elemento
      gsap.killTweensOf(wordRef.current);
    };

  }, [])

  return (
    <main>
      <header className={`header-home w100 ${scroll ? "scroll" : ''}`}>
        <div className="w83 m0auto horizontal-align gap1 jc-between">
          <div className="horizontal-align gap2 ai-center">
            <img className="w5rem" src="https://www.fluxofinanceiro.site/assets/carteira.png" alt="Wallet icon" />
            <h1 className="page-title">Fluxo Financeiro</h1>
          </div>
          <nav className="header-home__menu center-align">
            <ul className="horizontal-align gap2">
              <li>
                <a href="/#features">Características</a>
              </li>
              <li>
                <a href="/#howitworks">Como funciona?</a>
              </li>
            </ul>
          </nav>
          <button className="button" type="button" onClick={redirectToLogin}>Acesse a sua conta</button>
        </div>
      </header>
      <section className="apresentation horizontal-align">
        <div className="blur"></div>
        <div className="blur"></div>
        <div className="horizontal-align gap4 w83 m0auto ai-center">
          <div className="w100 vertical-align gap2 as-start">
            <h1 className="text-7xl fontw-600">Controle o seu <span className="text-main-500">Fluxo Financeiro</span> de forma simples e <br /><span className="text-main-800" ref={wordRef}></span></h1>
            <p className="text-3xl">Com o Fluxo Financeiro, você pode gerenciar suas finanças pessoais de maneira eficiente, mantendo o controle de receitas e despesas em um só lugar.</p>
            <div className="horizontal-align gap4">
              <button className="button" type="button" onClick={redirectToLogin}>Comece agora</button>
              <a className="button" href="/#howitworks">Veja como funciona</a>
            </div>
          </div>
          <div className="apresentation__preview br bg-gray-900 w100 p1 gap2 vertical-align" >
            <div className="horizontal-align gap2">
              <div className="horizontal-align jc-between bg-gray-800 w100 br p1">
                <div className="vertical-align">
                  <span className="text-3xl text-gray-500">Receita mensal</span>
                  <span className="text-4xl">R$ {valuePrev.toFixed(0)}</span>
                </div>
                <div className="apresentation__preview-icon bg-green-1000 br"></div>
              </div>
              <div className="horizontal-align jc-between bg-gray-800 w100 br p1">
                <div className="vertical-align">
                  <span className="text-3xl text-gray-500">Despesas totais</span>
                  <span className="text-4xl">R$ {valuePrev.toFixed(0)}</span>
                </div>
                <div className="apresentation__preview-icon bg-red-1000 br"></div>
              </div>
              <div className="horizontal-align jc-between bg-gray-800 w100 br p1">
                <div className="vertical-align">
                  <span className="text-3xl text-gray-500">Saldo restante</span>
                  <span className="text-4xl">R$ {valuePrev.toFixed(0)}</span>
                </div>
                <div className="apresentation__preview-icon bg-main-500 br"></div>
              </div>
            </div>
            <div className="horizontal-align gap2 w100">
              <div className="vertical-align bg-gray-800 w100 p1 br gap1">
                <div className="horizontal-align jc-between">
                  <span className="text-2xl">Despesas</span>
                  <span className="text-main-800 text-2xl">Ver mais</span>
                </div>
                <div className="vertical-align w100 gap1">
                  <div className="p2 w100 bg-gray-700 br"></div>
                  <div className="p2 w100 bg-gray-700 br"></div>
                  <div className="p2 w100 bg-gray-700 br"></div>
                </div>
              </div>
              <div className="vertical-align bg-gray-800 w100 p1 br gap1">
                <div className="horizontal-align jc-between">
                  <span className="text-2xl">Rendas</span>
                  <span className="text-main-800 text-2xl">Ver mais</span>
                </div>
                <div className="vertical-align w100 gap1">
                  <div className="p2 w100 bg-gray-700 br"></div>
                  <div className="p2 w100 bg-gray-700 br"></div>
                  <div className="p2 w100 bg-gray-700 br"></div>
                </div>
              </div>
            </div>
            <div className="horizontal-align gap1 ai-start">
              <div className="vertical-align gap1 bg-gray-800 w100 br p1">
                <span className="text-2xl">Soma por categoria</span>
                <div className="p2 w100 bg-gray-700 br"></div>
                <div className="p2 w100 bg-gray-700 br"></div>
                <div className="p2 w100 bg-gray-700 br"></div>
              </div>
              <div className="vertical-align gap1 bg-gray-800 w100 br p1">
                <span className="text-2xl">Soma por forma de pagamento</span>
                <div className="p2 w100 bg-gray-700 br"></div>
                <div className="p2 w100 bg-gray-700 br"></div>
                <div className="p2 w100 bg-gray-700 br"></div>
              </div>
              <div className="vertical-align gap1 bg-gray-800 w100 br p1">
                <span className="text-2xl">Soma por status</span>
                <div className="p2 w100 bg-gray-700 br"></div>
                <div className="p2 w100 bg-gray-700 br"></div>
              </div>
              <div className="vertical-align gap1 bg-gray-800 w100 br p1">
                <span className="text-2xl">Soma por vencimento</span>
                <div className="p2 w100 bg-gray-700 br"></div>
                <div className="p2 w100 bg-gray-700 br"></div>
              </div>

            </div>
          </div>
        </div>
        <svg className="animated-arrow-down" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="var(--main-800)"></path>
          </g>
        </svg>
      </section>

      <section className="features bg-gray-850" id="features">
        <div className="vertical-align gap6 w83 m0auto ai-center">
          <h1 className="text-6xl text-center fontw-500">Recursos poderosos para gerenciar as suas finanças</h1>
          <ul className="features__items w100 gap2">
            <li className="features__items-item vertical-align master">
              <svg className="w5rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 1.5C1 0.671573 1.67157 0 2.5 0H10.7071L14 3.29289V13.5C14 14.3284 13.3284 15 12.5 15H2.5C1.67157 15 1 14.3284 1 13.5V1.5ZM4 4H7V5H4V4ZM11 7H4V8H11V7ZM11 10H8V11H11V10Z"
                    fill="var(--main-800)"
                  />
                </g>
              </svg>
              <h3 className="text-4xl fontw-600">Controle de Gastos</h3>
              <p className="text-3xl text-gray-500">Acompanhe todas as suas despesas com categorização e análise detalhada de gastos.</p>
            </li>
            <li className="features__items-item vertical-align">
              <svg className="w5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 16.5L9 10L13 16L21 6.5"
                  stroke="var(--main-800)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-4xl fontw-600">Gestão de Receitas</h3>
              <p className="text-3xl text-gray-500">Organize suas fontes de renda e acompanhe o crescimento do seu patrimônio ao longo do tempo.</p>
            </li>
            <li className="features__items-item vertical-align">
              <svg className='w5rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    opacity="0.4"
                    d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z"
                    fill="var(--main-800)"
                  />
                  <path
                    opacity="0.4"
                    d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z"
                    fill="var(--main-800)"
                  />
                  <path
                    d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z"
                    fill="var(--main-800)"
                  />
                  <path
                    d="M17.7099 21.9999C20.0792 21.9999 21.9999 20.0792 21.9999 17.7099C21.9999 15.3406 20.0792 13.4199 17.7099 13.4199C15.3406 13.4199 13.4199 15.3406 13.4199 17.7099C13.4199 20.0792 15.3406 21.9999 17.7099 21.9999Z"
                    fill="var(--main-800)"
                  />
                </g>
              </svg>
              <h3 className="text-4xl fontw-600">Categorização Avançada</h3>
              <p className="text-3xl text-gray-500">Organize despesas e receitas em categorias personalizadas para melhor controle.</p>
            </li>
            <li className="features__items-item vertical-align">
              <svg className="w5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
                    stroke="var(--main-800)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <h3 className="text-4xl fontw-600">Status de Pagamentos</h3>
              <p className="text-3xl text-gray-500">Acompanhe pagamentos pendentes e realizados com alertas de vencimento.</p>
            </li>
            <li className="features__items-item vertical-align">
              <svg className="w5rem" fill="var(--main-800)" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xmlSpace="preserve">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path d="M493.714,66.178h-69.659H197.661h-69.661c-10.099,0-18.286,8.187-18.286,18.286v63.563h18.286h18.286h10.203h32.195 c12.566-12.003,21.598-27.666,25.337-45.277h193.674c7.188,33.842,33.891,60.545,67.734,67.734v89.183 c-33.843,7.186-60.547,33.891-67.734,67.734h-17.598v36.572h33.958h69.659c10.099,0,18.286-8.186,18.286-18.286v-69.66V154.121 V84.464C512,74.364,503.813,66.178,493.714,66.178z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M335.24,184.597H146.285h-36.572H18.286C8.187,184.597,0,192.784,0,202.882v54.857h353.526v-54.857 C353.526,192.784,345.339,184.597,335.24,184.597z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M0,294.311v133.224c0,10.099,8.187,18.286,18.286,18.286H335.24c10.099,0,18.286-8.186,18.286-18.286v-63.564V327.4 v-33.089H0z M152.383,367.454H91.429c-10.099,0-18.286-8.187-18.286-18.286c0-10.099,8.187-18.286,18.286-18.286h60.954 c10.099,0,18.286,8.187,18.286,18.286C170.668,359.267,162.481,367.454,152.383,367.454z" />
                    </g>
                  </g>
                </g>
              </svg>
              <h3 className="text-4xl fontw-600">Formas de Pagamento</h3>
              <p className="text-3xl text-gray-500">Gerencie diferentes métodos de pagamento e acompanhe gastos por tipo.</p>
            </li>
            <li className="features__items-item vertical-align">
              <svg className="w5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 20C7.58172 20 4 16.4183 4 12M20 12C20 14.5264 18.8289 16.7792 17 18.2454"
                  stroke="var(--main-800)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 14L12 4M12 4L15 7M12 4L9 7"
                  stroke="var(--main-800)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-4xl fontw-600">Exportação de Dados</h3>
              <p className="text-3xl text-gray-500">Exporte seus dados financeiros em PDF, Excel ou CSV para análises externas ou backup.</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="howitworks" id="howitworks">
        <div className="blur"></div>
        <div className="blur"></div>
        <div className="vertical-align gap6 w83 m0auto ai-center">
          <div className="vertical-align gap1">
            <h1 className="text-6xl text-center fontw-500">Como funciona?</h1>
            <h2 className="text-4xl text-center fontw-500 text-main-800">Do cadastro ao controle total: tudo de forma prática.</h2>
          </div>

          <div className="vertical-align w100 ai-center">
            <div className="howitworks__steps-step" id="howitworks__steps-step-1">
              <svg fill="var(--main-800)" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 35.9922 C 20.9452 35.9922 15.5077 38.5 13.1405 41.3125 C 9.9999 37.7968 8.1014 33.1328 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9219 33.1563 46.0234 37.8203 42.8593 41.3359 C 40.4921 38.5234 35.0546 35.9922 27.9999 35.9922 Z M 27.9999 32.0078 C 32.4999 32.0547 36.0390 28.2109 36.0390 23.1719 C 36.0390 18.4375 32.4765 14.5 27.9999 14.5 C 23.4999 14.5 19.9140 18.4375 19.9609 23.1719 C 19.9843 28.2109 23.4765 31.9609 27.9999 32.0078 Z"></path>
                </g>
              </svg>
              <h2>Crie a sua conta</h2>
              <h3>Tudo o que você precisa, pronto para você. Crie sua conta em segundos.</h3>
            </div>

            <div className="howitworks__steps-line" id="howitworks__steps-line-1"></div>

            <div className="howitworks__steps-step" id="howitworks__steps-step-2">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--main-800)"
              >
                <g>
                  <path d="M22,9h-.19A2.83,2.83,0,0,0,22,8V6a3,3,0,0,0-3-3H3A3,3,0,0,0,0,6V8a3,3,0,0,0,2.22,2.88A3,3,0,0,0,2,12v2a3,3,0,0,0,.22,1.12A3,3,0,0,0,0,18v2a3,3,0,0,0,2.22,2.88A3,3,0,0,0,2,24v2a3,3,0,0,0,3,3H22A10,10,0,0,0,22,9Zm-9.16,6H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H16A10,10,0,0,0,12.84,15ZM2,6A1,1,0,0,1,3,5H19a1,1,0,0,1,1,1V8a1,1,0,0,1-1,1H3A1,1,0,0,1,2,8ZM2,18a1,1,0,0,1,1-1h9.2a10.1,10.1,0,0,0,0,4H3a1,1,0,0,1-1-1Zm3,9a1,1,0,0,1-1-1V24a1,1,0,0,1,1-1h7.84A10,10,0,0,0,16,27Zm17,0a8,8,0,1,1,8-8A8,8,0,0,1,22,27Z" />
                  <path d="M22,16h2a1,1,0,0,0,0-2H23a1,1,0,0,0-2,0v.18A3,3,0,0,0,22,20a1,1,0,0,1,0,2H20a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,22,18a1,1,0,0,1,0-2Z" />
                </g>
              </svg>
              <h2>Conecte o seu financeiro</h2>
              <h3>Traga seus dados financeiros para um só lugar.</h3>
            </div>

            <div className="howitworks__steps-line" id="howitworks__steps-line-2"></div>

            <div className="howitworks__steps-step" id="howitworks__steps-step-3">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="var(--main-800)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="var(--main-800)" strokeWidth="1.5" strokeLinecap="round"></path>
                </g>
              </svg>
              <h2>Defina metas e orçamentos</h2>
              <h3>Planeje seu caminho e mantenha tudo sob controle.</h3>
            </div>

            <div className="howitworks__steps-line" id="howitworks__steps-line-3"></div>

            <div className="howitworks__steps-step" id="howitworks__steps-step-4">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="var(--main-800)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="var(--main-800)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
              <h2>Supervise e refine</h2>
              <h3>Acompanhe sua evolução e otimize seus hábitos financeiros.</h3>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
