(function () {
  var KEY = 'trendy_theme';

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateIcons(dark);
  }

  function updateIcons(dark) {
    document.querySelectorAll('.icon-sun').forEach(function (el) {
      el.style.display = dark ? 'block' : 'none';
    });
    document.querySelectorAll('.icon-moon').forEach(function (el) {
      el.style.display = dark ? 'none' : 'block';
    });
  }

  function toggle() {
    var nowDark = !isDark();
    applyTheme(nowDark);
    localStorage.setItem(KEY, nowDark ? 'dark' : 'light');
  }

  // Inizializza icone al caricamento
  document.addEventListener('DOMContentLoaded', function () {
    updateIcons(isDark());

    document.querySelectorAll('#themeToggle').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  });
})();
