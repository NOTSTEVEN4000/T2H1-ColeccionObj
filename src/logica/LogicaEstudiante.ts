// logicaEstudiante.ts
import { TListaEstudiante } from "../controladores/TlistaEstudiante";
import { Estudiante } from "../entidades/estudiante";

const ListaEstudiante = new TListaEstudiante()

//////////////CRUD PARA LOS Estudiantes//////////////////
export function ListarEstudiantesDesdeLocalStorage(): void {
    const bodyProductos = document.getElementById('bodyProductos');
    if (bodyProductos) {
        bodyProductos.innerHTML = '';
        if (ListaEstudiante) {
            ListaEstudiante.ListaEstudianteStorage.forEach((estudiante: Estudiante, index: number) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="p-3 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${estudiante.cedula}</td>
                        <td class="p-1 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${estudiante.nombre}</td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${estudiante.apellido}</td>
                        <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${estudiante.sexo}</td>
                        <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${estudiante.fechaNacimiento}</td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${obtenerEstado(estudiante.estado)}</td>
                        <td class="p-4 space-x-2 whitespace-nowrap">
                            <button type="button" class="updateProductButton inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    data-drawer-target="modificar_estudiante_drawer" data-drawer-show="modificar_estudiante_drawer" aria-controls="modificar_estudiante_drawer" data-drawer-placement="right"
                                >
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                </svg>
                                Actualizar
                            </button>
                            <button type="button" class="deleteProductButton inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Eliminar
                            </button>
                        </td>
                    `;
                bodyProductos.appendChild(row);

                // Agregar evento de clic al botón de eliminar
                const deleteButton = row.querySelector('.deleteProductButton');
                if (deleteButton) {
                    deleteButton.addEventListener('click', () => {
                        EliminarEstudiante(index);
                    });
                }

                // Agregar evento de clic al botón de editar
                const EditButton = row.querySelector('.updateProductButton');
                if (EditButton) {
                    EditButton.addEventListener('click', () => {
                        abrirDrawerEditar(estudiante, index);
                        console.log("Indice" + estudiante + index)
                    });
                }
            });
        }
    }
}

// Función para obtener el estado en palabras
function obtenerEstado(estado: boolean): string {
    return estado ? 'Activo' : 'Sancionado';
}

ListarEstudiantesDesdeLocalStorage();


///GUARDAR EL ESTUDIANTE//
const guardarEstudianteBtn = document.getElementById('guardarEstudianteBtn');
guardarEstudianteBtn!.addEventListener("click", () => {
    // Obtener los valores del formulario
    const cedula = (document.getElementById('cedula') as HTMLInputElement).value;
    const nombre = (document.getElementById('nombres') as HTMLSelectElement).value;
    const apellido = (document.getElementById('apellidos') as HTMLInputElement).value;
    const sexo = (document.getElementById('genero') as HTMLSelectElement).value;
    const fechaNacimiento = (document.getElementById('fechanacimiento') as HTMLInputElement).value;
    const nuevoEstudiante = new Estudiante(cedula, nombre, apellido, sexo, fechaNacimiento, true);
    ListaEstudiante.Insertar(nuevoEstudiante);
    ListarEstudiantesDesdeLocalStorage();
    // Aquí refrescamos la página después de abrir el drawer de edición
    window.location.reload();
});


// Función para abrir el cajón (drawer) para editar un Estudiante
function abrirDrawerEditar(estudiante: Estudiante, index: number): void {
    // Llenar los campos del formulario con la información del estudiante
    const cedulaInput = document.getElementById('mod_cedula') as HTMLInputElement;
    const nombreInput = document.getElementById('mod_nombres') as HTMLSelectElement;
    const apellidoInput = document.getElementById('mod_apellidos') as HTMLInputElement;
    const sexoSelect = document.getElementById('mod_genero') as HTMLSelectElement;
    const fechanacimiento = document.getElementById('mod_fechanacimiento') as HTMLInputElement;
    const estados = document.getElementById('mod_estado') as HTMLInputElement;

    cedulaInput.value = estudiante.cedula;
    nombreInput.value = estudiante.nombre;
    apellidoInput.value = estudiante.apellido;
    sexoSelect.value = estudiante.sexo;
    fechanacimiento.value = estudiante.fechaNacimiento;
    estados.value = estudiante.estado ? "Activo" : "Sancionado";
    console.log("Estadosss" + estados.value)
    // Manejar el evento de envío del formulario de edición
    const editarEstudianteForm = document.getElementById('modificar_estudiante_drawer');
    if (editarEstudianteForm) {
        editarEstudianteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Obtener los valores del formulario de edición
            const cedula = cedulaInput.value;
            const nombre = nombreInput.value;
            const apellido = apellidoInput.value;
            const sexo = sexoSelect.value;
            const fechaNacimiento = fechanacimiento.value;
            var estado
            if(estados.value == "Activo"){
                estado = true;
            }else{
                estado = false;
            }
            const EstudianteActualizado = new Estudiante(cedula, nombre, apellido, sexo, fechaNacimiento, estado);
            modificarEstudiante(index, EstudianteActualizado);  
             // Aquí refrescamos la página después de abrir el drawer de edición
             window.location.reload();
        });
    }
}

// Función para manejar la actualización del Estudiante
export function modificarEstudiante(index: number, estudianteActualizado: Estudiante): void {
    ListaEstudiante.Modificar(index, estudianteActualizado);
    ListarEstudiantesDesdeLocalStorage();
}


// Función para manejar la eliminación de un estudiante
export function EliminarEstudiante(index: number): void {
    ListaEstudiante.Eliminar(index);
    ListarEstudiantesDesdeLocalStorage();
    // Aquí refrescamos la página después de abrir el drawer de edición
    window.location.reload();
}
