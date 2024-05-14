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
                codigo: "RV001",
                categoria: "Salud",
                editorial: "Planeta",
                nombre: "Harry Potter y la piedra filosofal",
                autor: "J.K. Rowling",
                añoPublicacion: "1997",
                tipo: "Revista",
                estado: true
            },
            {
                codigo: "LB001",
                categoria: "Literatura",
                editorial: "Destino",
                nombre: "Cien años de soledad",
                autor: "Gabriel García Márquez",
                añoPublicacion: "1967",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "LB002",
                categoria: "Literatura",
                editorial: "Vintage",
                nombre: "1984",
                autor: "George Orwell",
                añoPublicacion: "1949",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "RV002",
                categoria: "Erotico",
                editorial: "Plaza & Janés",
                nombre: "Cincuenta sombras de Grey",
                autor: "E.L. James",
                añoPublicacion: "2011",
                tipo: "Revista",
                estado: true
            },
            {
                codigo: "LB003",
                categoria: "Informatica",
                editorial: "Anaya Multimedia",
                nombre: "Aprende Python en un fin de semana",
                autor: "Daniel Green",
                añoPublicacion: "2017",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "LB004",
                categoria: "Informatica",
                editorial: "Salamandra",
                nombre: "Arrugas",
                autor: "Paco Roca",
                añoPublicacion: "2007",
                tipo: "Libro",
                estado: true
            },
            {
                codigo: "RV003",
                categoria: "Erotico",
                editorial: "Debolsillo",
                nombre: "El juego de Ender",
                autor: "Orson Scott Card",
                añoPublicacion: "1985",
                tipo: "Revista",
                estado: true
            }
        ];
    }
}

