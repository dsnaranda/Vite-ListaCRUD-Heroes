import { heroes } from "../Entidades/Heroes";

export { ListaHeroes }

let ListaHeroes: heroes[] = [{
    codigo: 1,
    nombre: "Batman",
    edad: 40,
    ciudad: "Gotica",
    imagen: "https://assets.turbologo.com/blog/en/2021/07/03045028/batman-logo.png"
},
{
    codigo: 2,
    nombre: "Spiderman",
    edad: 20,
    ciudad: "New York",
    imagen: "https://assets.turbologo.com/blog/en/2021/07/03050014/Spiderman-logo.png" // URL de la imagen
},
{
    codigo: 3,
    nombre: "Superman",
    edad: 35,
    ciudad: "Metropolis",
    imagen: "https://assets.turbologo.com/blog/en/2021/07/03045143/Superman-logo.png" // URL de la imagen
}]

// Funcion insertar heroes
export function Insertar() {
    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let eda = Number((<HTMLInputElement>document.getElementById("edad")).value.toString());
    let ciu = (<HTMLInputElement>document.getElementById("ciudad")).value.toString();
    let ima = (<HTMLInputElement>document.getElementById("imagen")).value.toString();

    const op = new heroes(cod, nom, eda, ciu, ima);
    ListaHeroes.push(op);
    Listar();
}

//Funcion Editar
export function Editar(codigo: number) {
    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let eda = Number((<HTMLInputElement>document.getElementById("edad")).value.toString());
    let ciu = (<HTMLInputElement>document.getElementById("ciudad")).value.toString();
    let ima = (<HTMLInputElement>document.getElementById("imagen")).value.toString();
    let index = ListaHeroes.findIndex(heroe => heroe.codigo === codigo);
    if (index !== -1) {
        ListaHeroes[index] = new heroes(cod, nom, eda, ciu, ima);
    }
    Listar();
}

//Funcion Eliminar
export function Eliminar(codigo: number) {
    const index = ListaHeroes.findIndex(op => op.codigo === codigo);
    if (index >= 0) {
        ListaHeroes.splice(index, 1);
    }
    Listar();
}

// Funcion listar heroes
export function Listar() {
    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-h");
    for (let i = 0; i < ListaHeroes.length; i++) {
        lis = "<tr>" + lis + "<td>" + ListaHeroes[i].codigo + "</td>" +
            "<td>" + ListaHeroes[i].nombre + "</td>" +
            "<td>" + ListaHeroes[i].edad + "</td>" +
            "<td>" + ListaHeroes[i].ciudad + "</td>" +
            `<td><img src="${ListaHeroes[i].imagen}" alt="${ListaHeroes[i].nombre}" width="50" height="50"/></td>` + 
            `<td><button class="editar btn btn-warning">Editar</button> <button class="eliminar btn btn-danger">Eliminar</button></td>` + "</tr>";
    }
    lista.innerHTML = lis;
    console.log("Listando")
}

