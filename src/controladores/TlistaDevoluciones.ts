import { Prestamo } from "../entidades/prestamo";

export class TlistaDevoluciones {
    ListaDevolucion: Prestamo[];
    ListaDevolucionStorage: Prestamo[];

    constructor() {
        const dataStorage = localStorage.getItem('ListaDevolucion');
        this.ListaDevolucionStorage = dataStorage ? JSON.parse(dataStorage) : [];
        this.ListaDevolucion = [];
    }

    Insertar(op: Prestamo) {
        this.ListaDevolucionStorage.push(op);
        this.guardarEnLocalStorage();
    }

    Modificar(pos: number, op:  Prestamo) {
        this.ListaDevolucionStorage[pos] = op;
        this.guardarEnLocalStorage();
    }

    Eliminar(pos: number) {
        this.ListaDevolucionStorage.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
       // Supongamos que debería devolver la lista de Devolucions
        return this.ListaDevolucionStorage;
    }

    private guardarEnLocalStorage(): void {
        localStorage.setItem('ListaDevolucion', JSON.stringify(this.ListaDevolucionStorage));
    }
}