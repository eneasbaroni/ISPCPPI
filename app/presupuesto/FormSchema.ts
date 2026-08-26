import { z } from "zod";
import { SOPORTES } from "./constants";

export const formSchema = z.object({
    nombre: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede superar los 50 caracteres"),
  
    apellido: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede superar los 50 caracteres"),
  
    telefono: z
      .string()
      .regex(/^\d{8,10}$/, "El teléfono debe tener entre 8 y 10 dígitos (sin 0, sin 15, sin guiones)"),
  
    email: z
      .string()
      .email("Ingresá un email válido"),
  
    soporte: z.enum(SOPORTES, { message: "Seleccioná un soporte válido" }),
  
    medida: z
      .string()
      .regex(
        /^\d+(?:\.\d+)?(?:[xX]\d+(?:\.\d+)?)?$/,
        'Ingresá la medida en formato "20x30" o como área en cm²'
      )
      .min(1, "La medida es obligatoria"),
  
    cantidadColores: z
      .string()
      .regex(/^[1-5]$/, "La cantidad de colores debe ser un número entre 1 y 5"),
  
    cantidad: z
      .string()
      .regex(/^\d+$/, "La cantidad de copias debe ser un número entero")
      .refine((v) => parseInt(v) >= 1, "La cantidad de copias debe ser mayor a 0"),
  
    descripcion: z
      .string()
      .min(5, "La descripción debe tener al menos 5 caracteres")
      .max(500, "La descripción no puede superar los 500 caracteres"),
  });

 export  type FormValues = z.infer<typeof formSchema>;