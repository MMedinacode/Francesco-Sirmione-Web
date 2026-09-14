/* ============================================================
   CAFFÉ FRANCESCO SIRMIONE — datos y lógica
   ============================================================
   CARTA REAL (13-09-2026), transcrita de la carta oficial que el propio
   local publica en su Instagram @cafefrancescomaipu — foto con su propio
   logo al pie, o sea material de ellos, no de un tercero.
   18 productos en 5 categorías, precios tal cual aparecen ahí.
   ============================================================ */

const MENU = {
  caffe: {
    label: 'Caffè',
    items: [
      { n:'Espresso',  p:2000, d:'Café concentrado a alta presión. Doble: $2.500.' },
      { n:'Americano', p:2000, d:'Espresso diluido.' },
      { n:'Capuccino', p:2000, d:'Espresso con leche vaporizada y espuma. Con sabor: $2.500.' },
      { n:'Vienés',    p:3000, d:'Capuccino con crema batida.' },
      { n:'Latte',     p:2000, d:'Espresso con abundante leche vaporizada. Con sabor: $2.500.' },
      { n:'Cortado',   p:2000, d:'Espresso con un poco de leche vaporizada. Con sabor: $2.500.' },
    ]
  },
  frias: {
    label: 'Bevande fredde',
    items: [
      { n:'Caffè gelato',  p:4000, d:'Espresso, leche, helado a elección y crema batida.' },
      { n:'Caffè freddo',  p:3500, d:'Espresso, leche, hielo, sabor a elección y crema batida.' },
      { n:'Milkshake',     p:3500, d:'Helado a elección, leche y crema batida.' },
      { n:'Affogato',      p:3600, d:'Espresso, helado, crema batida, sirope de amaretto y galleta de amaretto triturada.' },
    ]
  },
  panini: {
    label: 'Panini',
    items: [
      { n:'Della Casa', p:8500, d:'Ciabatta con aceite de oliva, salsa de la casa, prosciutto, mozzarella, pesto, tomates deshidratados y albahaca fresca.' },
      { n:'Francesco',  p:6500, d:'Ciabatta con aceite de oliva, prosciutto, mozzarella, albahaca fresca y salsa de la casa.' },
    ]
  },
  pizze: {
    label: 'Pizze',
    items: [
      { n:'Margherita', p:13900, d:'Salsa de tomate, mozzarella y albahaca fresca.' },
      { n:'Prosciutto', p:14900, d:'Salsa de tomate, mozzarella, prosciutto y albahaca fresca.' },
    ]
  },
  dolci: {
    label: 'Dolci',
    items: [
      { n:'Torta del día',      p:3000 },
      { n:'Tarta o pie del día', p:2500 },
      { n:'Cornetto',  p:3000, d:'Relleno de queso mascarpone. Sabores nutella, pistacho o clásico.' },
      { n:'Croissant', p:2000, d:'Relleno de chocolate, cherry o durazno.' },
    ]
  }
};

const money = n => '$' + n.toLocaleString('es-CL');

/* ---------- RENDER DE LA CARTA ---------- */
const tabsEl   = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

Object.keys(MENU).forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.textContent = MENU[key].label;
  tab.dataset.key = key;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  tab.addEventListener('click', () => showTab(key));
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + key;

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  MENU[key].items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item reveal';

    if (item.img) {
      const foto = document.createElement('div');
      const im = document.createElement('img');
      im.src = item.img; im.alt = item.n; im.loading = 'lazy';
      im.style.cssText = 'width:58px;height:58px;object-fit:cover;border-radius:12px;';
      foto.appendChild(im);
      row.appendChild(foto);
    }

    const texto = document.createElement('div');
    texto.className = 'menu-item-text';
    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = item.n;
    texto.appendChild(nombre);

    if (item.d) {
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = item.d;
      texto.appendChild(desc);
    }

    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = item.p ? money(item.p) : 'Consultar';

    row.appendChild(texto);
    row.appendChild(precio);
    grid.appendChild(row);
  });

  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    const activo = t.dataset.key === key;
    t.classList.toggle('active', activo);
    t.setAttribute('aria-selected', activo ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + key);
  });
  initScrollReveal();
}

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */
const navLinks = document.getElementById('navLinks');

function goToTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.tabPanel === tabId);
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === tabId);
  });
  navLinks.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); goToTab(el.dataset.tab); });
});

document.getElementById('navToggle').addEventListener('click', function () {
  const abierto = navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

/* ---------- INDICADOR ABIERTO / CERRADO ----------
   Horario CONFIRMADO en la bio de su Instagram (@loicascafeteria):
   Lunes a jueves 14:00–20:00 · Viernes a domingo 14:00–21:00. */
function horarioDeHoy() {
  // ⚠️ Google solo confirma la hora de APERTURA (17:00). El cierre no está
  // publicado: se asume 17:00–23:00 como estimación y así se declara en la
  // pestaña Visítanos. Confirmar con el local.
  return [17 * 60, 23 * 60];
}

function actualizarEstado(dotId, textId) {
  const dot  = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if (!dot || !text) return;
  const ahora   = new Date();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const h       = horarioDeHoy();
  const abierto = minutos >= h[0] && minutos < h[1];
  text.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !abierto);
}

actualizarEstado('statusDot', 'statusText');
actualizarEstado('statusDot2', 'statusText2');
actualizarEstado('statusDot3', 'statusText3');

/* ---------- SCROLL REVEAL (con red de seguridad) ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 55) + 'ms';
    io.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 1200);
}
initScrollReveal();

/* ---------- PANTALLA DE CARGA ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 320);
});

// Marca en la lista de horario el día de hoy. La lista es estática en el
// HTML a propósito: si el JS falla, el horario igual se lee.
function marcarDiaDeHoy() {
  const hoy = new Date().getDay();
  document.querySelectorAll('.horario-semana li[data-dia]').forEach(function (li) {
    li.classList.toggle('hs-hoy', Number(li.dataset.dia) === hoy);
  });
}
marcarDiaDeHoy();
