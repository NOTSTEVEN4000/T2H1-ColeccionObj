import { Estudiante } from "../entidades/estudiante";

export class TListaEstudiante {
    ListaEstudiante: Estudiante[];
    ListaEstudianteStorage: Estudiante[];

    constructor() {
        const dataStorage = localStorage.getItem('ListaEstudiantes');
        this.ListaEstudianteStorage = dataStorage ? JSON.parse(dataStorage) : [];
        if (!dataStorage) {
            this.agregarDatos();
        }
        this.ListaEstudiante = [];
    }

    Insertar(op: Estudiante) {
        this.ListaEstudianteStorage.push(op);
        this.guardarEnLocalStorage();
    }

    Modificar(pos: number, op:  Estudiante) {
        this.ListaEstudianteStorage[pos] = op;
        this.guardarEnLocalStorage();
    }

    Eliminar(pos: number) {
        this.ListaEstudianteStorage.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
       // Supongamos que debería devolver la lista de libros
        return this.ListaEstudianteStorage;
    }

    private guardarEnLocalStorage(): void {
        localStorage.setItem('ListaEstudiantes', JSON.stringify(this.ListaEstudianteStorage));
    }

    private agregarDatos() {
        this.ListaEstudianteStorage = [
            {
                cedula: "0765453412",
                nombre: "Juan",
                apellido: "Pérez",
                sexo: "Masculino",
                fechaNacimiento: "2002-02-09",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0787654321",
                nombre: "María",
                apellido: "González",
                sexo: "Femenino",
                fechaNacimiento: "1998-01-05",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0756789123",
                nombre: "Pedro",
                apellido: "López",
                sexo: "Masculino",
                fechaNacimiento: "2000-03-11",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0721654987",
                nombre: "Ana",
                apellido: "Martínez",
                sexo: "Femenino",
                fechaNacimiento: "1995-12-07",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0754987321",
                nombre: "Carlos",
                apellido: "Hernández",
                sexo: "Masculino",
                fechaNacimiento: "1999-09-03",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0789123456",
                nombre: "Laura",
                apellido: "Díaz",
                sexo: "Femenino",
                fechaNacimiento: "2001-09-02",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0747258369",
                nombre: "David",
                apellido: "Ruiz",
                sexo: "Masculino",
                fechaNacimiento: "1997-10-10",
                estado: true,
                librosPrestados: []
            },
            {
                cedula: "0769258147",
                nombre: "Elena",
                apellido: "Sánchez",
                sexo: "Femenino",
                fechaNacimiento: "1994-05-06",
                estado: true,
                librosPrestados: []
            }
        ];
    }
}