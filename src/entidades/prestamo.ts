export class Prestamo {
    estudiante: string;
    libro: string;
    fechaPrestamo: string;
    fechaEntrega: string;
    estado:boolean

    constructor(estud: string, lib: string , fechaprest: string , fechaentre: string, est:boolean) {
        this.estudiante = estud;
        this.libro = lib;
        this.fechaPrestamo = fechaprest;
        this.fechaEntrega = fechaentre;
        this.estado = est;
    }
}