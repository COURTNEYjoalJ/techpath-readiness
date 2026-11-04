/* Shared, content-preserving motion for all standard site pages. */
(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger || document.body.classList.contains('portfolio-page')) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const paths = document.querySelector('#supported-paths .role-grid');
    const horizontal = gsap.matchMedia();
    horizontal.add('(min-width: 900px)', () => {
      if (!paths || paths.scrollWidth <= paths.clientWidth) return;
      const section = paths.closest('section');
      gsap.to(paths, { x: () => -(paths.scrollWidth - section.clientWidth + 40), ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top+=80', end: () => `+=${paths.scrollWidth}`, pin: true, scrub: .7, invalidateOnRefresh: true } });
    });
    const candidates = '.section-heading, .section > :first-child, .role-card, .card, .home-process-card, .service-card, .pricing-card, .step, .project-list > div, .lesson-box, .feedback-card, .readiness-panel, .readiness-report-section, .skill-table-panel';
    ScrollTrigger.batch(candidates, {
      start: 'top 92%', once: true, interval: .08, batchMax: 4,
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: .35, y: 22 },
        { autoAlpha: 1, y: 0, duration: .65, stagger: .08, ease: 'power2.out', clearProps: 'all' })
    });
    document.querySelectorAll('.site-header, .guide-hero, .learning-hero').forEach(hero => {
      gsap.fromTo(hero, { '--hero-motion': 0 }, { '--hero-motion': 1, duration: .65, ease: 'power2.out' });
    });
    document.addEventListener('pointerdown', press, { passive: true });
    function press(event) {
      const target = event.target.closest('button:not(.menu-btn), .btn, [role="button"]');
      if (target && !target.disabled) gsap.fromTo(target, { scale: .97 }, { scale: 1, duration: .35, ease: 'back.out(2)', overwrite: true });
    }
    return () => document.removeEventListener('pointerdown', press);
  });
  window.addEventListener('pagehide', event => { if (!event.persisted) mm.revert(); }, { once: true });
})();
