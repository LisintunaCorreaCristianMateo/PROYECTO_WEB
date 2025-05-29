function cargarDatosPerfil() {
    const datos = JSON.parse(localStorage.getItem("datosFormulario"));

    if (!datos) {
        alert("No se encontraron datos guardados.");
        return;
    }

    // Verificar que los elementos existen antes de intentar acceder a ellos
    const elementos = {
        nombre: document.getElementById("profileNombre"),
        apellido: document.getElementById("profileApellido"),
        cedula: document.getElementById("profileCedula"),
        fecha_nacimiento: document.getElementById("profileFechaNacimiento"),
        email: document.getElementById("profileEmail"),
        telefono: document.getElementById("profileTelefono"),
        direccion: document.getElementById("profileDireccion"),
        nivel: document.getElementById("profileNivel"),
        horario: document.getElementById("profileHorario"),
        comentarios: document.getElementById("profileComentarios"),
        latitud: document.getElementById("profileLatitud"),
        longitud: document.getElementById("profileLongitud"),
        foto: document.getElementById("profilePhoto"),
        mapa: document.getElementById("profileMap")
    };

    // Asignar valores a los elementos existentes
    for (const key in elementos) {
        if (elementos[key] && datos[key]) {
            if (key === 'foto') {
                elementos[key].src = datos[key];
            } else {
                elementos[key].textContent = datos[key];
            }
        }
    }

    // Mostrar mapa con Leaflet si las coordenadas son válidas
    const lat = parseFloat(datos.latitud);
    const lng = parseFloat(datos.longitud);

    if (!isNaN(lat) && !isNaN(lng)) {
        // Esperar a que Leaflet esté cargado
        if (typeof L !== 'undefined') {
            const map = L.map("profileMap").setView([lat, lng], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors"
            }).addTo(map);

            L.marker([lat, lng]).addTo(map)
                .bindPopup("Ubicación del alumno")
                .openPopup();
        } else {
            console.error("Leaflet no está cargado");
        }
    } else if (elementos.mapa) {
        elementos.mapa.textContent = "Coordenadas inválidas o no proporcionadas.";
    }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Verificar si estamos en la página de perfil
    if (document.getElementById("profileNombre")) {
        cargarDatosPerfil();
    }
});

// También ejecutar cuando se carga dinámicamente
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(cargarDatosPerfil, 100);
}