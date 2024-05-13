import { TlistaDevoluciones } from "../controladores/TlistaDevoluciones";
import { TListaEstudiante } from "../controladores/TlistaEstudiante";
import { TlistaLibro } from "../controladores/TlistaLibro";
import { TlistaPrestamos } from "../controladores/TlistaPrestamos";
import { Devoluciones } from "../entidades/devoluciones";
import { Estudiante } from "../entidades/estudiante";
import { Libro } from "../entidades/libro";
import Swal from 'sweetalert2';

const ListaDevolucion = new TlistaDevoluciones();
const ListaPrestamo = new TlistaPrestamos()
const ListaEstudiante = new TListaEstudiante();
const ListaLibro = new TlistaLibro();


const cedula = document.querySelector("#estudiante") as HTMLInputElement;
const codigo = document.querySelector("#libro") as HTMLInputElement;
const fechainicio = document.querySelector("#fechaprestamo") as HTMLInputElement;
const fechafin = document.querySelector("#fechaentrega") as HTMLInputElement;

var indexLibro = 0;
let bandera = false;
let posedit = 0;


export function cargarcomboxEstudiante() {
    document.addEventListener("DOMContentLoaded", () => {
        const selectCategoriaRevistas = document.getElementById("estudiante") as HTMLSelectElement;
        selectCategoriaRevistas.addEventListener("change", () => {
            const selectedOption = selectCategoriaRevistas.selectedOptions.item(0);
            if (selectedOption) {
                const cedula = JSON.parse(selectedOption.value).cedula;
                cargarcomboLibro(cedula)
            }
        });
        ListaEstudiante.ListaEstudianteStorage.forEach((estudiante) => {
            const option = document.createElement("option");
            option.value = JSON.stringify(estudiante);
            option.textContent = `${estudiante.cedula}`;
            selectCategoriaRevistas.appendChild(option);
        });
    });
}

cargarcomboxEstudiante();

export function cargarcomboLibro(cedula: string) {
    const selectCategoriaRevistas = document.getElementById("libro") as HTMLSelectElement;
    selectCategoriaRevistas.innerHTML = '';
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccionar";
    selectCategoriaRevistas.appendChild(option);
    selectCategoriaRevistas.addEventListener("change", () => {
        indexLibro = selectCategoriaRevistas.selectedIndex - 1;
        const selectedOption = selectCategoriaRevistas.selectedOptions.item(0);
        if (selectedOption) {
            const codlibro = JSON.parse(selectedOption.value).codigo;
            ListaPrestamo.ListaPrestamosStorage.forEach((prestamo) => {
                if (prestamo.libro == codlibro) {
                    fechainicio.value = prestamo.fechaEntrega
                }
            })
        }
    });

    ListaEstudiante.ListaEstudianteStorage.forEach((estudiante) => {
        if (estudiante.cedula == cedula) {
            estudiante.librosPrestados.forEach((categoria) => {
                if (categoria.estado == false) {
                    const option = document.createElement("option");
                    option.value = JSON.stringify(categoria);
                    option.textContent = `${categoria.codigo}`;
                    selectCategoriaRevistas.appendChild(option);
                }
            });

        }
    });
}


////////////////////////////////////////////////////////
//////////////CRUD PARA LOS PRESTAMOS//////////////////
//////////////////////////////////////////////////////

export function ListarDevolucionesDesdeLocalStorage(): void {
    const bodyProductos = document.getElementById('bodyProductos');
    if (bodyProductos) {
        bodyProductos.innerHTML = '';
        if (ListaDevolucion) {
            ListaDevolucion.ListaDevolucionStorage.forEach((devolucion: Devoluciones) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="p-3 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${devolucion.estudiante}</td>
                        <td class="p-1 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${devolucion.libro}</td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${devolucion.fechaPrestamo}</td>
                        <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${devolucion.fechaEntrega}</td>
                    `;
                bodyProductos.appendChild(row);
            });
        }
    }
}

ListarDevolucionesDesdeLocalStorage();

document
    .querySelector(".btn-guardar")!
    .addEventListener("click", () => Guardar());

document
    .querySelector(".btn-cerrar")!
    .addEventListener("click", () => limpiarCampos());

export function Guardar() {
    if (bandera == true) {
        const aux = new Devoluciones(cedula.value, codigo.value, fechainicio.value, fechafin.value);
        ListaDevolucion.Modificar(posedit, aux);
        limpiarCampos();
        const body = document.querySelector("tbody")!;
        body.innerHTML = "";
        ListarDevolucionesDesdeLocalStorage()
        bandera = false;
    } else {
        insertarDevolucion();
        limpiarCampos();
    }
}

export function insertarDevolucion() {
    const cedulaJSON = JSON.parse(cedula.value);
    const codigoJSON = JSON.parse(codigo.value);
    const op = new Devoluciones(
        cedulaJSON.cedula,
        codigoJSON.codigo,
        fechainicio.value,
        fechafin.value

    );
    const aux = new Libro(
        codigoJSON.codigo,
        codigoJSON.categoria,
        codigoJSON.editorial,
        codigoJSON.nombre,
        codigoJSON.autor,
        codigoJSON.añoPublicacion,
        codigoJSON.tipo,
        codigoJSON.estado = true
    );
    const aux2 = new Estudiante(
        cedulaJSON.cedula,
        cedulaJSON.nombre,
        cedulaJSON.apellido,
        cedulaJSON.sexo,
        cedulaJSON.fecha_Nacimiento,
        cedulaJSON.estado = true
    );

    const indexEstudiante = ListaEstudiante.ListaEstudianteStorage.findIndex(
        (estudiante) => estudiante.cedula === aux2.cedula
    );

    const estudiante = ListaEstudiante.ListaEstudianteStorage.find(
        (estudiante) => estudiante.cedula === aux2.cedula
    );
    const fechaInicio = new Date(fechainicio.value);
    const fechaFin = new Date(fechafin.value);

    if (fechaInicio < fechaFin) {
        if (estudiante) {
            estudiante.estado = false;
            const indexL = estudiante.librosPrestados.findIndex(
                (libros) => libros.codigo === aux.codigo
            );
            estudiante.librosPrestados.splice(indexL, 1);
            ListaEstudiante.Modificar(indexEstudiante, estudiante);
            
            // Mostrar mensaje de libro devuelto y estudiante sancionado
            Swal.fire({
                icon: 'success',
                title: 'Libro Devuelto',
                text: 'El libro ha sido devuelto. Pero el estudiante ha sido sancionado por 15 días.',
                confirmButtonText: 'OK'
            });
        }
    } else {
        if (estudiante) {
            const indexL = estudiante.librosPrestados.findIndex(
                (libros) => libros.codigo === aux.codigo
            );
            estudiante.librosPrestados.splice(indexL, 1);
            ListaEstudiante.Modificar(indexEstudiante, estudiante);
             // Mostrar mensaje de libro devuelto y estudiante sancionado
             Swal.fire({
                icon: 'success',
                title: 'Libro Devuelto',
                text: 'El libro ha sido devuelto exitosamente.',
                confirmButtonText: 'OK'
            });
        }
    }

    const indexL = ListaLibro.ListaLibroStorage.findIndex(
        (libros) => libros.codigo === aux.codigo
    );

    if (indexL !== -1) {
        ListaLibro.Modificar(indexL, aux);
        ListaLibro.Listar();
    }

    ListaDevolucion.Insertar(op);
    ListaLibro.Modificar(indexL, aux);
    ListarDevolucionesDesdeLocalStorage();
    ListaLibro.Listar();
}

function limpiarCampos() {
    cedula.value = "";
    codigo.value = "";
    fechainicio.value = "";
    fechafin.value = "";
    bandera = false;
}
