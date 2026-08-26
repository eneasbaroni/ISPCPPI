"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Grill from "../(index)/_components/grill/Grill";
import { useRef } from "react";

const Nosotros = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: infoRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], ["1", "1.2"]);
  return (
    <main className="px-40 tablet:px-20 pb-20 mobile:px-10 flex flex-col items-center mt-[6vw]">
      <Grill />
      <h2 className="mobile:mt-12">
        EQUIPO{" "}
        <span
          className="font-anton text-6xl tablet:text-4xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          style={{
            WebkitTextStroke: "1px black",
            WebkitTextFillColor: "white",
          }}
        >
          PICANTE
        </span>
      </h2>
      <div className="flex flex-row tablet:flex-col items-center justify-center gap-4 mt-8">
        <div className="equipoInfo w-1/2 tablet:w-full" ref={infoRef}>
          <h3 className="text-left text-4xl my-4">VISIÓN</h3>
          <p className="font-inter text-xl tablet:text-lg mobile:text-sm text-left text-balance w-full">
            Nuestra visión, es que Picante® sea el lugar de referencia para la
            serigrafía, actuando en dos frentes clave. Por un lado, ser un
            espacio esencial de formación, donde las personas pueden aprender a
            dominar el arte de la serigrafía con creatividad y alta calidad. Por
            otro lado, ser el socio de confianza para empresas, emprendedores y
            artistas, brindando un servicio de producción de piezas vibrantes,
            originales y de excelente calidad. De esta forma, elevar la
            serigrafía a un nuevo nivel de expresión artística y comercial.
          </p>

          <h3 className="text-left text-4xl my-4">VALORES</h3>
          <p className="font-bold font-inter text-xl tablet:text-lg mobile:text-sm text-left">
            Sociales:
          </p>
          <ul className="pl-10">
            <li className="font-inter text-xl tablet:text-lg mobile:text-sm text-left">
              Comunidad: Colaboramos y creamos juntos.
            </li>
          </ul>

          <p className="font-bold font-inter text-xl tablet:text-lg mobile:text-sm text-left">
            Éticos:
          </p>
          <ul className="pl-10">
            <li className="font-inter text-xl tablet:text-lg mobile:text-sm text-left">
              Pasión: Trabajamos con entuciasmo y autenticidad.
            </li>
            <li className="font-inter text-xl tablet:text-lg mobile:text-sm text-left">
              Calidad: Buscamos resultados excepcionales en cada detalle.
            </li>
          </ul>

          <p className="font-bold font-inter text-xl tablet:text-lg mobile:text-sm text-left">
            Servicio al cliente:
          </p>
          <ul className="pl-10">
            <li className="font-inter text-xl tablet:text-lg mobile:text-sm text-left">
              Creatividad: Fomentamos la imaginación e innovación.
            </li>
            <li className="font-inter text-xl tablet:text-lg mobile:text-sm text-left">
              Capacitación: Empoderamos a traves del aprendizaje práctico.
            </li>
          </ul>

          <p className="font-bold font-inter text-xl tablet:text-lg mobile:text-sm text-left">
            Ambientales:
          </p>
          <ul className="pl-10">
            <li className="font-inter text-xl tablet:text-lg mobile:text-sm text-left">
              Sustentabilidad: Reducimos nuestro impacto, reutilizando,
              reciclando y optimizando el uso e energía y recursos en cada
              proceso.
            </li>
          </ul>
        </div>
        <div className="w-1/2 tablet:w-full m-auto">
          <div className="h-full w-full mobile:w-full aspect-[3/2] m-auto">
            <div className="w-full h-full rounded-3xl overflow-hidden  border-main p-2 bg-greeny relative">
              <div className="w-full h-full rounded-2xl overflow-hidden ">
                <motion.div className="w-full h-full" style={{ scale }}>
                  <img
                    src="/Images/Eve_02.jpg"
                    alt="Home Banner"
                    className="w-full h-full object-cover scale-125"
                  ></img>
                </motion.div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/Images/Noise/noise.jpg')] bg-cover bg-center mix-blend-screen opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
