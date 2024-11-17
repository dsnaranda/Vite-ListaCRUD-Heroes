export class heroes{
    codigo: number;
    nombre: string;
    edad: number;
    ciudad: string;
    imagen: string;
    constructor(cod: number, nom: string, eda: number, ciu: string, ima: string){
        this.codigo = cod;
        this.nombre = nom;
        this.edad = eda;
        this.ciudad = ciu;
        this.imagen = ima;
    }
}