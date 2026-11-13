(() => {
  'use strict';

  // 1. Respeito ao prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 2. Menu Mobile
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.site-nav__link');

  if (navToggle && siteNav) {
    const toggleMenu = (open) => {
      const willOpen = open !== undefined ? open : !siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open', willOpen);
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navToggle.setAttribute('aria-label', willOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
      navToggle.textContent = willOpen ? '✕' : '☰';
    };

    navToggle.addEventListener('click', () => toggleMenu());

    navLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });
  }

  // 3. Barra de Progresso de Leitura Superior
  const progressBar = document.getElementById('readingProgressBar');
  const updateProgress = () => {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const scrolled = (window.scrollY / docHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
  };

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        updateActiveSection();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // 4. Scroll-Spy no Menu e Contador (01 / 10)
  const trackedSections = [
    { id: 'capa', index: '01' },
    { id: 'sumario', index: '02' },
    { id: 'editorial-1', index: '03' },
    { id: 'contexto-1', index: '04' },
    { id: 'reportagem-1', index: '05' },
    { id: 'direito-1', index: '06' },
    { id: 'subemprego', index: '07' },
    { id: 'intervencao', index: '08' },
    { id: 'expediente', index: '09' },
    { id: 'referencias', index: '10' }
  ];

  const header = document.querySelector('.site-header');
  const counter = document.getElementById('readingCounter');
  const sectionElements = trackedSections
    .map((s) => ({ element: document.getElementById(s.id), index: s.index, id: s.id }))
    .filter((s) => s.element !== null);

  const setActiveSection = (activeItem) => {
    if (!activeItem) return;
    if (counter) {
      counter.textContent = `${activeItem.index} / 10`;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeItem.id}`) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (header) {
      const isDark = activeItem.element.classList.contains('site-dark') || activeItem.element.classList.contains('page-dark');
      header.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  };
  const updateActiveSection = () => {
    const scrollPos = window.scrollY + 120;
    let current = sectionElements[0];
    for (let i = 0; i < sectionElements.length; i++) {
      const el = sectionElements[i].element;
      if (el && el.offsetTop <= scrollPos) {
        current = sectionElements[i];
      }
    }
    setActiveSection(current);
  };

  updateProgress();
  updateActiveSection();

  // 5. Lightbox Acessível para os Gráficos (<dialog>)
  const dialog = document.getElementById('chartDialog');
  const dialogContent = document.getElementById('chartDialogContent');
  const dialogCaption = document.getElementById('chartDialogCaption');
  const dialogClose = document.getElementById('chartDialogClose');
  let lastFocusedTrigger = null;

  if (dialog && dialogContent && dialogClose) {
    const closeDialog = () => {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
      dialogContent.replaceChildren();
      if (lastFocusedTrigger && lastFocusedTrigger.isConnected) {
        lastFocusedTrigger.focus();
      }
    };

    dialogClose.addEventListener('click', closeDialog);
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeDialog();
    });
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeDialog();
    });

    document.querySelectorAll('.chart-zoom-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('figure.chart, .chart-card, figure');
        if (!card) return;

        lastFocusedTrigger = btn;
        const enlarged = card.cloneNode(true);
        enlarged.classList.remove('abs');
        enlarged.removeAttribute('aria-labelledby');
        enlarged.querySelector('.chart-zoom-btn')?.remove();
        const donutCenter = enlarged.querySelector('.chart-donut-center');
        const donutItems = [...enlarged.querySelectorAll('.chart-legend-item')];
        if (donutCenter) {
          const selectDonutItem = (item) => {
            donutItems.forEach((button) => button.classList.toggle('is-active', button === item));
            donutCenter.querySelector('strong').textContent = item.dataset.value;
            donutCenter.querySelector('span').textContent = item.dataset.label;
          };
          donutItems.forEach((item) => {
            item.addEventListener('mouseenter', () => selectDonutItem(item));
            item.addEventListener('focus', () => selectDonutItem(item));
            item.addEventListener('click', () => selectDonutItem(item));
          });
        }
        dialogContent.replaceChildren(enlarged);
        if (dialogCaption) {
          dialogCaption.textContent = card.querySelector('.chart-heading strong')?.textContent || '';
        }

        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
          dialogClose.focus();
        }
      });
    });
  }

  // 6. Botão Voltar ao Topo
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });
      const capa = document.getElementById('capa');
      if (capa) capa.focus();
    });
  }

  // 7. Filtro Rápido de Referências Bibliográficas
  const refFilterInput = document.getElementById('refFilterInput');
  const refItems = document.querySelectorAll('.references-list p');

  if (refFilterInput && refItems.length > 0) {
    refFilterInput.addEventListener('input', () => {
      const term = refFilterInput.value.toLowerCase().trim();
      refItems.forEach((p) => {
        if (!term) {
          p.style.display = '';
        } else {
          const match = p.textContent.toLowerCase().includes(term);
          p.style.display = match ? '' : 'none';
        }
      });
    });
  }
})();
