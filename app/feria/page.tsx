import Link from "next/link";
import Grill from "../(index)/_components/grill/Grill";

const Feria = () => {
  return (
    <main className="px-40 tablet:px-20 pb-20 mobile:px-10 flex flex-col items-center mt-[6vw]">
      <Grill />
      <h2 className="mobile:mt-12">
        FERIA{" "}
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
      <div className="w-full flex flex-row gap-2 flex-wrap items-center mt-8 text-center">
        <h2>
          PÁGINA EN CONSTRUCCIÓN, PRONTO HABRÁ MÁS CONTENIDO SOBRE LA FERIA
          PICANTE
        </h2>
      </div>
      <Link
        href="/"
        className="w-1/4 mobile:w-1/2 h-12 m-auto border border-black p-4 mt-4 text-center relative group"
      >
        <p className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 font-anton">
          BACK TO HOME
        </p>
        <div className="absolute left-0 bottom-0  w-full h-[0%] bg-pinky group-hover:h-full group-hover:top-0 transition-all duration-300 z-0"></div>
      </Link>
    </main>
  );
};
export default Feria;
