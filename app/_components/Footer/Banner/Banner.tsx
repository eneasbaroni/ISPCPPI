"use client";
import { motion } from "framer-motion";
import { footerBannerAnim } from "@/lib/anims";

const Banner = () => {
  return (
    <div className="w-full h-[50vh] mobile:h-auto flex items-center bg-main overflow-hidden">
      <motion.h4
        className="w-auto text-[25vw] text-white! after:content-['PICANTE'] before:content-['PICANTE'] before:right-0"
        variants={footerBannerAnim}
        initial="init"
        whileInView="animate"
      >
        PICANTE
      </motion.h4>
    </div>
  );
};
export default Banner;
