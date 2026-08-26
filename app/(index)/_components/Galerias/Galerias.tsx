"use client";

import { motion, useScroll, useTransform, useAnimate } from "framer-motion";
import Link from "next/link";
import {
  navContainer,
  navLinks,
  navLinksB,
  noiseAnim,
  textLink,
} from "@/lib/anims";
import { useRef } from "react";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";

const Links = [
  {
    label: "GALERIA",
    href: "/works",
    text: "Entra para ver nuestos trabajos seleccionados",
    img: "paper.svg",
  },
  {
    label: "FERIA PICANTE",
    href: "/feria",
    text: "Entra para ver imagenes de la última Feria Picante",
    img: "chilli.svg",
  },
];

const Galerias = () => {
  const windowSize = useScreenSize();
  const divRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end start"],
  });

  const yPositions = [
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "10%"]),
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "40%"]),
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "10%"]),
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "40%"]),
  ];

  const yPositionsMobile = [
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "0%"]),
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "0%"]),
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "0%"]),
    useTransform(scrollYProgress, [0.4, 0.7], ["0%", "0%"]),
  ];

  //scope es un ref, se puede cambiar le nombre, pero es el contenedor de los elementos que se animan
  const [scope, animate] = useAnimate();

  const handleSmileAnimate = async () => {
    animate("#smile", { scale: 1.3 }, { duration: 1, ease: "easeInOut" });
    animate(
      "#smile",
      { rotate: "360deg" },
      { duration: 4, ease: "linear", repeat: Infinity },
    );
  };

  const handleSmileAnimEnd = async () => {
    animate("#smile", { scale: 1 });
    animate("#smile", { rotate: "0deg" });
  };

  return (
    <section
      className="w-full min-h-screen h-auto mobile:mb-10 flex flex-col justify-start items-center relative gap-4"
      id="galerias"
    >
      <h2>GALERIAS</h2>
      <p className="font-inter text-xl! mobile:text-lg mobile:leading-5 text-center text-balance w-1/2 mobile:w-full mx-auto">
        Entrá a las galerías para ver los diferentes trabajos y la &quot;Feria
        Picante&quot;
      </p>

      <div
        className="w-full h-auto flex flex-wrap mobile:gap-1 justify-center items-center"
        ref={divRef}
      >
        {Links.map((link, index) => (
          <motion.div
            key={index}
            className="w-1/4 tablet:w-1/2 mobile:w-full h-[16vw] mobile:h-[40vw] bg-greeny flex flex-col items-center justify-center relative "
            variants={navContainer}
            initial="init"
            whileHover="animate"
            style={{
              y:
                windowSize.width > 768
                  ? yPositions[index]
                  : yPositionsMobile[index],
            }}
          >
            <Link
              href={link.href}
              className="w-full h-full flex items-center justify-center"
            >
              <motion.div
                className="flex flex-col items-center justify-end bg-main relative"
                variants={navLinksB}
              >
                <Image
                  src={`/Images/home/${link.img}`}
                  alt="galeria"
                  width={60}
                  height={60}
                  className="absolute top-6 left-6 invert opacity-90 w-[3vw] h-[3vw] mobile:w-[6vw] mobile:h-[6vw] "
                />
                <motion.div
                  variants={textLink}
                  className="absolute w-full flex flex-col items-center gap-4 px-4"
                >
                  <h3 className="text-white! text-[2.1vw] mobile:text-xl z-20">
                    {link.label}
                  </h3>
                  <p className="text-white text-base z-20">{link.text}</p>
                </motion.div>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-[url('/Images/Noise/noise.jpg')] bg-cover bg-center mix-blend-screen opacity-20 pointer-events-none"
                  variants={noiseAnim}
                ></motion.div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <h3 className="mt-40 mobile:mt-10 w-1/2 mobile:w-full mx-auto text-6xl tablet:text-4xl text-center">
        TENES ALGÚN{" "}
        <span
          className="font-anton text-6xl tablet:text-4xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          style={{
            WebkitTextStroke: "1px black",
            WebkitTextFillColor: "white",
          }}
        >
          PROYECTO
        </span>{" "}
        EN MENTE?
      </h3>
      <p className="w-1/2 mobile:w-full mx-auto text-center font-inter text-2xl mobile:text-lg mobile:leading-5">
        Completá el formulario de presupuesto
        <br />
        para evaluar tu proyecto y te enviaremos la cotización.
        <br />
        Gracias por confiar en nuestro trabajo :)
      </p>

      <Link href="/presupuesto" className=" w-1/4 tablet:w-56 h-20 mx-auto">
        <motion.div
          ref={scope}
          className="relative w-full h-full border border-main flex items-center justify-between px-4"
          variants={navContainer}
          initial="init"
          whileHover="animate"
          onHoverStart={handleSmileAnimate}
          onHoverEnd={handleSmileAnimEnd}
        >
          <p className="font-anton z-20">IR A FORMULARIO</p>
          <motion.img
            id="smile"
            src="/Images/home/smile.svg"
            alt="smile"
            className="z-20 w-10 h-10"
          ></motion.img>
          <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0 flex z-10  bg-pinky"
            variants={navLinks}
          ></motion.div>
        </motion.div>
      </Link>
    </section>
  );
};

export default Galerias;
