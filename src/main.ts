import './style.css'
import { Listar, Insertar, Editar, Eliminar } from "./Controladores/TLista.ts"

Listar();
//Declaracion de variables
const tabla = document.getElementById("lista-h") as HTMLTableElement;
const modal = document.getElementById("container-form") as HTMLElement;
let btnAgregar = document.getElementById('btn-agregar') as HTMLButtonElement;
let btnAdd = document.getElementById('btn-open') as HTMLButtonElement;


let primerValor = 0;
let opcion = "";

btnAgregar.addEventListener("click", save);
btnAdd.addEventListener("click", openModal);


//Funcion abrir modal
function openModal() {
    if (modal) {
        modal.style.display = 'block'; 
        console.log("Abrir modal");

        // Evento para cerrar el modal al hacer clic fuera del formulario
        modal.onclick = (event: Event) => {
            const target = event.target as HTMLDivElement;
            if (target.className.indexOf("container-form") !== -1) {
                modal.style.display = 'none'; // Oculta el contenedor
                primerValor = 0;
                limpiar();
                opcion = "";
                console.log("Cerrar modal");
            }
        };
    } else {
        console.error("No se pudo encontrar el contenedor con el id 'container-form'");
    }
}


//funcion limpiar campos
function limpiar() {
    (<HTMLInputElement>document.getElementById("codigo")).value = '';
    (<HTMLInputElement>document.getElementById("nombre")).value = '';
    (<HTMLInputElement>document.getElementById("edad")).value = '';
    (<HTMLInputElement>document.getElementById("ciudad")).value = '';
    (<HTMLInputElement>document.getElementById("imagen")).value = '';
}

//Se llama a la funcion Insertar, Editar
function save(e: Event): void {
    e.preventDefault();
    if (opcion == "editar") {
        Editar(primerValor);
        primerValor = 0;
        limpiar();
        opcion = "";
        modal.style.display = 'none'; 
    } else {
        console.log("Insertando");
        Insertar();
        primerValor = 0;
        limpiar();
    }
    modal.style.display = 'none'; 
}

//Se obtiene el codigo
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
    if (target.classList.contains("editar")) {
        openModal();
        const fila = parent;
        primerValor = Number(fila.children[0].innerHTML);
        opcion = "editar";
        (<HTMLInputElement>document.getElementById("codigo")).value = (fila.children[0].innerHTML);
        (<HTMLInputElement>document.getElementById("nombre")).value = (fila.children[1].innerHTML);
        (<HTMLInputElement>document.getElementById("edad")).value = (fila.children[2].innerHTML);
        (<HTMLInputElement>document.getElementById("ciudad")).value = (fila.children[3].innerHTML);
        (<HTMLInputElement>document.getElementById("imagen")).value = (fila.children[4].innerHTML);
        console.log("Editando");

    }

});




//Se obtiene el codigo
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
    if (target.classList.contains("editar")) {
        const fila = parent;
        primerValor = Number(fila.children[0].innerHTML);
        (<HTMLInputElement>document.getElementById("codigo")).value = (fila.children[0].innerHTML);
        (<HTMLInputElement>document.getElementById("nombre")).value = (fila.children[1].innerHTML);
        (<HTMLInputElement>document.getElementById("edad")).value = (fila.children[2].innerHTML);
        (<HTMLInputElement>document.getElementById("ciudad")).value = (fila.children[3].innerHTML);
        (<HTMLInputElement>document.getElementById("imagen")).value = (fila.children[4].innerHTML);
        console.log("Editando");
    }
});



//Funcion Eliminar
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
    if (target.classList.contains("eliminar")) {
        const fila = parent;
        primerValor = Number(fila.children[0].innerHTML);
        Eliminar(primerValor);
        console.log("Eliminado");
        primerValor = 0;
    }
});
