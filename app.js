let listaPeliculas = [];

const objPelicula = {
    id: '',
    nombre: '',
    categoria: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const categoriaInput = document.querySelector('#categoria');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || categoriaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarPelicula();
        editando = false;
    } else {
        objPelicula.id = Date.now();
        objPelicula.nombre = nombreInput.value;
        objPelicula.categoria = categoriaInput.value;

        agregarPelicula();
    }
}

function agregarPelicula() {

    listaPeliculas.push({...objPelicula});

    mostrarPeliculas();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objPelicula.id = '';
    objPelicula.nombre = '';
    objPelicula.categoria = '';
}

function mostrarPeliculas() {
    limpiarHTML();

    const divPeliculas = document.querySelector('.div-peliculas');

    listaPeliculas.forEach(pelicula => {
        const {id, nombre , categoria} = pelicula;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${categoria} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarPelicula(pelicula);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarPelicula(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divPeliculas.appendChild(parrafo);
        divPeliculas.appendChild(hr);
    });
}

function cargarPelicula(pelicula) {
    const {id, nombre, categoria} = pelicula;

    nombreInput.value = nombre;
    categoriaInput.value = categoria;

    objPelicula.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarPelicula() {

    objPelicula.nombre= nombreInput.value;
    objPelicula.categoria = categoriaInput.value;

    listaPeliculas.map(pelicula => {

        if(pelicula.id === objPelicula.id) {
            pelicula.id = objPelicula.id;
            pelicula.nombre = objPelicula.nombre;
            pelicula.categoria = objPelicula.categoria;

        }

    });

    limpiarHTML();
    mostrarPeliculas();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarPelicula(id) {

    listaPeliculas = listaPeliculas.filter(pelicula => pelicula.id !== id);

    limpiarHTML();
    mostrarPeliculas();
}

function limpiarHTML() {
    const divPeliculas = document.querySelector('.div-peliculas');
    while(divPeliculas.firstChild) {
        divPeliculas.removeChild(divPeliculas.firstChild);
    }
}