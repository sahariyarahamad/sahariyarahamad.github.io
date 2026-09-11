(() => {
  const key = "sahariyar-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(key) || "system";
  root.dataset.theme = saved;

  function apply(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(key, theme);
  }
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeBtn");
    const menu = document.getElementById("menuBtn");
    const nav = document.getElementById("mainNav");
    if (btn) {
      btn.title = `Theme: ${root.dataset.theme}`;
      btn.addEventListener("click", () => {
        const next = {system:"light", light:"dark", dark:"system"}[root.dataset.theme];
        apply(next);
        btn.title = `Theme: ${next}`;
      });
    }
    if (menu && nav) menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", open);
    });
  });
})();