"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Info = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: infoRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], ["1", "1.2"]);

  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-center relative">
      <div
        className="w-auto min-h-[80vh] flex items-center border border-main p-4"
        id="homeInfo"
      >
        <div
          className="w-full min-h-[calc(80vh-2rem)] h-auto bg-pinky flex flex-col items-center justify-around rounded-xl"
          ref={infoRef}
        >
          <div className="w-full">
            <h2 className="text-center">HOLA :)</h2>
            <h3 className="mt-4 text-center text-2xl tablet:text-xl mobile:text-base">
              Esta es nuestra MISIÓN
            </h3>
            <p className="font-inter text-xl tablet:text-lg mobile:text-sm text-center text-balance w-3/4 m-auto">
              Ser el epicentro de la creatividad serigráfica de calidad. Unir a
              emprendedores, artistas y entusiastas, ofreciendo un espacio donde
              la técnica y la inspiración se encuentran.
              <br />
              Buscamos transformar ideas en creaciones originales y vibrantes,
              cultivando la innovación y la expresión personal, con un
              compromiso inquebrantable con la exelencia en cada proyecto,
              integrando de forma inteligente las nuevas tecnologías para
              expandir las posibilidades creativas y optimizar el proceso
              artesanal.
            </p>
          </div>
          <div className="w-full h-auto flex flex-row flex-wrap">
            {/* map de 4 elementos */}
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-1/2 mobile:w-full aspect-[3/2] p-4 tablet:p-2"
                >
                  <div className="w-full h-full rounded-3xl overflow-hidden  border-main p-2 bg-greeny relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden ">
                      <motion.div
                        className="w-full h-full"
                        style={{ y, scale }}
                        key={i}
                      >
                        <img
                          src={`/Images/home/home0${i + 1}.jpg`}
                          alt="Home Banner"
                          className="w-full h-full object-cover scale-125"
                        ></img>
                      </motion.div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/Images/Noise/noise.jpg')] bg-cover bg-center mix-blend-screen opacity-20 pointer-events-none"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Info;
