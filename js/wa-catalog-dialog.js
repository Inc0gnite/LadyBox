/* ══════════════════════════════════════════════════
   LadyBox — wa-catalog-dialog.js
   Intercepta los botones .js-wa-catalog y muestra
   el <dialog> de aviso antes de redirigir a WhatsApp.
   ══════════════════════════════════════════════════ */

(function () {
  const dialog  = document.getElementById('wa-notice');
  const btnClose = document.getElementById('wa-notice-close');
  const btnConfirm = document.getElementById('wa-notice-confirm');

  if (!dialog) return;

  let pendingUrl = 'https://www.whatsapp.com/catalog/56933216493/?app_absent=0';

  // Interceptar todos los botones/links .js-wa-catalog
  document.querySelectorAll('.js-wa-catalog').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      pendingUrl = el.href || pendingUrl;
      dialog.showModal();
    });
  });

  // Cerrar sin ir a WhatsApp
  btnClose && btnClose.addEventListener('click', () => {
    dialog.close();
  });

  // Confirmar y abrir WhatsApp
  btnConfirm && btnConfirm.addEventListener('click', () => {
    dialog.close();
    window.open(pendingUrl, '_blank', 'noopener,noreferrer');
  });

  // Cerrar al hacer clic en el backdrop (fuera del dialog)
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left  ||
      e.clientX > rect.right ||
      e.clientY < rect.top   ||
      e.clientY > rect.bottom;
    if (clickedOutside) dialog.close();
  });

  // Cerrar con Escape (ya lo hace el browser, pero por si acaso)
  dialog.addEventListener('cancel', () => dialog.close());
})();
