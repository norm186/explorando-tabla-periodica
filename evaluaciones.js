document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script cargado correctamente");
//const formulario= document.getElementById("evaluacion-form");
//formulario.reset();
    // ========================================
    // PASO 1: Guardar datos del formulario (evaluacion.html)
    // ========================================
    let btnComenzar = document.getElementById("btnComenzar");
    if (btnComenzar) {
        btnComenzar.addEventListener("click", function () {
            let nombre = document.getElementById("nombre").value.trim();
            let correo = document.getElementById("correo").value.trim();
            let escuela = document.getElementById("escuela").value.trim();
            let grado = document.getElementById("grado").value.trim();
            let grupo = document.getElementById("grupo").value.trim();

            if (!nombre || !correo || !escuela || !grado || !grupo) {
                alert("⚠️ Por favor, completa todos los campos antes de continuar.");
                return;
            }

            let datosFormulario = { nombre, correo, escuela, grado, grupo };
            localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
            window.location.href = "preguntas.html";
        });
    }

    // ========================================
    // PASO 2: Generar y mostrar preguntas (preguntas.html)
    // ========================================
    // Lista de 10 preguntas con sus opciones y respuesta correcta.
    let preguntas = [
        { pregunta: "¿Símbolo del Oxígeno?", opciones: ["O", "H", "C", "N"], respuesta: "O" },
        { pregunta: "¿Símbolo del Hidrógeno?", opciones: ["O", "H", "C", "N"], respuesta: "H" },
        { pregunta: "¿Símbolo del Nitrógeno?", opciones: ["N", "Ne", "Na", "Ni"], respuesta: "N" },
        { pregunta: "¿Elemento metálico?", opciones: ["Oro", "Oxígeno", "Neón", "Hidrógeno"], respuesta: "Oro" },
        { pregunta: "¿Símbolo del Carbono?", opciones: ["C", "Ca", "Cl", "Co"], respuesta: "C" },
        { pregunta: "¿Número atómico del Helio?", opciones: ["1", "2", "3", "4"], respuesta: "2" },
        { pregunta: "¿Símbolo del Sodio?", opciones: ["Na", "S", "Si", "Sn"], respuesta: "Na" },
        { pregunta: "¿Símbolo del Hierro?", opciones: ["Fe", "Fi", "F", "Ir"], respuesta: "Fe" },
        { pregunta: "¿Número atómico del Hidrógeno?", opciones: ["1", "8", "10", "12"], respuesta: "1" },
        { pregunta: "¿Símbolo del Cloro?", opciones: ["Cl", "Co", "Cr", "Cu"], respuesta: "Cl" }
    ];

    // Mezclar preguntas aleatoriamente
    preguntas = preguntas.sort(() => Math.random() - 0.5);

    let preguntaContainer = document.getElementById("pregunta-container");
    if (preguntaContainer) {
        preguntas.forEach((preguntaObj, index) => {
            let preguntaElemento = document.createElement("div");
            preguntaElemento.innerHTML = `
                <p><strong>${preguntaObj.pregunta}</strong></p>
                ${preguntaObj.opciones.map(opcion => `
                    <label><input type="radio" name="pregunta${index}" value="${opcion}"> ${opcion}</label>
                `).join("<br>")}
                <br><br>
            `;
            preguntaContainer.appendChild(preguntaElemento);
        });
    }

    // ========================================
    // PASO 3: Calcular y guardar resultados (al enviar respuestas en preguntas.html)
    // ========================================
    let btnEnviar = document.getElementById("btnEnviar");
    if (btnEnviar) {
        btnEnviar.addEventListener("click", function () {
            let respuestasCorrectas = 0;
            preguntas.forEach((preguntaObj, index) => {
                let opciones = document.getElementsByName(`pregunta${index}`);
                opciones.forEach(opcion => {
                    if (opcion.checked && opcion.value === preguntaObj.respuesta) {
                        respuestasCorrectas++;
                    }
                });
            });

            // Cada pregunta vale 1 punto; calificación sobre 10:
            let calificacion = (respuestasCorrectas / preguntas.length) * 10;
            let datosFormulario = JSON.parse(localStorage.getItem("datosFormulario"));

            // Generar un ID único para este resultado
            let idResultado = Date.now();

            let resultadoFinal = {
                id: idResultado,
                nombre: datosFormulario.nombre,
                correo: datosFormulario.correo,
                escuela: datosFormulario.escuela,
                grado: datosFormulario.grado,
                grupo: datosFormulario.grupo,
                respuestasCorrectas: respuestasCorrectas,
                calificacion: calificacion.toFixed(1)
            };

            // Guardar en un arreglo de resultados (resultadosAlumnos)
            let resultadosGuardados = JSON.parse(localStorage.getItem("resultadosAlumnos")) || [];
            resultadosGuardados.push(resultadoFinal);
            localStorage.setItem("resultadosAlumnos", JSON.stringify(resultadosGuardados));

            // Guardar este resultado individual para mostrar al alumno
            localStorage.setItem("resultadoAlumno", JSON.stringify(resultadoFinal));

            window.location.href = "examenresultados.html";
        });
    }

    // ========================================
    // PASO 4: Mostrar resultados del alumno en examenresultado.html
    // ========================================
    if (window.location.pathname.includes("examenresultados.html")) {
        let resultadoAlumno = JSON.parse(localStorage.getItem("resultadoAlumno"));
        if (resultadoAlumno) {
            document.getElementById("nombre").innerText = `Nombre: ${resultadoAlumno.nombre}`;
            document.getElementById("correo").innerText = `Correo: ${resultadoAlumno.correo}`;
            document.getElementById("escuela").innerText = `Escuela: ${resultadoAlumno.escuela}`;
            document.getElementById("grado").innerText = `Grado: ${resultadoAlumno.grado}`;
            document.getElementById("grupo").innerText = `Grupo: ${resultadoAlumno.grupo}`;
            document.getElementById("respuestasCorrectas").innerText = `Respuestas correctas: ${resultadoAlumno.respuestasCorrectas}`;
            document.getElementById("calificacion").innerText = `Calificación: ${resultadoAlumno.calificacion}`;
        }

        let btnFinalizarSistema = document.getElementById("btnFinalizarSistema");
        if (btnFinalizarSistema) {
            btnFinalizarSistema.addEventListener("click", function () {
                window.location.href = "index.html";
            });
        }

        let btnMaestra = document.getElementById("btnMaestra");
        if (btnMaestra) {
            btnMaestra.addEventListener("click", function () {
                window.location.href = "maestra.html";
            });
        }
    }

    // ========================================
    // PASO 5: En la página de maestra (maestra.html) mostrar todos los resultados
    // ========================================
    if (window.location.pathname.includes("maestra.html")) {
        // Para ocultar la contraseña mientras se escribe, usa un campo <input type="password"> en la HTML.
        // Aquí se asume que la página maestra tiene un formulario para ingresar la contraseña.
        // Luego, se mostrará la tabla de resultados.

        // El código para solicitar contraseña se mueve a la HTML: la página de maestra tendrá un formulario de login.
        // Luego, una vez autenticado, se ejecuta el siguiente código:

        let tabla = document.getElementById("tablaResultados");
        let resultados = JSON.parse(localStorage.getItem("resultadosAlumnos")) || [];
        resultados.forEach(alumno => {
            let fila = tabla.insertRow();
            fila.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.correo}</td>
                <td>${alumno.escuela}</td>
                <td>${alumno.grado}</td>
                <td>${alumno.grupo}</td>
                <td>${alumno.respuestasCorrectas}</td>
                <td>${alumno.calificacion}</td>
                <td><button class="btnEliminar" data-id="${alumno.id}">Eliminar</button></td>
            `;
        });

        // Eliminar solo el resultado seleccionado usando su id
        document.querySelectorAll('.btnEliminar').forEach(button => {
            button.addEventListener('click', function () {
                let idEliminar = this.getAttribute("data-id");
                let resultados = JSON.parse(localStorage.getItem("resultadosAlumnos")) || [];
                let resultadosFiltrados = resultados.filter(alumno => alumno.id != idEliminar);
                localStorage.setItem("resultadosAlumnos", JSON.stringify(resultadosFiltrados));
                alert("✅ Resultado eliminado correctamente.");
                location.reload();
            });
        });

        // Botón para eliminar TODOS los resultados (opcional)
        let btnEliminarTodos = document.getElementById("btnEliminarResultados");
        if (btnEliminarTodos) {
            btnEliminarTodos.addEventListener("click", function () {
                if (confirm("¿Estás seguro de eliminar todos los resultados? Esta acción no se puede deshacer.")) {
                    localStorage.removeItem("resultadosAlumnos");
                    alert("✅ Todos los resultados han sido eliminados.");
                    location.reload();
                }
            });
        }
    }
});
