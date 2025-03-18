// Obtener el parámetro "mineral" de la URL
const urlParams = new URLSearchParams(window.location.search);
const mineral = urlParams.get('mineral');

// Función para mostrar las imágenes y el título según el mineral seleccionado
function mostrarInformacionMineral(mineral) {
    const titulo = document.getElementById('tituloMineral');
    const imagenPuro = document.getElementById('imagenPuro');
    const imagenBruto = document.getElementById('imagenBruto');
    const imagenNatural = document.getElementById('imagenNatural');

    // Cambiar el título
    titulo.textContent =` Mineral: ${mineral.charAt(0).toUpperCase() + mineral.slice(1)}`;

    // Asignar las imágenes correspondientes segun el mineral
    if(mineral=== "oro"){
    imagenPuro.src = "oropuro.jpg";  // oropuro.jpg
    console.log("Se ha asignado la imagen:" + imagenPuro.src);
    imagenBruto.src ="orobruto.jpg"; // orobruto.jpg
    imagenNatural.src = "oronatural.jpg"; // oronatural.jpg

}else if(mineral==="plata"){

    imagenPuro.src = "platapuro.jpg";  // platapuro.jpg
    imagenBruto.src ="platabruto.jpg"; // platabruto.jpg
    imagenNatural.src = "platanatural.jpg"; // platanatural.jpg
 
} else if(mineral==="cobre"){
    imagenPuro.src = "cobrepuro.jpg";  // cobrepuro.jpg
    imagenBruto.src ="cobrebruto.jpg"; // cobrebruto.jpg
    imagenNatural.src = "cobrenatural.jpg"; // cobrenatural.jpg

} else if(mineral==="hierro"){
    imagenPuro.src = "hierropuro.jpg";  // hierropuro.jpg
    imagenBruto.src ="hierrobruto.jpg"; // hierrobruto.jpg
    imagenNatural.src = "hierronatural.jpg"; //hierronatural.jpg
}

}

// Llamar a la función con el mineral seleccionado
if (mineral) {
    mostrarInformacionMineral(mineral);
}