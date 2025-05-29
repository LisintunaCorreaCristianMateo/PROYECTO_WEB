fetch("menu_login.html")
  .then(res => res.text())
  .then(data => document.getElementById("header_login").innerHTML = data);

fetch("footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

function cargarPaginasLogin(url_pagina) {
    fetch(`paginasLogin/${url_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            // Reemplazar rutas relativas con rutas absolutas
            const contenidoModificado = data.replace(/src="\.\.\/img\//g, 'src="./img/');
            document.getElementById('principal').innerHTML = contenidoModificado;
            
            // Activar la cámara si estamos en la página de crear perfil
            if (url_pagina === "crearPerfil") {
                if (typeof window.activarCamara === 'function') {
                    window.activarCamara();
                }
                
                // Añadir evento al botón de geolocalización para evitar usar onclick
                const btnGeolocalizar = document.getElementById('btn_geolocalizar');
                if (btnGeolocalizar && typeof window.obtenerUbicacion === 'function') {
                    btnGeolocalizar.addEventListener('click', window.obtenerUbicacion);
                }
            }
        });
}

window.onload = () => cargarPaginasLogin("IndexPrincipal");