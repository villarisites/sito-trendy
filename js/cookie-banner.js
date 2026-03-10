(function () {
  var KEY = 'trendy_cookie_consent';

  // Se la scelta è già stata fatta, non mostrare il banner
  if (localStorage.getItem(KEY)) return;

  // Crea il banner
  var dark = document.documentElement.classList.contains('dark');
  var banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Consenso cookie');
  banner.style.cssText = [
    'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:9999',
    dark ? 'background:#1C1236' : 'background:#fff',
    'border-top:3px solid #5E2CA5',
    dark ? 'box-shadow:0 -6px 40px rgba(0,0,0,0.4)' : 'box-shadow:0 -6px 40px rgba(0,0,0,0.13)',
    'transform:translateY(100%)',
    'transition:transform 0.4s cubic-bezier(.4,0,.2,1)',
    'font-family:Inter,system-ui,-apple-system,sans-serif'
  ].join(';');

  // Ascolta cambi tema per aggiornare il banner se già visibile
  document.documentElement.addEventListener('classchange', function() {
    if (!banner.parentNode) return;
    var nowDark = document.documentElement.classList.contains('dark');
    banner.style.background = nowDark ? '#1C1236' : '#fff';
    banner.style.boxShadow = nowDark ? '0 -6px 40px rgba(0,0,0,0.4)' : '0 -6px 40px rgba(0,0,0,0.13)';
  });

  banner.innerHTML =
    '<div style="max-width:1280px;margin:0 auto;padding:1rem 1.5rem;'
    + 'display:flex;flex-wrap:wrap;align-items:center;gap:1rem;">'

    // Icona + testo
    + '<div style="flex:1;min-width:240px;display:flex;align-items:flex-start;gap:0.75rem;">'
    + '<div style="width:2.25rem;height:2.25rem;border-radius:0.5rem;flex-shrink:0;'
    + 'background:rgba(94,44,165,0.1);display:flex;align-items:center;justify-content:center;">'
    + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E2CA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>'
    + '<path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01"/>'
    + '</svg></div>'
    + '<p style="margin:0;font-size:0.875rem;color:' + (dark ? '#c4b5fd' : '#374151') + ';line-height:1.65;">'
    + '<strong style="color:' + (dark ? '#F0EAF8' : '#111111') + ';">Utilizziamo i cookie</strong> — cookie tecnici per il funzionamento del sito '
    + 'e risorse di terze parti (Google Fonts, Tailwind CDN). Nessun cookie di profilazione o tracciamento. '
    + '<a href="cookie-policy.html" style="color:#5E2CA5;font-weight:600;text-decoration:underline;">'
    + 'Leggi la Cookie Policy</a>'
    + '</p></div>'

    // Pulsanti
    + '<div style="display:flex;gap:0.625rem;flex-shrink:0;flex-wrap:wrap;">'
    + '<button id="cookieAccept" style="padding:0.625rem 1.5rem;background:#F4C542;color:#111111;'
    + 'font-weight:700;font-size:0.875rem;border:none;border-radius:0.625rem;cursor:pointer;'
    + 'font-family:inherit;white-space:nowrap;transition:transform .15s,box-shadow .15s;"'
    + ' onmouseover="this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 4px 12px rgba(244,197,66,.4)\'"'
    + ' onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
    + 'Accetta tutto</button>'
    + '<button id="cookieNecessary" style="padding:0.625rem 1.25rem;background:transparent;color:#5E2CA5;'
    + 'font-weight:700;font-size:0.875rem;border:2px solid #5E2CA5;border-radius:0.625rem;cursor:pointer;'
    + 'font-family:inherit;white-space:nowrap;transition:background .15s,color .15s;"'
    + ' onmouseover="this.style.background=\'#5E2CA5\';this.style.color=\'#fff\'"'
    + ' onmouseout="this.style.background=\'\';this.style.color=\'#5E2CA5\'">'
    + 'Solo necessari</button>'
    + '</div>'

    + '</div>';

  document.body.appendChild(banner);

  // Animazione entrata (doppio rAF per triggherare la transizione CSS)
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      banner.style.transform = 'translateY(0)';
    });
  });

  function hideBanner(value) {
    localStorage.setItem(KEY, value);
    banner.style.transform = 'translateY(100%)';
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 420);
  }

  document.getElementById('cookieAccept').addEventListener('click', function () {
    hideBanner('accepted');
  });
  document.getElementById('cookieNecessary').addEventListener('click', function () {
    hideBanner('necessary');
  });
})();
