const carrito = document.querySelector('#carrito');
const precios = document.querySelector('#precios');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    precios.addEventListener('click', agregarProdu);
    carrito.addEventListener('click', eliminarProdu);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

function agregarProdu(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const Produ = e.target.parentElement.parentElement;
        leerDatosProdu(Produ);
    }
}

function leerDatosProdu(Produ) {
    const infoProdu = {
        titulo: Produ.querySelector('h4').textContent,
        precio: Produ.querySelector('.precio span').textContent,
        id: Produ.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    if (articulosCarrito.some(Produ => Produ.id === infoProdu.id)) {
        const Productos = articulosCarrito.map(Produ => {
            if (Produ.id === infoProdu.id) {
                Produ.cantidad++;
                return Produ;
            } else {
                return Produ;
            }
        })
        articulosCarrito = [...Productos];
    } else {
        articulosCarrito = [...articulosCarrito, infoProdu];
    }

    carritoHTML();
}

function eliminarProdu(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-Produ')) {
        const ProduId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(Produ => Produ.id !== ProduId);

        carritoHTML();
    }
}

function carritoHTML() {
    vaciarCarrito();
    articulosCarrito.forEach(Produ => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${Produ.titulo}</td>
                <td>${Produ.precio}</td>
                <td>${Produ.cantidad} </td>
                <td>
                    <a href="#" class="borrar-Produ" data-id="${Produ.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

}

function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
