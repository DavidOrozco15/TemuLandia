// PRODUCTOS
async function obtenerProductos() {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products");
        const productosAPI = await respuesta.json();


        // Transformar los datos de la API para que coincidan con el formato esperado
        const productosTransformados = productosAPI.map(producto => ({
            id: `producto-${producto.id}`,
            titulo: producto.title,
            imagen: producto.image,
            categoria: {
                nombre: producto.category,
                id: producto.category.toLowerCase().replace(/['\s]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") // Convertir categoría a un formato de ID
            },
            precio: producto.price
        }));

        // Cargar los productos en la página
        cargarProductos(productosTransformados);

        // Guardar los productos transformados en una variable global si es necesario
        window.productos = productosTransformados;

    } catch (error) {
        console.error("Error al obtener los productos de la API:", error);
    }
}

obtenerProductos();

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const buscador = document.querySelector("#buscador");

if (buscador) {
    buscador.addEventListener("input", filtrarProductos);
}

function filtrarProductos() {
    const textoBusqueda = buscador.value.toLowerCase().trim();
    let productosFiltrados = window.productos;

    if (textoBusqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.titulo.toLowerCase().includes(textoBusqueda)
        );
    }

    const categoriaActiva = document.querySelector(".boton-categoria.active");
    if (categoriaActiva && categoriaActiva.id !== "todos") {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.categoria.id === categoriaActiva.id
        );
    }

    cargarProductos(productosFiltrados);
}

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}
/*se puede boorar por si acaso*/

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        // Remover la clase "active" de todos los botones y agregarla al botón seleccionado
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Filtrar los productos según la categoría seleccionada
        if (e.currentTarget.id !== "todos") {
            const productosFiltrados = window.productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosFiltrados[0]?.categoria.nombre || "Categoría";
            cargarProductos(productosFiltrados);
        } else {
            // Mostrar todos los productos si se selecciona "Todos"
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(window.productos);
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;

    // Buscar el producto en la variable global `window.productos`
    const productoAgregado = window.productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Si el producto ya está en el carrito, aumentar su cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad inicial de 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // Actualizar el contador del carrito
    actualizarNumerito();

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}