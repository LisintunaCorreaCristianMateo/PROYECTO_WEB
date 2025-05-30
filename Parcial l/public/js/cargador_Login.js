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
            
            // Cargar scripts específicos después de cargar el contenido
            if (url_pagina === "crearPerfil") {
                const script = document.createElement('script');
                script.src = './public/js/crearPerfil.js';
                document.body.appendChild(script);
                
                if (typeof window.activarCamara === 'function') {
                    window.activarCamara();
                }
                
                const btnGeolocalizar = document.getElementById('btn_geolocalizar');
                if (btnGeolocalizar && typeof window.obtenerUbicacion === 'function') {
                    btnGeolocalizar.addEventListener('click', window.obtenerUbicacion);
                }
            }
            else if (url_pagina === "verPerfil") {
                // No vuelvas a cargar el script, ya está en bienvenida.html
                // En su lugar, dispara un evento para activar la carga de datos
                if (typeof cargarPerfilDinamico === 'function') {
                    cargarPerfilDinamico();
                } else {
                    // Si la función no está disponible, dispara un evento personalizado
                    const evento = new Event('cargarPerfilEvent');
                    window.dispatchEvent(evento);
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
        });
}

window.onload = () => cargarPaginasLogin("IndexPrincipal");