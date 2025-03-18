// Array con los minerales (ejemplos de minerales)
const minerales = [
    {
        nombre: "Oro",
        estadoPuro: "imagenes/oro-puro.jpg",
        estadoBruto: "imagenes/oro-bruto.jpg",
        estadoNatural: "imagenes/oro-natural.jpg"
    },
    {
        nombre: "Plata",
        estadoPuro: "imagenes/plata-pura.jpg",
        estadoBruto: "imagenes/plata-bruta.jpg",
        estadoNatural: "imagenes/plata-natural.jpg"
    },
    {
        nombre: "Cobre",
        estadoPuro: "imagenes/cobre-puro.jpg",
        estadoBruto: "imagenes/cobre-bruto.jpg",
        estadoNatural: "imagenes/cobre-natural.jpg"
    }
];

// Función para obtener el mineral seleccionado desde la URL
function obtenerMineralSeleccionado() {
    const urlParams = new URLSearchParams(window.location.search);
    const mineralNombre = urlParams.get('mineral'); // Extraer el nombre del mineral de la URL

    // Buscar el mineral correspondiente en el array de minerales
    return minerales.find(mineral => mineral.nombre === mineralNombre);
}

// Mostrar la información del mineral seleccionado
function mostrarInfoMineral() {
    const mineral = obtenerMineralSeleccionado();

    if (mineral) {
        document.getElementById("nombre-elemento").textContent = mineral.nombre;
        document.getElementById("estado-puro").src = mineral.estadoPuro;
        document.getElementById("estado-bruto").src = mineral.estadoBruto;
        document.getElementById("estado-natural").src = mineral.estadoNatural;
    }
}

// Llamar a la función para mostrar la información del mineral cuando la página se cargue
window.onload = mostrarInfoMineral;