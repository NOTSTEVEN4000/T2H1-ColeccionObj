// logicaLibro.ts

import { TListaEstudiante } from "../controladores/TlistaEstudiante";
import { TlistaLibro } from "../controladores/TlistaLibro";
import { TlistaPrestamos } from "../controladores/TlistaPrestamos";
import { Estudiante } from "../entidades/estudiante";
import { Libro } from "../entidades/libro";
import { Prestamo } from "../entidades/prestamo";

const ListaPrestamo = new TlistaPrestamos()
const ListaEstudiante = new TListaEstudiante();
const ListaLibro = new TlistaLibro();

const cedula = document.querySelector("#estudiante") as HTMLInputElement;
const codigo = document.querySelector("#libro") as HTMLInputElement;
const fechainicio = document.querySelector("#fechaprestamo") as HTMLInputElement;
const fechafin = document.querySelector("#fechaentrega") as HTMLInputElement;

var indexEstudiante = 0;
var indexLibro = 0;

let bandera = false;
let posedit = 0;

ListarPrestamosDesdeLocalStorage();

export function cargarcomboboxEstudiante() {
    document.addEventListener("DOMContentLoaded", () => {
        const selectCategoriaRevistas = document.getElementById("estudiante") as HTMLSelectElement;
        selectCategoriaRevistas.addEventListener("change", () => {
            indexEstudiante = selectCategoriaRevistas.selectedIndex - 1;
        });
        ListaEstudiante.ListaEstudianteStorage.forEach((estudiante) => {
            if (estudiante.estado == true) {
                const option = document.createElement("option");
                option.value = JSON.stringify(estudiante);
                option.textContent = `${estudiante.cedula}`;
                selectCategoriaRevistas.appendChild(option);
            }

        });
    });
}
cargarcomboboxEstudiante();


export function cargarcomboboxLibro() {
    const selectLibro = document.getElementById("libro") as HTMLSelectElement;
    selectLibro.innerHTML = "";
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccionar";
    selectLibro.appendChild(option);
    selectLibro.addEventListener("change", () => {
        indexLibro = selectLibro.selectedIndex - 1;
    });
    ListaLibro.ListaLibroStorage.forEach((categoria) => {
        if (categoria.estado == true) {
            const option = document.createElement("option");
            option.value = JSON.stringify(categoria);
            option.textContent = `${categoria.codigo}`;
            selectLibro.appendChild(option);
        }
    });
}

cargarcomboboxLibro();

////////////////////////////////////////////////////////
//////////////CRUD PARA LOS PRESTAMOS//////////////////
//////////////////////////////////////////////////////

export function ListarPrestamosDesdeLocalStorage(): void {
    const bodyProductos = document.getElementById('bodyProductos');
    if (bodyProductos) {
        bodyProductos.innerHTML = '';
        if (ListaPrestamo) {
            ListaPrestamo.ListaPrestamosStorage.forEach((prestamo: Prestamo) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="p-3 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${prestamo.estudiante}</td>
                        <td class="p-1 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${prestamo.libro}</td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${prestamo.fechaPrestamo}</td>
                        <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${prestamo.fechaEntrega}</td>
                    `;
                bodyProductos.appendChild(row);
            });
        }
    }
}

ListarPrestamosDesdeLocalStorage();

document.querySelector(".btn-guardar")!.addEventListener("click", () => {
    if (bandera == true) {
        const aux = new Prestamo(
            cedula.value,
            codigo.value,
            fechainicio.value,
            fechafin.value
        );
        ListaPrestamo.Modificar(posedit, aux);
        limpiarCampos();
        const body = document.querySelector("tbody");
        body!.innerHTML = "";
        ListarPrestamosDesdeLocalStorage();
        bandera = false;
    } else {
        insertarPrestamos();
        limpiarCampos();
    }
});


export function insertarPrestamos() {
    const cedulaJSON = JSON.parse(cedula.value);
    const codigoJSON = JSON.parse(codigo.value);

    const op = new Prestamo(
        cedulaJSON.cedula,
        codigoJSON.codigo,
        fechainicio.value,
        fechafin.value
    );

    const auxLibro = new Libro(
        codigoJSON.codigo,
        codigoJSON.categoria,
        codigoJSON.editorial,
        codigoJSON.nombre,
        codigoJSON.autor,
        codigoJSON.añoPublicacion,
        codigoJSON.tipo,
        false
    );

    const auxEstudiante = new Estudiante(
        cedulaJSON.cedula,
        cedulaJSON.nombre,
        cedulaJSON.apellido,
        cedulaJSON.sexo,
        cedulaJSON.fecha_Nacimiento,
        true
    );

    const estudianteIndex = ListaEstudiante.ListaEstudianteStorage.findIndex(
        (estudiante) => estudiante.cedula === auxEstudiante.cedula
    );

    if (estudianteIndex !== -1) {
        ListaEstudiante.ListaEstudianteStorage[estudianteIndex].librosPrestados.push(auxLibro);
        ListaEstudiante.Modificar(estudianteIndex, ListaEstudiante.ListaEstudianteStorage[estudianteIndex]);
    } else {
        console.log("Estudiante no encontrado.");
    }

    const libroIndex = ListaLibro.ListaLibroStorage.findIndex(
        (libro) => libro.codigo === auxLibro.codigo
    );

    if (libroIndex !== -1) {
        ListaLibro.Modificar(libroIndex, auxLibro);
    }

    ListaPrestamo.Insertar(op);
    ListarPrestamosDesdeLocalStorage();
    ListaEstudiante.Listar();
    cargarcomboboxEstudiante();
    cargarcomboboxLibro();
}


export function limpiarCampos() {
    cedula.value = "";
    codigo.value = "";
    fechainicio.value = "";
    fechafin.value = "";
    bandera = false;
}
