(function() {
  "use strict"; // Ejecuta el script en modo estricto, lo que ayuda a evitar errores comunes

  /**
   * Aplica la clase .scrolled al <body> cuando la página se ha desplazado hacia abajo.
   */
  function toggleScrolled() {
    // Selecciona el elemento <body> y el encabezado (header) con id "header"
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    // Si el header no tiene ninguna de estas clases de posición (scroll-up-sticky, sticky-top, fixed-top), no hace nada.
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    )
      return;
    // Si la posición vertical de la ventana supera 100 píxeles, agrega la clase 'scrolled' al <body>;
    // de lo contrario, la remueve.
    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  // Asocia la función toggleScrolled al evento 'scroll' y a la carga completa de la página.
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Controla el botón del menú móvil para mostrar u ocultar la navegación.
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  
  function mobileNavToogle() {
    // Alterna (toggle) la clase "mobile-nav-active" en el <body>
    document.querySelector('body').classList.toggle('mobile-nav-active');
    // Alterna los íconos del botón (de "bi-list" a "bi-x" y viceversa)
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  // Asocia el click del botón del menú móvil a la función mobileNavToogle
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Oculta el menú móvil cuando se hace clic en un enlace del menú (hash o misma página).
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      // Si el <body> tiene la clase que indica que el menú móvil está activo, la quita.
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Alterna los dropdowns (submenús) en el menú móvil.
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault(); // Previene la acción predeterminada del enlace
      // Alterna la clase "active" en el elemento padre (que contiene el dropdown)
      this.parentNode.classList.toggle('active');
      // Alterna la clase "dropdown-active" en el siguiente elemento hermano (el submenú real)
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation(); // Detiene que otros manejadores en la cadena de eventos se ejecuten
    });
  });

  /**
   * Preloader: Remueve el preloader cuando la página se ha cargado completamente.
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove(); // Elimina el elemento del DOM una vez que la página se haya cargado
    });
  }

  /**
   * Botón "Scroll Top": Muestra u oculta el botón para regresar al inicio según el scroll.
   */
  let scrollTop = document.querySelector('.scroll-top');
  
  function toggleScrollTop() {
    if (scrollTop) {
      // Si el desplazamiento vertical es mayor a 100 píxeles, muestra el botón agregando la clase 'active'
      // Si no, lo oculta removiendo la clase 'active'
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }
  // Al hacer clic en el botón, se evita la acción predeterminada y se realiza un scroll suave hasta la parte superior
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  // Se ejecuta la función toggleScrollTop al cargar la página y al hacer scroll
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Función de inicialización de animaciones AOS (Animate On Scroll).
   */
  function aosInit() {
    AOS.init({
      duration: 600,        // Duración de las animaciones en milisegundos
      easing: 'ease-in-out',// Tipo de animación: entrada y salida suave
      once: true,           // Cada animación se ejecuta sólo una vez
      mirror: false         // No anima al hacer scroll hacia atrás
    });
  }
  // Inicializa AOS cuando la página haya cargado
  window.addEventListener('load', aosInit);

  /**
   * Inicia el glightbox para mostrar imágenes y vídeos en un lightbox.
   */
  const glightbox = GLightbox({
    selector: '.glightbox' // Selecciona todos los elementos que tengan la clase "glightbox"
  });

  /**
   * Inicializa la disposición y filtros de elementos con Isotope.js.
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    // Obtiene la configuración del layout de Isotope (masonry por defecto)
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    // Obtiene el filtro por defecto ("*" significa mostrar todos)
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    // Obtiene el método de ordenamiento ("original-order" por defecto)
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    // Se asegura de que todas las imágenes se hayan cargado antes de inicializar Isotope
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item', // Selector de los elementos a disponer
        layoutMode: layout,            // Modo de disposición (por ejemplo, "masonry")
        filter: filter,                // Filtro inicial para mostrar elementos
        sortBy: sort                   // Método de ordenamiento de los elementos
      });
    });

    // Añade eventos de clic para los filtros de Isotope
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        // Quita la clase 'filter-active' del filtro previamente activo
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        // Asigna la clase 'filter-active' al filtro clicado
        this.classList.add('filter-active');
        // Reorganiza los elementos según el filtro seleccionado
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        // Reinicializa las animaciones AOS, en caso de ser necesario
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Inicializa los sliders de Swiper.
   */
  function initSwiper() {
    // Selecciona todos los elementos con la clase "init-swiper"
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      // Obtiene la configuración en formato JSON del slider que está en un elemento .swiper-config dentro del swiperElement
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      // Si el elemento tiene la clase "swiper-tab", se inicializa con una función personalizada
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        // De lo contrario, se crea una nueva instancia de Swiper utilizando la configuración
        new Swiper(swiperElement, config);
      }
    });
  }

  // Inicializa los sliders Swiper cuando la página se haya cargado completamente
  window.addEventListener("load", initSwiper);

  /**
   * Inicia el contador animado utilizando PureCounter.
   */
  new PureCounter();

})();
