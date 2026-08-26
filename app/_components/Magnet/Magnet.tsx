'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion';


const Magnet = ({ children, classN, area, distance, damping, stiffness }: { children: React.ReactNode, classN: string, area?: string, distance?: number, damping?: number, stiffness?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 })
    
    const SPRING_CONFIG = { damping: damping ?? 11, stiffness: stiffness ?? 120 }
    const MAX_DISTANCE = distance ?? 0.5
    const AREA = area ?? '5rem'//area de influencia

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
       

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect(); //metodo para obtener las dimensiones de un elemento y su posicion
        const middleX = clientX - (left + width / 2) //distancia entre el x del mouse y x centro del elemento
        const middleY = clientY - (top + height / 2)

        const positionX = middleX * MAX_DISTANCE
        const positionY = middleY * MAX_DISTANCE

        setPosition({ x: positionX, y: positionY })
    }


    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position;

    return (
        <motion.div
            className={`${classN} w-auto h-auto flex items-center justify-center`}
            ref={ref}
            style={{ position: 'relative', padding:AREA }}
            onMouseMove={handleMouse}
            onPointerLeave={reset}
            animate={{ x: x, y: y }}
            transition={{ type: "spring", stiffness: SPRING_CONFIG.stiffness, damping: SPRING_CONFIG.damping, mass: 1 }}
        >   
            {children}
        </motion.div>
    )
}
export default Magnet