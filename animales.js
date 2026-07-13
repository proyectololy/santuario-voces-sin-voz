console.log("JS conectado");
fetch("animales.json")
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error("No se pudo abrir animales.json");
    }
    return respuesta.json();
  })
  .then(animales => {
    console.log(animales);

    const contenedor = document.getElementById("contenedor-animales");

    animales.forEach(animal => {
      contenedor.innerHTML += `
        <div class="animal">
          <h3><span>${animal.nombre}</span></h3>
          <img src="${animal.imagen}" width="300">
          <p>${animal.descripcion}</p>
          <button class="btn-carrito" onclick="agregarAlCarrito('${animal.nombre}')">
        Agregar al carrito
          <button class="btn-ayudar" onclick="ayudarAnimal('${animal.nombre}')">
       Ayudar a ${animal.nombre}
</button>
        </button>
        </div>
      `;
    });
  })
  .catch(error => {
    alert(error);
  });
function agregarAlCarrito(nombre) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!carrito.includes(nombre)) {
    carrito.push(nombre);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(nombre + " agregado al carrito");
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contenedorCarrito = document.getElementById("carrito");

  contenedorCarrito.innerHTML = "";

  carrito.forEach(animal => {
    contenedorCarrito.innerHTML += `
      <p>${animal}</p>
    `;
  });
}

mostrarCarrito();
