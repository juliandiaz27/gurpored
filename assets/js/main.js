
// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// AOS init
AOS.init({
  once: true,
  duration: 700,
  easing: 'ease-out-cubic'
});

// GSAP: split simple por palabras y animación
function splitWords(el){
  const text = el.innerHTML;
  const words = text.split(/\s+/);
  el.innerHTML = words.map(w => `<span class="word d-inline-block overflow-hidden"><span class="inner d-inline-block">${w}</span></span>`).join(' ');
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

// Sticky active links (ScrollSpy ya está en body via data-attrs)
const nav = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  nav.classList.toggle('shadow-sm', y > 2);
  // botón toTop
  const toTop = document.getElementById('toTop');
  if(y > 600){ toTop.style.display = 'block'; } else { toTop.style.display = 'none'; }
  lastScroll = y;
});

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



// Carousel continuo, sin flechas ni puntos
const softSwiper = new Swiper('.soft-swiper', {
  loop: true,
  slidesPerView: 1,
  allowTouchMove: false,          // sin interacción del usuario
  speed: 12000,                   // 12s por transición (ajustá “suavidad”)
  autoplay: {
    delay: 0,                     // empieza de inmediato
    disableOnInteraction: false,
    // pauseOnMouseEnter: true,   // descomentá si querés pausar al hover
  },
  // sin pagination ni navigation
  loopAdditionalSlides: 3,        // ayuda a que el loop sea más suave
});
// Carrusel continuo de 3 imágenes, sin flechas ni puntos
const softSwiperThree = new Swiper('.soft-swiper.three', {
  loop: true,
  allowTouchMove: false,          // sin interacción
  speed: 2000,                   // más grande = más lento (ms por “paso”)
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,      // si querés que pare al hover
  },
  slidesPerView: 3,
  spaceBetween: 24,               // separación entre imágenes
  breakpoints: {
    0:   { slidesPerView: 1.1, spaceBetween: 12 },
    576: { slidesPerView: 2,   spaceBetween: 16 },
    992: { slidesPerView: 3,   spaceBetween: 24 },
  },
  loopAdditionalSlides: 6,        // hace el loop más suave
});
// Rellena la tira clonando slides hasta un mínimo (evita huecos en el loop)
function fillSlides(selector, minSlides = 12) {
  const wrapper = document.querySelector(`${selector} .swiper-wrapper`);
  if (!wrapper) return 0;
  const originals = [...wrapper.children];
  while (wrapper.children.length < minSlides) {
    originals.forEach(slide => wrapper.appendChild(slide.cloneNode(true)));
  }
  return wrapper.children.length;
}

function initSoftSwiperThree() {
  // 1) Aseguramos cantidad suficiente de slides
  const total = fillSlides('.soft-swiper.three', 12); // probá 12–16 si querés más margen

  // 2) Iniciamos Swiper con loop suave continuo
  return new Swiper('.soft-swiper.three', {
    loop: true,
    allowTouchMove: false,
    speed: 20000, // más grande = más lento
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: 3,
    spaceBetween: 24,
    // clave: darle a Swiper muchas copias internas
    loopedSlides: total,
    loopAdditionalSlides: total,
    watchSlidesProgress: true,
    breakpoints: {
      0:   { slidesPerView: 1.1, spaceBetween: 12 },
      576: { slidesPerView: 2,   spaceBetween: 16 },
      992: { slidesPerView: 3,   spaceBetween: 24 },
    },
  });
}

// Esperamos a que carguen las imágenes para evitar medir mal anchos
document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.soft-swiper.three img');
  let loaded = 0;
  const done = () => initSoftSwiperThree();

  if (imgs.length === 0) return done();
  imgs.forEach(img => {
    if (img.complete) {
      if (++loaded === imgs.length) done();
    } else {
      img.addEventListener('load', () => {
        if (++loaded === imgs.length) done();
      }, { once: true });
    }
  });
});
