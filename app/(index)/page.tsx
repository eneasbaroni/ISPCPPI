"use client";
import Link from "next/link";
import Galerias from "./_components/Galerias/Galerias";
//import Ad from "../Ad/Ad"
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { logoAnim, magnetic } from "@/lib/anims";
import Magnet from "../_components/Magnet/Magnet";
import Grill from "./_components/grill/Grill";
import Banner from "./_components/Banner/Banner";
import Info from "./_components/Info/Info";

const Inicio = () => {
    return (
        <div className="inicioContainer py-10 px-40 tablet:px-20 mobile:px-10 flex flex-col items-center mt-[6vw] tablet:mt-[calc(3rem+2vw)]">
            <Grill />
            <Banner />
            <Info />
            <Galerias />
        </div>
    );
};

export default Inicio;
