import { Prestamo } from "../entidades/prestamo";

export class TlistaPrestamos {
    ListaPrestamos: Prestamo[];
    ListaPrestamosStorage: Prestamo[];

    constructor() {
        const dataStorage = localStorage.getItem('ListaPrestamos');
        this.ListaPrestamosStorage = dataStorage ? JSON.parse(dataStorage) : [];
        this.ListaPrestamos = [];
    }

    Insertar(op: Prestamo) {
        this.ListaPrestamosStorage.push(op);
        this.guardarEnLocalStorage();
    }

    Modificar(pos: number, op:  Prestamo) {
        this.ListaPrestamosStorage[pos] = op;
        this.guardarEnLocalStorage();
    }

    Eliminar(pos: number) {
        this.ListaPrestamosStorage.splice(pos, 1);
        this.guardarEnLocalStorage();
    }

    Listar(){
       // Supongamos que debería devolver la lista de Prestamoss
        return this.ListaPrestamosStorage;
    }

    private guardarEnLocalStorage(): void {
        localStorage.setItem('ListaPrestamos', JSON.stringify(this.ListaPrestamosStorage));
    }
}