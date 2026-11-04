/* Homepage enhancement only. Content stays visible if either library fails. */
(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger || !document.body.classList.contains('home-page')) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add({
    motion: '(prefers-reduced-motion: no-preference)',
    desktop: '(min-width: 801px) and (pointer: fine)'
  }, context => {
    if (!context.conditions.motion) return;
    const desktop = context.conditions.desktop;
    const distance = desktop ? 44 : 22;
    const active = new Map();
    const decorated = [];
    const tracks = [];

    // Animate only when entering the viewport: offscreen links remain readable
    // for keyboard navigation, deep links, printing and interrupted loading.
    const reveal = context.add('reveal', (elements, stagger = 0.08) => {
      elements = Array.from(elements);
      elements.forEach(el => { el.classList.add('motion-reveal'); decorated.push(el); });
      const tween = gsap.fromTo(elements,
        { opacity: 0.25, translate: `0 ${distance}px` },
        { opacity: 1, translate: '0 0', duration: 0.8, stagger,
          ease: 'power3.out', clearProps: 'opacity,translate',
          onComplete: () => elements.forEach(el => active.delete(el)) });
      elements.forEach(el => active.set(el, tween));
    });

    // Hero entrance is skipped for hash links and restored scroll positions.
    if (!location.hash && window.scrollY < 40) {
      reveal(document.querySelectorAll('.hero-text > *'), 0.12);
    }
    const singles = '.section-heading, .start-here-hub, .career-preview-lower, .feedback-card, .section-action, .final-cta, .quiz-card';
    document.querySelectorAll(singles).forEach(el => {
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true,
        onEnter: () => reveal([el]) });
    });
    // Batch cards that enter together, rather than delaying whole mobile grids.
    ScrollTrigger.batch('.stats > div, .home-process-card, .role-card, .cards > .card, .project-list > div, .step', {
      start: 'top 92%', once: true, interval: 0.08, batchMax: 3,
      onEnter: elements => reveal(elements, desktop ? 0.11 : 0.05)
    });

    document.querySelectorAll('.home-process-grid, .timeline').forEach(grid => {
      const track = document.createElement('div');
      track.className = 'motion-track';
      track.setAttribute('aria-hidden', 'true');
      grid.append(track);
      tracks.push(track);
      gsap.fromTo(track, { scaleX: 0 }, { scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: grid, start: 'top 82%', end: 'bottom 40%', scrub: 0.45 } });
    });

    // Reuse the current artwork. Desktop gets a richer scroll-linked orbit;
    // touch devices retain a static background and short entrances.
    if (desktop) {
      gsap.to(document.documentElement, {
        '--orbit-angle': '100deg', '--ambient-shift': '45px', ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.7 }
      });
      gsap.to('.hero h1 span', { x: 24, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
    }

    const onFocus = event => {
      active.forEach((tween, element) => {
        if (element.contains(event.target)) tween.progress(1);
      });
    };
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('focusin', onFocus);
      tracks.forEach(track => track.remove());
      decorated.forEach(el => el.classList.remove('motion-reveal'));
      active.clear();
    };
  });

  const refresh = () => ScrollTrigger.refresh();
  if (document.readyState === 'complete') refresh();
  else window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready.then(refresh);
  // A bfcache restore retains its contexts; an actual departure cleans up.
  window.addEventListener('pagehide', event => {
    if (!event.persisted) media.revert();
  });
  window.addEventListener('pageshow', event => { if (event.persisted) refresh(); });
})();
