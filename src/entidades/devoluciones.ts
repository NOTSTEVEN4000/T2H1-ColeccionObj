export class Devoluciones {
    estudiante: string;
    libro: string;
    fechaPrestamo: string;
    fechaEntrega: string;

    constructor(estud: string, lib: string , fechaprest: string , fechaentre: string) {
        this.estudiante = estud;
        this.libro = lib;
        this.fechaPrestamo = fechaprest;
        this.fechaEntrega = fechaentre;
    }
}