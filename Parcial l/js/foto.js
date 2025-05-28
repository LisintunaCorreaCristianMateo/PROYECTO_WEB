let strem = null;
let camaraInicializada = false;

// Función para inicializar la cámara solo cuando sea necesario
function inicializarCamara() {
    if (camaraInicializada) return; // Evitar inicializar múltiples veces
    
    const videoElement = document.getElementById("my_camara");
    if (!videoElement) return; // No hacer nada si el elemento no existe
    
    camaraInicializada = true;
    
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
            strem = s;
            videoElement.srcObject = strem;
        })
        .catch(error => {
            console.log("Error accediendo a la cámara:", error);
        });
}

// Verificar cuando el contenido dinámico se ha cargado
document.addEventListener('DOMContentLoaded', function() {
    // Observador de mutaciones para detectar cuando se añade el elemento de video
    const observer = new MutationObserver(function(mutations) {
        if (document.getElementById("my_camara")) {
            inicializarCamara();
        }
    });
    
    // Observar los cambios en el elemento principal donde se carga el contenido dinámico
    const targetNode = document.getElementById("principal");
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }
});

function tomarFoto() {
    let video_res = document.getElementById("my_camara");
    let foto_res = document.getElementById("foto");
    
    if (!video_res || !foto_res) {
        console.error("Elementos de cámara no encontrados");
        return;
    }
    
    let ctx = foto_res.getContext("2d");
    ctx.drawImage(video_res, 0, 0, foto_res.width, foto_res.height);
}

// Exponer una función para activar la cámara desde fuera
window.activarCamara = function() {
    inicializarCamara();
};