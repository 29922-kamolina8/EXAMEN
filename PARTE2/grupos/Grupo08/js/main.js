// js/main.js (refactorizado y limpio)

// --------- Utilidades ---------
/**
 * Decodifica entidades HTML de una cadena de texto.
 * @param {string} str - La cadena a decodificar.
 * @returns {string} La cadena decodificada.
 */
function decodeHtmlEntities(str) {
  const ta = document.createElement('textarea');
  ta.innerHTML = str;
  return ta.value;
}

/**
 * Renderiza el contenido de un bloque de código en un contenedor de vista previa.
 * @param {string} codeSelector - Selector CSS para el elemento <code>.
 * @param {HTMLElement} container - El elemento contenedor donde se renderizará la vista previa.
 * @returns {HTMLElement|null} El elemento de vista previa creado o null si falla.
 */
function renderFromCode(codeSelector, container) {
  const codeEl = document.querySelector(codeSelector);
  if (!codeEl) return null;

  const decoded = decodeHtmlEntities(codeEl.textContent || codeEl.innerText || '');

  // Contenedor donde se renderiza
  const live = document.createElement('div');
  live.className = 'live-preview mt-3';
  live.setAttribute('data-source', codeSelector);
  live.style.padding = '1rem';
  live.style.background = '#f5fff5';
  live.style.border = '1px dashed #198754';
  live.innerHTML = decoded;

  container.append(live);
  return live;
}


$(document).ready(function () {
  
  // --------- Copiar al portapapeles (delegado) ---------
  $(document).on('click', '.copy-btn', function () {
    const targetSel = $(this).data('copy-target');
    let text = '';
    try { 
      text = $(targetSel).text(); 
    } catch (e) { 
      console.error("Error al obtener texto para copiar:", e);
      return; 
    }
    if (!text) return;

    const $btn = $(this);
    const originalText = $btn.text();
    const ok = () => { 
      $btn.text('Copiado'); 
      setTimeout(() => $btn.text(originalText), 1500); 
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(err => console.error("Error al copiar con API:", err));
    } else {
      const $t = $('<textarea>').appendTo('body').val(text).select();
      document.execCommand('copy');
      $t.remove();
      ok();
    }
  });

  // --------- Reset genérico de ejemplos ---------
  $('.btn-reset').on('click', function () {
    const target = $(this).data('target');
    if (!target || target === '#seccionExtra') return;
    $(target).html('<p class="text-muted small">Ejemplo no ejecutado.</p>');
  });

  // --------- Reset específico para sección extra ---------
  $(document).on('click', '.btn-reset[data-target="#seccionExtra"]', function (e) {
    e.preventDefault();
    const $sec = $('#seccionExtra');

    $sec.stop(true, true).slideUp(400);
    $sec.find('.live-preview').remove(); // Limpia solo las vistas previas generadas

    $('.ejecutar[data-example="mostrar-extra"]')
      .html('<i class="fas fa-eye"></i> EJECUTAR - Corrección Prueba')
      .prop('disabled', false);
  });

  // --------- Ejecutar ejemplos (inyecta HTML desde <template>) ---------
  $(document).on('click', '.ejecutar', function () {
    const $btn = $(this);
    const target = $btn.data('target');
    const example = $btn.data('example');

    // Caso especial: Mostrar la sección extra con sus propios templates
    if (example === 'mostrar-extra' && target === '#seccionExtra') {
      const $sec = $('#seccionExtra');
      
      // Solo renderiza si no se ha hecho antes para evitar duplicados
      if ($sec.find('.live-preview').length === 0) {
        renderFromCode('#code-tmplLogin', $sec[0]);
        renderFromCode('#code-layout3', $sec[0]);
      }
      
      $sec.stop(true, true).slideDown(400);
      $('html, body').animate({ scrollTop: $sec.offset().top - 100 }, 600);
      $btn.html('<i class="fas fa-check-circle"></i> PANEL MOSTRADO').prop('disabled', true);
      return;
    }

    // Lógica principal: Inyectar desde plantillas
    const templateId = '#tmpl-' + example;
    const $template = $(templateId);

    if (target && $template.length > 0) {
      const content = $template.prop('content').cloneNode(true);
      $(target).hide().empty().append(content).fadeIn(200);
    } else {
      console.warn(`No se encontró el target ('${target}') o la plantilla ('${templateId}')`);
    }
  });

  // --------- Panel central dinámico (desde <template>) ---------
  $(document).on('click', '[data-func]', function (e) {
    e.preventDefault();
    const tipo = $(this).data('func');
    
    // Si el enlace es de un formulario, no hacer nada aquí
    if (['registro', 'producto', 'contacto'].includes(tipo)) return;
    
    $('[data-func]').removeClass('active');
    $(this).addClass('active');

    const templateId = '#tmpl-func-' + tipo;
    const $template = $(templateId);
    
    if ($template.length > 0) {
      const content = $template.prop('content').cloneNode(true);
      $('#contenido-dinamico').hide().html(content).fadeIn(400);
    } else {
       console.warn(`No se encontró la plantilla para la función: '${templateId}'`);
    }
  });

  // --------- Estado inicial ---------
  $('#seccionExtra').hide();

  // --------- Autoplay de videos principales ---------
  const mainVideo = document.getElementById('video-explicativo');
  if (mainVideo) {
    mainVideo.muted = true;
    mainVideo.setAttribute('playsinline', '');
    mainVideo.play().catch(error => {
      console.log("El navegador bloqueó la reproducción automática del video: ", error);
    });
  }
});