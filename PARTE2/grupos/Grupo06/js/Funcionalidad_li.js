$(document).ready(function() {
    // --- Optimización: Cachear Selectores (Demo Principal) ---
    const $noOrdenadaList = $("#NoOrdenada");
    const $itemInput = $("#itemInput");
    const $log = $("#log");
    const $errorMsg = $("#errorMsg"); 

    function getItemData() {
        const text = $itemInput.val().trim();
        if (text === "") {
            $errorMsg.text("¡Debes ingresar texto primero!");
            return null;
        }
        $errorMsg.text("");
        $itemInput.val(""); 
        
        return {
            html: `<li>${text}</li>`,
            text: text 
        }; 
    }

    //Añadir item al Final (.append) ---
    $("#addEnd").on("click", function() {
        const newItem = getItemData();
        if (newItem) {
            $noOrdenadaList.append(newItem.html);
            $log.html(`"${newItem.text}" añadido al final.`);
        }
    });

    //Añadir item al Inicio (.prepend) ---
    $("#addStart").on("click", function() {
        const newItem = getItemData();
        if (newItem) {
            $noOrdenadaList.prepend(newItem.html);
            $log.html(`"${newItem.text}" añadido al inicio.`);
        }
    });

    //Eliminar ultimo item (.remove) ---
    $("#removeLast").on("click", function() {
        const $removedItem = $noOrdenadaList.find("li:last");
        
        if ($removedItem.length > 0) {
             const text = $removedItem.text();
             $removedItem.remove();
             $log.html(`"${text}" eliminado con **.remove()**.`);
        } else {
             $log.html("La lista está vacía. Nada que eliminar.");
        }
        $errorMsg.text("");
    });

    //Recorrer y Mostrar (.each) ---
    $("#iterate").on("click", function() {
        let logContent = "Contenido actual de la lista (.each):<ul>";
        let count = 0;
        
        $noOrdenadaList.find("li").each(function(index) {
            logContent += `<li>${index + 1}: ${$(this).text()}</li>`;
            count++;
        });

        if (count === 0) {
            logContent = "La lista está vacía.";
        } else {
            logContent += "</ul>";
        }
        $log.html(logContent);
        $errorMsg.text("");
    });

    // Manejar Evento (.on("click")) en los items (Demo Principal)
    $noOrdenadaList.on("click", "li", function() {
        $(this).toggleClass("resaltado");
        $log.html(`Clic en: ${$(this).text()}`);
        $errorMsg.text("");
    });


    // --- Listas con Badge ---

    const $badgeList = $("#ListaBadge");

    //Incrementar el contador
    $("#incrementarContador").on("click", function() {
        const $itemResaltado = $badgeList.find(".resaltado");
        if ($itemResaltado.length > 0) {
            const $badge = $itemResaltado.find(".badge");
            let valorActual = $badge.text();
            let nuevoValor = parseInt(valorActual, 10) + 1; 
            $badge.text(nuevoValor);
        } else {
            alert("Por favor, selecciona una película de la lista principal primero.");
        }
    });

    //Cambiar color badge de un item
    $("#cambiarAAlerta").on("click", function() {
        const $itemResaltado = $badgeList.find(".resaltado");
        if ($itemResaltado.length > 0) {
            const $badge = $itemResaltado.find(".badge");
            if ($badge.hasClass("bg-warning")) {
                $badge.removeClass("bg-warning text-dark").addClass("bg-danger");
            } else {
                $badge.removeClass("bg-primary bg-success bg-danger bg-info")
                      .addClass("bg-warning text-dark");
            }
        } else {
            alert("Por favor, selecciona una película de la lista principal primero.");
        }
    });

    //Resaltado
    $badgeList.on("click", "li, a", function(e) { 
        e.preventDefault(); 
        $(this).siblings().removeClass("resaltado");
        $(this).addClass("resaltado"); 
    });

    $badgeList.on("click", "span.badge", function(e) {
        e.stopPropagation(); 
        const $parentItem = $(this).parent(); 
        $parentItem.siblings().removeClass("resaltado");
        $parentItem.addClass("resaltado"); 
    });

});