import { Libro } from "../entidades/libro";

export class TlistaLibro {
    ListaLibro: Libro[];
    ListaLibroStorage: Libro[];

    constructor() {
        const dataStorage = localStorage.getItem('ListaLibros');
        this.ListaLibroStorage = dataStorage ? JSON.parse(dataStorage) : [];
        if (!dataStorage) {
            this.agregarDatosPredefinidos();
        }
        this.ListaLibro = [];
    }

    Insertar(op: Libro) {
        this.ListaLibroStorage.push(op);
        this.guardarEnLocalStorage();
    }

    Modificar(pos: number, op: Libro) {
        this.ListaLibroStorage[pos] = op;
        this.guardarEnLocalStorage();
    }

    Eliminar(pos: number) {
        this.ListaLibroStorage.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar() {
        // Supongamos que debería devolver la lista de libros
        return this.ListaLibroStorage;
    }

    private guardarEnLocalStorage(): void {
        localStorage.setItem('ListaLibros', JSON.stringify(this.ListaLibroStorage));
    }

    private agregarDatosPredefinidos() {
        this.ListaLibroStorage = [
            {
                codigo: "001",
                categoria: "Literatura",
                editorial: "Editorial A",
                nombre: "Libro 1",
                autor: "Autor 1",
                añoPublicacion: "2005",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "002",
                categoria: "Erotico",
                editorial: "Editorial B",
                nombre: "Libro 2",
                autor: "Autor 2",
                añoPublicacion: "2010",
                tipo: "Revista",
                estado: true
            },
            {
                codigo: "003",
                categoria: "Informatica",
                editorial: "Editorial C",
                nombre: "Libro 3",
                autor: "Autor 3",
                añoPublicacion: "2015",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "004",
                categoria: "Salud",
                editorial: "Editorial D",
                nombre: "Libro 4",
                autor: "Autor 4",
                añoPublicacion: "2000",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "005",
                categoria: "Literatura",
                editorial: "Editorial E",
                nombre: "Libro 5",
                autor: "Autor 5",
                añoPublicacion: "2020",
                tipo: "Libro",
                estado: true
            }
        ];
    }
}

