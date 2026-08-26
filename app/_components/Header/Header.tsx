"use client";
import { magnetic } from "@/lib/anims";
import { AnimatePresence, motion } from "framer-motion";
import Magnet from "../Magnet/Magnet";
import { useState } from "react";
import NavBar from "../Navbar/Navbar";

const Header = () => {
    const [open, setOpen] = useState(false);

    const handleNavbar = () => {
        setOpen(!open);
    };

    return (
        <>
            <div
                className="fixed w-[4vw] h-[4vw] tablet:w-12 tablet:h-12  bg-main right-[calc(10rem+1px)] tablet:right-[calc(5rem+1px)] mobile:right-[calc(2.5rem+1px)] top-[2vw] flex outline outline-[1px] outline-main z-[60]"
                onClick={handleNavbar}
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
                        <img
                            src="/Images/header/menu.svg"
                            alt="burguer menu"
                            className="w-3/5"
                        />
                    </Magnet>
                </motion.div>
            </div>
            <AnimatePresence>
                {open && <NavBar foo={handleNavbar} />}
            </AnimatePresence>
        </>
    );
};
export default Header;
