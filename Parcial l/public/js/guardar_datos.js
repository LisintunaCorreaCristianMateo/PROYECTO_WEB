// guardar_datos.js

window.guardar_Datos = function () {
    const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        cedula: document.getElementById("cedula").value.trim(),
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        email: document.getElementById("email").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        nivel: document.getElementById("nivel").value,
        horario: document.getElementById("horario").value,
        comentarios: document.getElementById("comentarios").value.trim(),
        latitud: document.getElementById("latitud").value,
        longitud: document.getElementById("longitud").value,
        foto: obtenerImagenDesdeCanvas("foto")
    };

    // Validar campos obligatorios
    for (const campo in datos) {
        if (datos[campo] === "" && campo !== "direccion" && campo !== "comentarios") {
            mostrarModal(`El campo ${campo} es obligatorio.`);
            return;
        }
    }

    try {
        localStorage.setItem("datosFormulario", JSON.stringify(datos));
        console.log("Datos guardados en localStorage.");
    } catch (e) {
        console.error("Error al guardar en localStorage:", e);
        mostrarModal("Ocurrió un error al guardar los datos.");
        return;
    }

    console.log("Datos registrados:", datos);

    mostrarMensaje("Datos registrados correctamente.");
};

function obtenerImagenDesdeCanvas(idCanvas) {
    const canvas = document.getElementById(idCanvas);
    if (canvas) {
        return canvas.toDataURL("image/png");
    } else {
        console.error("Canvas no encontrado:", idCanvas);
        return "";
    }
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('alerta');
    const mensajeElem = document.getElementById('alertaMessage');
    mensajeElem.textContent = mensaje;
    modal.style.display = 'flex';
}

function mostrarMensaje(mensaje1) {
    const modal = document.getElementById('mensaje');
    const mensajeElem = document.getElementById('mensajeContent');
    mensajeElem.textContent = mensaje1;
    modal.style.display = 'flex';
}
