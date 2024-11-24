import './style.css';
import { Listar, Insertar, Editar, Eliminar } from "./Controladores/TLista.ts";

Listar();

// Declaración de variables
const tabla = document.getElementById("lista-h") as HTMLTableElement;
const modalContainer = document.getElementById("modal-container") as HTMLElement;
let btnAgregar = document.getElementById('btn-agregar') as HTMLButtonElement;
let btnAdd = document.getElementById('btn-open') as HTMLButtonElement;

let primerValor = 0;
let opcion = "";

btnAgregar?.addEventListener("click", save);
btnAdd?.addEventListener("click", openModal);

// Función para abrir el modal
function openModal() {
    // Cargar formulario.html dentro del modal-container
    fetch('../src/Pages/formulario.html')
        .then(response => response.text())
        .then(data => {
            modalContainer.innerHTML = data; // Cargar el contenido del formulario
            const modal = document.getElementById("container-form") as HTMLElement;

            if (modal) {
                modal.style.display = 'block';
                console.log("Abrir modal");

                // Configurar el evento de cierre del modal
                modal.onclick = (event: Event) => {
                    const target = event.target as HTMLDivElement;
                    if (target.className.indexOf("container-form") !== -1) {
                        modal.style.display = 'none'; // Ocultar el contenedor
                        primerValor = 0;
                        limpiar();
                        opcion = "";
                        console.log("Cerrar modal");
                    }
                };

                // Asociar el evento de guardar después de cargar el modal
                const btnAgregar = document.getElementById('btn-agregar') as HTMLButtonElement;
                btnAgregar?.addEventListener("click", save);

                // Si estás editando, cargar datos al formulario
                if (opcion === "editar") {
                    cargarDatosEnFormulario();
                }
            }
        })
        .catch(error => {
            console.error("Error al cargar el formulario:", error);
        });
}

function cargarDatosEnFormulario() {
    const codigoInput = document.getElementById("codigo") as HTMLInputElement;
    const nombreInput = document.getElementById("nombre") as HTMLInputElement;
    const edadInput = document.getElementById("edad") as HTMLInputElement;
    const ciudadInput = document.getElementById("ciudad") as HTMLInputElement;
    const imagenInput = document.getElementById("imagen") as HTMLInputElement;

    if (codigoInput && nombreInput && edadInput && ciudadInput && imagenInput) {
        try {
            // Encuentra la fila correspondiente a `primerValor`
            const filas = tabla.querySelectorAll("tr");

            let filaSeleccionada: HTMLTableRowElement | null = null;

            filas.forEach((fila) => {
                const primeraCelda = fila.children[0]?.textContent?.trim();
                if (primeraCelda === primerValor.toString()) {
                    filaSeleccionada = fila as HTMLTableRowElement;
                }
            });

            if (filaSeleccionada) {
                //Error de lectura? Send Help
                const celdas = filaSeleccionada.children;

                // Asigna los valores de las celdas al formulario
                codigoInput.value = parseInt(celdas[0].textContent?.trim() || '0', 10).toString(); 
                nombreInput.value = celdas[1].textContent?.trim() || '';
                edadInput.value = parseInt(celdas[2].textContent?.trim() || '0', 10).toString(); 
                ciudadInput.value = celdas[3].textContent?.trim() || ''; 
                const imagen = celdas[4].querySelector('img') as HTMLImageElement;
                imagenInput.value = imagen?.src || ''; 

                console.log("Formulario cargado con los datos:");
                 } else {
                console.error("No se encontró la fila correspondiente.");
            }
        } catch (error) {
            console.error("Error al cargar el formulario:", error);
        }
    }
}

// Función para limpiar campos
function limpiar() {
    (<HTMLInputElement>document.getElementById("codigo")).value = '';
    (<HTMLInputElement>document.getElementById("nombre")).value = '';
    (<HTMLInputElement>document.getElementById("edad")).value = '';
    (<HTMLInputElement>document.getElementById("ciudad")).value = '';
    (<HTMLInputElement>document.getElementById("imagen")).value = '';
}

// Función para guardar datos
function save(e: Event): void {
    e.preventDefault();
    if (opcion == "editar") {
        Editar(primerValor);
        primerValor = 0;
        limpiar();
        opcion = "";
    } else {
        console.log("Insertando");
        Insertar();
        primerValor = 0;
        limpiar();
    }
    modalContainer.innerHTML = ''; // Vaciar el contenedor del modal
}


// Evento en la tabla para editar datos
tabla.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("editar")) {
        // Encuentra la fila seleccionada
        const fila = target.closest('tr') as HTMLTableRowElement;

        if (fila) {
            // Convierte el valor del código a número
            primerValor = Number(fila.children[0].textContent?.trim() || '0'); // Código de la fila seleccionada
            opcion = "editar";
            openModal(); // Abre el modal
            cargarDatosEnFormulario(); // Carga los datos en el formulario
        }
    }
});

// Función para eliminar datos (ya incluida en tu código)
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
