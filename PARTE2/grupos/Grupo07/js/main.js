$(document).ready(function () {

    /* ==========================================================
       PANEL EJEMPLO 1
    ========================================================== */
    window.mostrarPanelEjemplo1 = function () {
        const $container = $("#panelEjemplo1");

        if ($container.find(".panel").length) return;

        const $panel = $(`
            <div class="panel panel-default">
                <div class="panel-body">
                    Panel simple con contenido de ejemplo.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
                    facilis quam eos voluptatibus vel beatae similique sunt tempore cum earum
                    sed reprehenderit molestiae animi laboriosam voluptate saepe laudantium pariatur excepturi.
                </div>
            </div>
        `);

        $container.append($panel);

        setTimeout(() => $panel.addClass("show"), 50);
    };

    window.ocultarPanelEjemplo1 = function () {
        const $panel = $("#panelEjemplo1 .panel");
        if (!$panel.length) return;

        $panel.removeClass("show").addClass("hide");
        $panel.on("transitionend", () => $panel.remove());
    };


    /* ==========================================================
       PANEL EJEMPLO 2
    ========================================================== */
    window.mostrarPanelEjemplo2 = function () {
        const $container = $("#panelEjemplo2");
        if ($container.find(".panel").length) return;

        const $panel1 = $(`
            <div class="panel panel-default">
                <div class="panel-heading">Título del panel con estilo normal</div>
                <div class="panel-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officia, facilis quam eos voluptatibus vel beatae similique sunt tempore cum earum
                </div>
            </div>
        `);

        const $panel2 = $(`
            <div class="panel panel-default mt-3">
                <div class="panel-heading"><h3 class="panel-title">Título del panel con estilo de título</h3></div>
                <div class="panel-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officia, facilis quam eos voluptatibus vel beatae similique sunt tempore cum earum
                </div>
            </div>
        `);

        $container.append($panel1, $panel2);

        setTimeout(() => {
            $panel1.addClass("show");
            $panel2.addClass("show");
        }, 50);
    };

    window.ocultarPanelEjemplo2 = function () {
        $("#panelEjemplo2 .panel").each(function () {
            const $panel = $(this);
            $panel.removeClass("show").addClass("hide");
            $panel.on("transitionend", () => $panel.remove());
        });
    };


    /* ==========================================================
       PANEL EJEMPLO 3
    ========================================================== */
    window.mostrarPanelEjemplo3 = function () {
        const $container = $("#panelEjemplo3");
        if ($container.find(".panel").length) return;

        const $panel = $(`
            <div class="panel panel-default">
                <div class="panel-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                </div>
                <div class="panel-footer">pie de panel</div>
            </div>
        `);

        $container.append($panel);
        setTimeout(() => $panel.addClass("show"), 50);
    };

    window.ocultarPanelEjemplo3 = function () {
        const $panel = $("#panelEjemplo3 .panel");
        if (!$panel.length) return;

        $panel.removeClass("show").addClass("hide");
        $panel.on("transitionend", () => $panel.remove());
    };


    /* ==========================================================
       PANEL EJEMPLO 4 – PANELS CONTEXTUALES
    ========================================================== */
    window.mostrarPanelEjemplo4 = function () {
        const $container = $("#panelEjemplo4");
        if ($container.find(".panel").length) return;

        const panels = [
            { clase: "panel-primary", titulo: "Panel Primary", texto: "Este panel indica el panel principal o destacado." },
            { clase: "panel-success", titulo: "Panel Success", texto: "Este panel indica una acción exitosa o positiva." },
            { clase: "panel-info", titulo: "Panel Info", texto: "Información adicional o neutral." },
            { clase: "panel-warning", titulo: "Panel Warning", texto: "Advertencias importantes." },
            { clase: "panel-danger", titulo: "Panel Danger", texto: "Errores o alertas críticas." }
        ];

        panels.forEach((p, i) => {
            const $panel = $(`
                <div class="panel ${p.clase} mb-3">
                    <div class="panel-heading">${p.titulo}</div>
                    <div class="panel-body">${p.texto}</div>
                </div>
            `);

            $container.append($panel);

            setTimeout(() => $panel.addClass("show"), 120 * (i + 1));
        });
    };

    window.ocultarPanelEjemplo4 = function () {
        $("#panelEjemplo4 .panel").each(function () {
            const $panel = $(this);
            $panel.removeClass("show").addClass("hide");
            $panel.on("transitionend", () => $panel.remove());
        });
    };


    /* ==========================================================
       PANEL EJEMPLO 5 – TABLAS
    ========================================================== */
    window.mostrarPanelEjemplo5 = function () {
        const $container = $("#panelEjemplo5");
        if ($container.find(".panel").length) return;

        const $panel = $(`
            <div class="panel panel-primary">
                <div class="panel-heading">Título 1</div>
                <div class="panel-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                </div>
                <table class="table table-striped text-center">
                    <tr><th>Datos 1</th><th>Datos 2</th><th>Datos 3</th><th>Datos 4</th></tr>
                    <tr><td>Valor 1</td><td>Valor 2</td><td>Valor 3</td><td>Valor 4</td></tr>
                    <tr><td>Valor 1</td><td>Valor 2</td><td>Valor 3</td><td>Valor 4</td></tr>
                </table>
            </div>
        `);

        $container.append($panel);
        setTimeout(() => $panel.addClass("show"), 50);
    };

    window.ocultarPanelEjemplo5 = function () {
        const $panel = $("#panelEjemplo5 .panel");
        if (!$panel.length) return;

        $panel.removeClass("show").addClass("hide");
        $panel.on("transitionend", () => $panel.remove());
    };


    /* ==========================================================
       PANEL EJEMPLO 6 – LISTAS + BADGES
    ========================================================== */
    window.mostrarPanelEjemplo6 = function () {
        const $container = $("#panelEjemplo6");
        if ($container.find(".panel").length) return;

        const $panel = $(`
            <div class="panel panel-primary">
                <div class="panel-heading">Título 1</div>
                <div class="panel-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                </div>
                <ul class="list-group text-start">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Mensajes <span class="badge bg-primary rounded-pill">14</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Archivos <span class="badge bg-primary rounded-pill">20</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Imágenes <span class="badge bg-primary rounded-pill">15</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Música <span class="badge bg-primary rounded-pill">18</span>
                    </li>
                </ul>
            </div>
        `);

        $container.append($panel);
        setTimeout(() => $panel.addClass("show"), 50);
    };

    window.ocultarPanelEjemplo6 = function () {
        const $panel = $("#panelEjemplo6 .panel");
        if (!$panel.length) return;

        $panel.removeClass("show").addClass("hide");
        $panel.on("transitionend", () => $panel.remove());
    };


    /* ==========================================================
       EJERCICIO FINAL – IFRAME
    ========================================================== */
    window.mostrarEjercicioPanel = function () {
        const $contenedor = $("#resultadoPanel");
        $contenedor.html(`
            <iframe 
                id="iframePanel"
                src="Grupo02_PRUEBA_Parte II/index.html"
                width="100%"
                height="725"
                style="border:2px solid #ccc; border-radius:8px; opacity:0; transform:translateY(20px); transition:all 0.8s ease;"
                title="Proyecto Grupo 2">
            </iframe>
        `);

        setTimeout(() => {
            $("#iframePanel").css({
                opacity: 1,
                transform: "translateY(0)"
            });
        }, 50);
    };

    window.ocultarEjercicioPanel = function () {
        const $iframe = $("#iframePanel");
        if (!$iframe.length) return;

        $iframe.css({
            opacity: 0,
            transform: "translateY(20px)"
        });

        setTimeout(() => $iframe.hide(), 500);
    };

});
