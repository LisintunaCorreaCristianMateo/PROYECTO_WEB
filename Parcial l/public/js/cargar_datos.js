function cargarDatosPerfil() {
    const datos = JSON.parse(localStorage.getItem("datosFormulario"));

    if (!datos) {
        console.warn("No se encontraron datos guardados.");
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

    // Verificar si los elementos existen (para evitar errores en carga dinámica)
    if (!elementos.nombre) {
        // Los elementos no están presentes en el DOM actual
        return false;
    }

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

    if (!isNaN(lat) && !isNaN(lng) && elementos.mapa) {
        // Esperar a que Leaflet esté cargado
        if (typeof L !== 'undefined') {
            // Comprobar si el mapa ya está inicializado
            if (elementos.mapa._leaflet_id) {
                elementos.mapa._leaflet = null;
                elementos.mapa.innerHTML = '';
            }
            
            const map = L.map("profileMap").setView([lat, lng], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors"
            }).addTo(map);

            L.marker([lat, lng]).addTo(map)
                .bindPopup("Ubicación del alumno")
                .openPopup();
                
            return true;
        } else {
            console.error("Leaflet no está cargado");
            return false;
        }
    } else if (elementos.mapa) {
        elementos.mapa.textContent = "Coordenadas inválidas o no proporcionadas.";
        return true;
    }
    
    return true;
}

// Función para verificar y cargar el perfil
function verificarYCargarPerfil() {
    // Solo intentar cargar si estamos en la página del perfil
    if (document.getElementById("profileNombre")) {
        cargarDatosPerfil();
    }
}

// Función para ser llamada después de cargar contenido dinámico
function cargarPerfilDinamico() {
    // Usar un pequeño retraso para asegurar que el DOM esté actualizado
    setTimeout(verificarYCargarPerfil, 100);
}

// Listener para cuando la página se carga inicialmente
document.addEventListener("DOMContentLoaded", verificarYCargarPerfil);

// Para contenido dinámico - llamar esta función cuando se cargue verPerfil.html
if (document.readyState === "complete" || document.readyState === "interactive") {
    verificarYCargarPerfil();
}

// Función para ser usada desde cargador_Login.js
window.addEventListener("cargarPerfilEvent", verificarYCargarPerfil);