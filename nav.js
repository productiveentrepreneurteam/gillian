// Felix: local preview navigation only.
(() => {
  const navigation = document.querySelector('.site-nav');
  const cover = document.querySelector('.cover');
  const toggle = navigation.querySelector('.nav-toggle');
  const links = navigation.querySelector('.nav-links');
  const mobile = window.matchMedia('(max-width: 680px)');
  let navFrame;

  function setMenu(open, restoreFocus = false) {
    navigation.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (restoreFocus) toggle.focus();
  }

  function updateNavigation() {
    navigation.classList.toggle('is-scrolled', cover.getBoundingClientRect().bottom <= navigation.offsetHeight);
    navFrame = undefined;
  }

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobile.matches) setMenu(false, true);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setMenu(false, true);
    }
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target)) setMenu(false);
  });
  navigation.addEventListener('focusout', (event) => {
    if (!navigation.contains(event.relatedTarget)) setMenu(false);
  });
  mobile.addEventListener('change', () => {
    const active = document.activeElement;
    if (mobile.matches && links.contains(active)) setMenu(false, true);
    else {
      setMenu(false);
      if (!mobile.matches && active === toggle) links.querySelector('a').focus();
    }
  });
  window.addEventListener('scroll', () => {
    if (navFrame === undefined) navFrame = requestAnimationFrame(updateNavigation);
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('pageshow', () => {
    setMenu(false);
    updateNavigation();
  });

  if (window.lucide) window.lucide.createIcons();
  toggle.hidden = false;
  navigation.classList.add('has-menu');
  updateNavigation();
})();
