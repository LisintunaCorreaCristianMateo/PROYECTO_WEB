fetch("menu.html")
  .then(res => res.text())
  .then(data => document.getElementById("menu").innerHTML = data);

fetch("footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);



// ...existing code...

function cargarPaginas(url_pagina) {
    fetch(`paginas/${url_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            // Reemplazar rutas relativas con rutas absolutas
            const contenidoModificado = data.replace(/src="\.\.\/img\//g, 'src="./img/');
            document.getElementById('main').innerHTML = contenidoModificado;

            // Inicializar gráficas si la página cargada es pibEcuador
            if (url_pagina === 'pibEcuador') {
                initCharts();
            }
             // Inicializar gráficas si la página es pibMundial
            if (url_pagina === 'pibMundial') {
                initCharts();
            }
        });
}

// Función para inicializar las gráficas
function initCharts() {
    if (typeof Chart === 'undefined') {
        return;
    }

    // Inicializar gráficas según la página
    if (typeof window.initAreaChart === 'function') {
        window.initAreaChart();
    }
    if (typeof window.initBarChart === 'function') {
        window.initBarChart();
    }
}

window.onload = () => cargarPaginas("index2");