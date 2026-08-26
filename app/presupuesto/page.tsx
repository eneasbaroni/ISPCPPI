import Image from "next/image";
import Form from "./Form";

const Presupuesto = () => {
  return (
    <main className="formularioContainer">
      <h1 className=" mx-0 my-4 mobile:mt-16">FORMULARIO DE PRESUPUESTO</h1>
      <div className="formularioP bg-[#FFD5E1]">
        <div className="formImgContainer ">
          <Image
            src="/Images/presupuesto/presupuesto.png"
            layout="fill"
            objectFit="contain"
            alt="picante serigrafia"
            className="prespImg"
          ></Image>

          <a
            target="_blank"
            href="./Images/presupuesto/infografia.png"
            rel="noopener noreferrer"
          >
            <img
              src="/Images/presupuesto/btn-02.svg"
              alt="picante serigrafia"
              className="btn-02"
            ></img>
          </a>
        </div>
      </div>

      <Form />
    </main>
  );
};

export default Presupuesto;
