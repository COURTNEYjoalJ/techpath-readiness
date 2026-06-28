(function () {
  const reduceMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  if (reduceMotionQuery.matches || !("IntersectionObserver" in window)) {
    return;
  }

  const targetSelectors = [
    ".hero-text",
    ".hero-card",
    ".stats > div",
    ".section-heading",
    ".card",
    ".role-card",
    ".lesson-box",
    ".quiz-card",
    ".project-list > div",
    ".step",
    ".feedback-card",
    ".section-action",
    ".final-cta",
    ".guide-placeholder",
    ".skill-table-panel",
    ".readiness-panel",
    ".readiness-report-hero",
    ".readiness-report-section",
    ".readiness-skill-card",
    ".readiness-study-card",
    ".readiness-strong-card",
    ".readiness-day-card"
  ];

  const skipContainers = ".quiz-modal-overlay, .quiz-modal, .custom-dropdown-menu";
  const staggerableSelectors = [
    ".stats > div",
    ".card",
    ".role-card",
    ".project-list > div",
    ".step",
    ".readiness-skill-card",
    ".readiness-study-card",
    ".readiness-strong-card",
    ".readiness-day-card"
  ].join(", ");

  const revealSelector = targetSelectors.join(", ");
  const staggerStep = Number.parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--motion-stagger-step"),
    10
  ) || 70;
  let revealObserver;

  function shouldSkip(element) {
    return element.closest(skipContainers);
  }

  function getStaggerDelay(element) {
    if (!element.matches(staggerableSelectors) || !element.parentElement) {
      return 0;
    }

    const siblings = Array.from(element.parentElement.children).filter((child) => {
      return child.matches(staggerableSelectors) && !shouldSkip(child);
    });

    const index = Math.max(0, siblings.indexOf(element));
    return Math.min(index, 5) * staggerStep;
  }

  function showElement(element) {
    const delay = element.dataset.revealDelay || "0";

    if (delay !== "0") {
      element.style.setProperty("--reveal-delay", `${delay}ms`);
    }

    element.classList.add("reveal-visible");
  }

  function hideElement(element) {
    element.style.setProperty("--reveal-delay", "0ms");
    element.classList.remove("reveal-visible");
  }

  function registerElement(element) {
    if (element.dataset.revealBound || shouldSkip(element)) {
      return;
    }

    const delay = getStaggerDelay(element);

    element.dataset.revealBound = "true";
    element.dataset.revealDelay = String(delay);
    element.classList.add("reveal-on-scroll");

    revealObserver.observe(element);
  }

  function registerRevealTargets(root) {
    const elements = new Set();

    if (root.nodeType === Node.ELEMENT_NODE && root.matches(revealSelector)) {
      elements.add(root);
    }

    if (root.querySelectorAll) {
      root.querySelectorAll(revealSelector).forEach((element) => elements.add(element));
    }

    elements.forEach(registerElement);
  }

  function initScrollReveal() {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showElement(entry.target);
          } else {
            hideElement(entry.target);
          }
        });
      },
      {
        rootMargin: "-8% 0px -10% 0px",
        threshold: 0
      }
    );

    document.documentElement.classList.add("reveal-ready");
    registerRevealTargets(document);

    if ("MutationObserver" in window) {
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE || shouldSkip(node)) {
              return;
            }

            window.requestAnimationFrame(() => registerRevealTargets(node));
          });
        });
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
