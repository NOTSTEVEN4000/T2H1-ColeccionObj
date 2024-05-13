import { Libro } from "./libro";

export class Estudiante {
    cedula: string;
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: string;
    estado : boolean;
    librosPrestados: Libro[];

    constructor(cedula: string, nombre: string, apellido: string, sexo: string, fechaNacimiento: string, esta: boolean) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.estado = esta;
        this.librosPrestados = [];
    }
}


