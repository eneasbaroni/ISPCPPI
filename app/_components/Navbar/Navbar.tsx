"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { magnetic, menuAnim, navContainer, navLinks } from "@/lib/anims";
import Magnet from "../Magnet/Magnet";
import { LINKS } from "./constants";

const NavBar = ({ foo }: { foo: () => void }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-main px-40 tablet:px-20 mobile:px-10 z-[60] "
      variants={menuAnim}
      initial="initial"
      animate="animater"
      exit="exit"
    >
      <div className="relative w-full h-full flex flex-col gap-4 justify-center items-center">
        <div className="absolute top-0 left-0 w-full h-ful flex z-[-1] divide-x divide-white/10">
          <div className="w-0 h-screen"></div>
          <div className="w-1/4 h-screen"></div>
          <div className="w-1/4 h-screen"></div>
          <div className="w-1/4 h-screen"></div>
          <div className="w-1/4 h-screen"></div>
          <div className="w-0 h-screen"></div>
        </div>

        {/* close button */}
        <div className="w-1/2 mobile:w-full flex justify-end">
          <div
            className="w-[4vw] h-[4vw] tablet:w-12 tablet:h-12 bg-pinky flex outline outline-[1px] outline-main z-10"
            onClick={foo}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              variants={magnetic}
              initial="init"
              whileHover="animate"
            >
              <Magnet
                classN="w-full h-full bg-greeny outline outline-[1px] outline-main cursor-pointer"
                area="4px"
              >
                <button>X</button>
              </Magnet>
            </motion.div>
          </div>
        </div>

        {LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="w-1/2 mobile:w-full">
            <motion.div
              className="relative w-full h-full flex justify-center items-center"
              variants={navContainer}
              initial="init"
              whileHover="animate"
            >
              <button
                className="text-white! text-5xl mobile:text-3xl border border-white/60 w-full py-2 z-20"
                onClick={foo}
              >
                {label}
              </button>

              {/* standard for hover */}
              <div className="absolute top-0 left-0 w-full h-full flex z-10  bg-main"></div>

              {/* background for hover */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0 flex z-10  bg-pinky"
                variants={navLinks}
              ></motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default NavBar;
