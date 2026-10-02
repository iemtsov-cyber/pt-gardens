(() => {
  const body = document.body;
  const toggle = document.querySelector('[data-lang-toggle]');
  const header = document.querySelector('.site-header');
  const saved = localStorage.getItem('ptg-lang');
  const preferRussian = (navigator.language || '').toLowerCase().startsWith('ru');
  let lang = saved || (preferRussian ? 'ru' : 'en');

  const applyLanguage = () => {
    const isRu = lang === 'ru';
    body.classList.toggle('lang-ru', isRu);
    document.documentElement.lang = isRu ? 'ru' : 'en';
    toggle.textContent = isRu ? 'EN' : 'RU';
    toggle.setAttribute('aria-label', isRu ? 'Switch to English' : 'Переключить на русский');
    localStorage.setItem('ptg-lang', lang);
  };

  toggle?.addEventListener('click', () => {
    lang = lang === 'ru' ? 'en' : 'ru';
    applyLanguage();
  });
  applyLanguage();

  const setHeader = () => header?.classList.toggle('is-solid', window.scrollY > 40);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  const dialog = document.querySelector('[data-lightbox-dialog]');
  const dialogImage = document.querySelector('[data-lightbox-image]');
  const closeButton = dialog?.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () => {
      if (!dialog || !dialogImage) return;
      dialogImage.src = item.dataset.lightbox || '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });

  const closeDialog = () => {
    if (dialog?.open) dialog.close();
    if (dialogImage) dialogImage.src = '';
  };
  closeButton?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const inDialog = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inDialog) closeDialog();
  });
})();
