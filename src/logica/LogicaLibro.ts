// logicaLibro.ts
import { TlistaLibro } from "../controladores/TlistaLibro";
import { Libro } from "../entidades/libro";

const ListaLibro = new TlistaLibro()
// Crear una lista de libros y revistas


//////////////CRUD PARA LOS LIBROS//////////////////

// Función para listar libros en la tabla HTML
export function ListarLibros(): void {
    const bodyProductos = document.getElementById('bodyProductos');
    if (bodyProductos) {
        bodyProductos.innerHTML = '';
        // Iterar sobre la lista de libros y agregar filas a la tabla
        ListaLibro.ListaLibroStorage.forEach((libro: Libro, index: number) => {
            const row = document.createElement('tr');
            row.innerHTML =
                `
                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td class="p-3 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${libro.codigo}</td>
                <td class="p-1 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${libro.categoria}</td>
                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${libro.nombre}</td>
                <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${libro.autor}</td>
                <td class="p-4 text-base font-medium text-gray-900 dark:text-black" style="overflow-wrap: break-word;">${libro.editorial}</td>
                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${libro.añoPublicacion}</td>
                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${libro.tipo}</td>
                <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-black">${obtenerEstado(libro.estado)}</td>
                <td class="p-4 space-x-2 whitespace-nowrap">
                    <button id="btnModificar" type="button" class="updateProductButton inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            data-drawer-target="modificar_libro_drawer" data-drawer-show="modificar_libro_drawer" aria-controls="modificar_libro_drawer" data-drawer-placement="right"
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
                    EliminarLibro(index);
                    console.log("hola" + index)
                });
            }

            // Agregar evento de clic al botón de editar
            const EditButton = row.querySelector('.updateProductButton');
            if (EditButton) {
                EditButton.addEventListener('click', () => {
                    abrirDrawerEditar(libro, index);
                });
            }

        });
    }
}

// Función para obtener el estado en palabras
function obtenerEstado(estado: boolean): string {
    return estado ? 'Disponible' : 'No Disponible';
}

ListarLibros();

const guardarLibroBtn = document.getElementById('guardarLibroBtn');
// Función para limpiar el formulario
guardarLibroBtn!.addEventListener("click", () => {
    // Obtener los valores del formulario
    const codigo = (document.getElementById('codigo') as HTMLInputElement).value;
    const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const categoria = (document.getElementById('categoria') as HTMLSelectElement).value;
    const editorial = (document.getElementById('editorial') as HTMLInputElement).value;
    const autor = (document.getElementById('autor') as HTMLInputElement).value;
    const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
    // Crear un nuevo objeto Libro con los valores del formulario
    const nuevoLibro = new Libro(codigo, categoria, editorial, nombre, autor, fecha, tipo, true);
    // Insertar el nuevo libro en la lista de libros
    ListaLibro.Insertar(nuevoLibro);
    ListarLibros();
    // Limpiar el formulario después de guardar
    window.location.reload();

});


// Función para abrir el cajón (drawer) para editar un libro
function abrirDrawerEditar(libro: Libro, index: number): void {
    // Llenar los campos del formulario con la información del libro
    const codigoInput = document.getElementById('mod_codigo') as HTMLInputElement;
    const tipoSelect = document.getElementById('mod_tipo') as HTMLSelectElement;
    const nombreInput = document.getElementById('mod_nombre') as HTMLInputElement;
    const categoriaSelect = document.getElementById('mod_categoria') as HTMLSelectElement;
    const editorialInput = document.getElementById('mod_editorial') as HTMLInputElement;
    const autorInput = document.getElementById('mod_autor') as HTMLInputElement;
    const fechaInput = document.getElementById('mod_fecha') as HTMLInputElement;
    const estadoInput = document.getElementById('mod_estado') as HTMLInputElement;

    codigoInput.value = libro.codigo;
    tipoSelect.value = libro.tipo;
    nombreInput.value = libro.nombre;
    categoriaSelect.value = libro.categoria;
    editorialInput.value = libro.editorial;
    autorInput.value = libro.autor;
    fechaInput.value = libro.añoPublicacion;
    estadoInput.value = libro.estado ? "Disponible" : "No Disponible";

    // Manejar el evento de envío del formulario de edición
    const editarLibroForm = document.getElementById('modificar_libro_drawer');
    if (editarLibroForm) {
        editarLibroForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Obtener los valores del formulario de edición
            const codigo = codigoInput.value;
            const tipo = tipoSelect.value;
            const nombre = nombreInput.value;
            const categoria = categoriaSelect.value;
            const editorial = editorialInput.value;
            const autor = autorInput.value;
            const fecha = fechaInput.value;
            var estado
            if(estadoInput.value == "Disponible"){
                estado = true;
            }else{
                estado = false;
            }
            const libroActualizado = new Libro(codigo, categoria, editorial, nombre, autor, fecha, tipo, estado);
            // Modificar el libro en la lista de libros
            modificarLibro(index, libroActualizado);
            // Aquí refrescamos la página después de abrir el drawer de edición
            window.location.reload();
        });
    }
}

// Función para manejar la actualización del libro
export function modificarLibro(index: number, libroActualizado: Libro): void {
    ListaLibro.Modificar(index, libroActualizado);
    ListarLibros();
}

// Función para manejar la eliminación de un libro
export function EliminarLibro(index: number): void {
    ListaLibro.Eliminar(index);
    ListarLibros(); // Actualizar la lista después de la eliminación
    // Aquí refrescamos la página después de abrir el drawer de edición
    window.location.reload();
}

