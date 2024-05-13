export class Libro {
    public codigo: string;
    public categoria: string;
    public editorial: string;
    public nombre: string;
    public autor: string;
    public añoPublicacion: string;
    public tipo: string;
    public estado : boolean

    constructor(cod: string, cat: string, edit: string, nomb: string, aut: string, anopubli: string, tip: string, esta: boolean) {
        this.codigo = cod;
        this.categoria = cat;
        this.editorial = edit;
        this.nombre = nomb;
        this.autor = aut;
        this.añoPublicacion = anopubli;
        this.tipo = tip;
        this.estado = esta;
    }
}

