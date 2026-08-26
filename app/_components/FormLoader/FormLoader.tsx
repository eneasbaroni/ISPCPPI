'use client'

import { motion } from 'framer-motion'

const FormLoader = () => {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center">
            <motion.div className="flex flex-col items-center justify-center shadow-md rounded-md bg-white px-4 py-8 gap-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="font-anton uppercase text-2xl">PROCESANDO DATOS</h3>
                <p className="text-sm text-gray-500 font-extralight">Espera un momento mientras analizado los datos proporcionados</p>
                <div className="flex w-[55px] h-[55px] justify-center items-center mx-auto">
                    <div className="w-8 h-8 m-2 rounded-full border-[6px] border-transparent animate-spin border-t-(--second-color) border-b-(--second-color)" />
                </div>
            </motion.div>
        </div>
    )
}

export default FormLoader