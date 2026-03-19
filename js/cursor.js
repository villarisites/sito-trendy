/* =============================================
   TRENDY Media Lab – Custom Cursor
   Disabilitato automaticamente su touch device
   ============================================= */

(function () {
  // Guard: touch device → no cursor
  if (window.matchMedia('(hover: none)').matches) return;

  var dot  = document.createElement('div');
  var ring = document.createElement('div');
  dot.id  = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform  = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
    ring.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
  });

  // Hover state on interactive elements
  var interactiveSelector = 'a, button, .card, label, [role="button"]';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('cursor-hover');
    }
  });

  // Hide when leaving window
  document.documentElement.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.documentElement.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();
