
'use client'
import Grill from "../(index)/_components/grill/Grill";
import LogoutButton from "../_components/Admin/LogoutButton";
import { motion } from "framer-motion";
import { magnetic } from "@/lib/anims";
import Magnet from "../_components/Magnet/Magnet";

import Link from "next/link";

const AdminPage = () => {

  return (
    <>
      <Grill />
      <h2 className="mobile:mt-18 text-center mt-[6vw]">
        PANEL{" "}
        <span
          className="font-anton text-6xl tablet:text-4xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          style={{
            WebkitTextStroke: "1px black",
            WebkitTextFillColor: "white",
          }}
        >
          ADMINISTRADOR
        </span>
      </h2>
      <div className="w-full flex mobile:flex-col mobile:gap-4 justify-center items-center px-40 tablet:px-20 pb-20 mobile:px-10  mt-[6vw]">

        <div className="w-1/4 mobile:w-full! flex justify-end">
          <div
            className="w-full h-full bg-pinky flex items-center justify-center outline  outline-main z-11"

          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              variants={magnetic}
              initial="init"
              whileHover="animate"
            >
              <Magnet
                classN="w-full h-full bg-white outline outline-[1px] outline-main cursor-pointer"
                area="4px"
              >
                <Link
                  href="/admin/prices"
                  className="w-full h-full flex items-center justify-center"
                >
                  <p className=" py-4 uppercase font-anton font-bold text-2xl text-center w-full h-full">Gestor de precios</p>
                </Link>
              </Magnet>
            </motion.div>
          </div>
        </div>

        <div className="w-1/4 mobile:w-full flex justify-end">
          <div
            className="w-full h-full  bg-pinky flex outline  outline-main z-10"

          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              variants={magnetic}
              initial="init"
              whileHover="animate"
            >
              <Magnet
                classN="w-full h-full bg-white outline outline-[1px] outline-main cursor-pointer"
                area="4px"
              >
                <Link
                  href="/admin/budgets"
                  className="w-full h-full flex items-center justify-center"
                >
                  <p className=" py-4 uppercase font-anton font-bold text-2xl text-center w-full h-full">Gestor de presupuestos</p>
                </Link>
              </Magnet>
            </motion.div>
          </div>
        </div>

      </div>

      <div className="px-40 tablet:px-20 mobile:px-10 flex flex-col items-center">
        <LogoutButton />
      </div>
    </>
  );
}

export default AdminPage;