interface IObra {
    nombre: string,
    src: string,
    alt: string
}

interface IObras {
    papel: IObra[],
    tela: IObra[],
    feria: IObra[]
}

interface IFormData {
    nombre: string,
    apellido: string,
    email: string,
    soporte: string,
    medida: string,
    cantidadColores: string,
    cantidad: string,
    descripcion: string,
    file: File
}

export type { IObra, IObras }