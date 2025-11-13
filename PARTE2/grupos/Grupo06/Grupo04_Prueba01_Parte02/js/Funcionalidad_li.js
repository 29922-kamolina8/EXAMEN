$(document).ready(function() {

    // --- Demo 1: Selectores (Tareas) ---
    const $noOrdenadaList = $("#NoOrdenada");
    const $itemInput = $("#itemInput");
    const $log = $("#log");
    const $errorMsg = $("#errorMsg"); 

    function getItemData() {
        const text = $itemInput.val().trim();
        if (text === "") {
            $errorMsg.text("¡Debes ingresar una tarea!");
            return null;
        }
        $errorMsg.text("");
        $itemInput.val(""); 
        
        return {
            html: `<li class="list-group-item">${text}</li>`,
            text: text 
        };
    }

    //Añadir item al Final (.append) ---
    $("#addEnd").on("click", function() {
        const newItem = getItemData();
        if (newItem) {
            $noOrdenadaList.append(newItem.html);
            $log.html(`"${newItem.text}" añadida al final.`);
        }
    });

    //Añadir item al Inicio (.prepend) ---
    $("#addStart").on("click", function() {
        const newItem = getItemData();
        if (newItem) {
            $noOrdenadaList.prepend(newItem.html);
            $log.html(`"${newItem.text}" añadida al inicio.`);
        }
    });

    //Eliminar ultimo item (.remove) ---
    $("#removeLast").on("click", function() {
        const $removedItem = $noOrdenadaList.find("li:last");
        
        if ($removedItem.length > 0) {
             const text = $removedItem.text();
             $removedItem.remove();
             $log.html(`Tarea completada: "${text}".`);
        } else {
             $log.html("La lista de tareas está vacía.");
        }
        $errorMsg.text("");
    });

    //Recorrer y Mostrar (.each) ---
    $("#iterate").on("click", function() {
        let logContent = "Tareas pendientes:<ul>";
        let count = 0;
        
        $noOrdenadaList.find("li").each(function(index) {
            logContent += `<li>${index + 1}: ${$(this).text()}</li>`;
            count++;
        });

        if (count === 0) {
            logContent = "No hay tareas pendientes.";
        } else {
            logContent += "</ul>";
        }
        $log.html(logContent);
        $errorMsg.text("");
    });

    // Manejar Evento (.on("click")) en los items
    $noOrdenadaList.on("click", "li", function() {
        $(this).toggleClass("resaltado");
        $log.html(`Clic en: ${$(this).text()}`);
        $errorMsg.text("");
    });


    // --- Demo 2: Listas de Grupos (Badges) ---

    const $badgeList = $("#ListaBadge");

    //Incrementar el contador
    $("#incrementarContador").on("click", function() {
        const $itemResaltado = $badgeList.find(".resaltado");
        if ($itemResaltado.length === 0) {
            // Mensaje de alerta actualizado
            alert("Por favor, selecciona un GRUPO de la lista primero.");
            return;
        }
        const $badge = $itemResaltado.find(".badge");
        
        let valorActual = $badge.text();
        let nuevoValor = parseInt(valorActual, 10) + 1; 
        $badge.text(nuevoValor);
        console.log(`Integrantes actualizados a: ${nuevoValor}`);
    });

    //Cambiar color badge (Adaptado a BS5)
    $("#cambiarAAlerta").on("click", function() {
        const $itemResaltado = $badgeList.find(".resaltado");
        if ($itemResaltado.length === 0) {
            // Mensaje de alerta actualizado
            alert("Por favor, selecciona un GRUPO de la lista primero.");
            return;
        }
        const $badge = $itemResaltado.find(".badge");

        // Clases de Bootstrap 5
        const classAlerta = "bg-warning";
        const classDanger = "bg-danger";
        const classTextDark = "text-dark";

        if ($badge.hasClass(classAlerta)) {
            $badge.removeClass(classAlerta).removeClass(classTextDark).addClass(classDanger);
            console.log("Grupo marcado como 'Danger' (rojo).");
        } else if ($badge.hasClass(classDanger)) {
             $badge.removeClass(classDanger); 
            console.log("Color del grupo vuelto a 'Default'.");
        } else {
            // Quita otras clases de color para evitar conflictos y añade la de alerta
            $badge.removeClass("bg-primary bg-success bg-info").addClass(classAlerta).addClass(classTextDark);
            console.log("Grupo marcado como 'Alerta' (amarillo).");
        }
    });

    // --- Lógica de Resaltado (Demo 2) ---

    // 1. Resaltar al hacer clic en CUALQUIER LUGAR del ítem (li o a)
    $badgeList.on("click", "li, a", function(e) { 
        e.preventDefault(); 
        $(this).siblings().removeClass("resaltado");
        $(this).addClass("resaltado"); 
        console.log(`Clic en (Grupo): ${$(this).text().trim().split('\n')[0]}.`);
    });

    // 2. Resaltar usando .parent() al hacer clic SOLO en el badge
    $badgeList.on("click", "span.badge", function(e) {
        e.stopPropagation(); 
        const $parentItem = $(this).closest("li, a"); // .closest es más robusto que .parent()
        $parentItem.siblings().removeClass("resaltado");
        $parentItem.addClass("resaltado"); 
        console.log(`Clic en (Badge de Grupo): ${$parentItem.text().trim().split('\n')[0]}.`);
    });

});