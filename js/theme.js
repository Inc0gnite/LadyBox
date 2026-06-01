/* ══════════════════════════════════════════════════
   LadyBox — theme.js
   Dark / Light mode toggle con localStorage
   ══════════════════════════════════════════════════ */

(function () {
  const html    = document.documentElement;
  const btn     = document.getElementById('theme-toggle');
  const STORAGE = 'ladybox-theme';

  // Aplica el tema guardado antes de que el navegador pinte (evita flash)
  const saved = localStorage.getItem(STORAGE);
  if (saved) html.setAttribute('data-theme', saved);

  // Toggle al hacer clic
  btn && btn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next   = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE, next);
    btn.setAttribute('title', isDark ? 'Modo oscuro' : 'Modo claro');
    btn.setAttribute('aria-label', isDark ? 'Activar modo oscuro' : 'Activar modo claro');
  });
})();
