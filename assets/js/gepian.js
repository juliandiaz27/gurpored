
// Año en footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
// AOS init
AOS.init({
  once: true,
  duration: 700,
  easing: 'ease-out-cubic'
});

// GSAP: split simple por palabras y animación
function splitWords(el){
  // quita espacios/saltos al principio y al final
  const text = el.textContent.trim();
  const words = text.split(/\s+/); // compacta cualquier cantidad de espacios

  el.innerHTML = words
    .map(w => `<span class="word d-inline-block overflow-hidden"><span class="inner d-inline-block">${w}</span></span>`)
    .join(' '); // inserta un único espacio entre palabras
}
document.querySelectorAll('.js-split').forEach(el => {
  splitWords(el);
  const inners = el.querySelectorAll('.inner');
  gsap.set(inners, {yPercent: 110, opacity: 0});
  gsap.to(inners, {
    yPercent: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.05
  });
});

// ===== Navbar: fondo/colores según scroll + mobile toggle =====
const nav = document.getElementById('navbar');
const toTop = document.getElementById('toTop');
const collapse = document.getElementById('navContent');

function updateNavbarOnScroll() {
  const y = window.scrollY || window.pageYOffset;
  const THRESHOLD = 60;

  if (y > THRESHOLD) {
    nav.classList.add('scrolled');           // activa tu CSS: fondo blanco + texto negro
    nav.setAttribute('data-bs-theme', 'light'); // íconos/links oscuros
  } else {
    nav.classList.remove('scrolled');        // transparente sobre el hero
    nav.setAttribute('data-bs-theme', 'dark');  // íconos/links claros
  }

  // sombra suave (opcional)
  nav.classList.toggle('shadow-sm', y > 2);

  // botón back-to-top (si existe)
  if (toTop) toTop.style.display = y > 600 ? 'block' : 'none';
}

// Aplica al cargar y al scrollear
window.addEventListener('load', updateNavbarOnScroll);
window.addEventListener('scroll', updateNavbarOnScroll);

// Mejor UX en mobile: si el menú se abre arriba de todo, forzá tema claro
if (collapse) {
  collapse.addEventListener('show.bs.collapse', () => {
    nav.classList.add('scrolled');
    nav.setAttribute('data-bs-theme', 'light');
  });
  collapse.addEventListener('hidden.bs.collapse', () => {
    // al cerrar, volvemos al estado que corresponda por scroll
    updateNavbarOnScroll();
  });
}

// (Opcional) back-to-top con smooth
if (toTop) {
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Back to top
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Swiper ejemplo (dejar comentado si aún no hay slider)
// const swiper = new Swiper('.swiper', { loop:true, autoplay:{delay:4000}, pagination:{el:'.swiper-pagination', clickable:true}, navigation:{nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'} });



