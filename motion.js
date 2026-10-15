// Larry: reveal once on entry; content remains visible if motion is unavailable.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const seen = new WeakSet();
  const active = new Set();
  let logosObserved = false;
  function play(element, frames, options) {
    const animation = element.animate(frames, options);
    active.add(animation);
    animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (preference.matches || document.visibilityState !== 'visible') return;
      if (entry.target.classList.contains('publications')) {
        entry.target.querySelectorAll('.publication-logo').forEach((logo, index) => play(
          logo, [{opacity:.15},{opacity:1}],
          {duration:520,delay:index*45,easing:'ease-out',fill:'none'}
        ));
      } else if (entry.target.matches('.portrait,.approach-grid > figure')) play(
          entry.target,
          [{opacity:.15,clipPath:'inset(0 0 12% 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],
          {duration:680,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'}
        );
      else if (entry.target.matches('.process-photo-story > figure')) {
        const index = Number(entry.target.querySelector('figcaption')?.textContent) || 1;
        play(entry.target,
          [{opacity:.15,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:600,delay:(index-1)*70,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'}
        );
      } else play(
          entry.target,
          [{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:620,easing:'cubic-bezier(.2,.65,.3,1)',fill:'none'}
        );
    });
  }, {threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  function observe() {
    document.querySelectorAll('.portrait,.intro-copy,.process-heading-stack,.process-photo-story figure,.steps .step,.story-spread blockquote,.approach>h2,.approach-grid>*,.legacy,.footer-scene h2,.footer-utility,.study-step,.collection-visual').forEach(element => {
      if (seen.has(element)) return;
      seen.add(element);
      if (!preference.matches) observer.observe(element);
    });
  }
  function observeLogosOnScroll() {
    if (logosObserved || preference.matches || scrollY < 12) return;
    const strip = document.querySelector('.publications');
    if (!strip) return;
    logosObserved = true;
    observer.observe(strip);
    window.removeEventListener('scroll', observeLogosOnScroll);
  }
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer.disconnect();
    window.removeEventListener('scroll', observeLogosOnScroll);
    active.forEach(animation => animation.cancel());
    active.clear();
  });
  document.addEventListener('layouts-ready', observe);
  observe();
  if (!preference.matches && document.querySelector('.publications')) {
    window.addEventListener('scroll', observeLogosOnScroll, {passive:true});
    observeLogosOnScroll();
  }
})();
