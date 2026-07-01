(function () {
  const liquidPointerSelector = [
    ".tp-liquid-metal-link",
    ".tp-new-view-menu-button",
    ".tp-new-view-panel-link",
    ".tp-interactive-capsule",
    "a.tp-action-chrome-capsule",
    "button.tp-action-chrome-capsule",
    "[role='button'].tp-action-chrome-capsule",
    ".tp-metal-hover",
    ".custom-dropdown-trigger",
    ".custom-dropdown-menu button",
    ".quiz-modal-close",
    ".test-option",
    ".topic-choice-button",
    ".gcse-option-button",
    ".practice-answer-option",
    ".btn",
    ".card button",
    ".active-test-button",
    ".disabled-test-button",
    ".role-card-link",
    ".preview-steps a",
    ".preview-role-list a",
    ".preview-role-list button",
    ".preview-path-selector button",
    "button[data-preview-path]",
    ".guide-home-link",
    ".readiness-category-action",
    ".personalised-roadmap-action",
    ".path-card a",
    ".language-card a",
    ".lesson-card a",
    ".roadmap-card a",
    ".service-card a",
    ".pricing-card a",
    "button[class*='pill']",
    "a[class*='pill']",
    "button[class*='badge']",
    "a[class*='badge']",
    "button[class*='tag']",
    "a[class*='tag']"
  ].join(", ");
  const actionChromeCapsuleSelector = [
    ".tp-interactive-capsule",
    ".tp-liquid-metal-link",
    ".tp-new-view-panel-link",
    ".tp-new-view-menu-button",
    ".btn",
    ".card button",
    "a.btn",
    ".hero-actions a",
    ".final-cta a",
    ".feedback-card a.btn",
    ".role-card-link",
    ".path-card a",
    ".language-card a",
    ".lesson-card a",
    ".roadmap-card a",
    ".service-card a",
    ".pricing-card a",
    ".preview-steps a",
    ".preview-role-list a",
    ".preview-role-list button",
    "button[data-preview-path]",
    ".preview-path-button",
    ".guide-home-link",
    ".readiness-category-action",
    ".personalised-roadmap-action",
    ".active-test-button",
    ".disabled-test-button",
    ".topic-choice-button",
    ".practice-skill-button",
    ".quiz-next-button",
    ".quiz-retake-button",
    ".starter-quiz-button",
    ".gcse-secondary-button",
    ".quiz-modal-close",
    ".quiz-option",
    ".answer-option",
    ".choice-option",
    ".option-button",
    ".test-option",
    ".gcse-option-button",
    ".practice-answer-option",
    ".custom-dropdown-trigger",
    ".custom-dropdown-menu button"
  ].join(", ");
  const staticChromeCapsuleSelector = [
    ".future-status-pill",
    ".difficulty-badge",
    ".topic-status-pill",
    ".readiness-status-badge",
    ".personalised-roadmap-stage",
    ".readiness-category-status",
    ".readiness-label",
    ".package-price",
    ".tag",
    ".badge",
    ".pill",
    ".chip",
    ".status-badge",
    ".skill-tag",
    ".category-pill",
    ".roadmap-step",
    ".step-pill",
    "span[class*='pill']",
    "div[class*='pill']",
    "p[class*='pill']",
    "span[class*='badge']",
    "div[class*='badge']",
    "p[class*='badge']",
    "span[class*='tag']",
    ".section-eyebrow",
    ".eyebrow",
    ".section-label",
    ".status-label",
    ".preview-path-selector-label"
  ].join(", ");
  const actionChromeTextPattern = /\b(take readiness assessment|explore paths|open readiness dashboard|explore beta services|view|start|message|suggest|choose|follow|review|take tests)\b/i;
  const reduceMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  let ticking = false;
  let liquidPointerReady = false;
  let newViewNavPanelReady = false;

  function applyPermanentNewView() {
    document.documentElement.classList.add("tp-new-view");

    if (document.body) {
      document.body.classList.add("tp-new-view-body");
    }
  }

  applyPermanentNewView();

  function createBackground() {
    if (document.querySelector(".mocha-sapphire-bg")) {
      return;
    }

    const background = document.createElement("div");
    background.className = "mocha-sapphire-bg";
    background.setAttribute("aria-hidden", "true");
    background.innerHTML = `
      <span class="mocha-bg-layer mocha-bg-base"></span>
      <span class="mocha-bg-layer mocha-bg-glow"></span>
      <span class="mocha-bg-layer mocha-bg-wave-field">
        <span class="mocha-wave-strand sapphire-strand strand-one"></span>
        <span class="mocha-wave-strand sapphire-strand strand-two"></span>
        <span class="mocha-wave-strand sapphire-strand strand-three"></span>
        <span class="mocha-wave-strand sapphire-strand strand-four"></span>
        <span class="mocha-wave-strand sapphire-strand strand-five"></span>
        <span class="mocha-wave-strand sapphire-strand strand-six"></span>
        <span class="mocha-wave-strand sapphire-strand strand-seven"></span>
        <span class="mocha-wave-strand sapphire-strand strand-eight"></span>
        <span class="mocha-wave-strand sapphire-strand strand-nine"></span>
        <span class="mocha-wave-strand copper-strand copper-one"></span>
        <span class="mocha-wave-strand copper-strand copper-two"></span>
        <span class="mocha-wave-strand copper-strand copper-three"></span>
        <span class="mocha-wave-strand copper-strand copper-four"></span>
        <span class="mocha-wave-strand copper-strand copper-five"></span>
        <span class="mocha-wave-strand copper-strand copper-six"></span>
      </span>
      <span class="mocha-bg-layer mocha-bg-grain"></span>
      <span class="mocha-bg-layer mocha-bg-vignette"></span>
    `;

    document.body.insertBefore(background, document.body.firstChild);
  }

  function updateScrollVars() {
    ticking = false;

    if (reduceMotionQuery.matches) {
      document.documentElement.style.setProperty("--bg-scroll-x", "0px");
      document.documentElement.style.setProperty("--bg-scroll-y", "0px");
      document.documentElement.style.setProperty("--bg-scroll-x-soft", "0px");
      document.documentElement.style.setProperty("--bg-scroll-y-soft", "0px");
      document.documentElement.style.setProperty("--bg-glow-opacity", "0.9");
      document.documentElement.style.setProperty("--parallax-soft", "0px");
      document.documentElement.style.setProperty("--parallax-medium", "0px");
      document.documentElement.style.setProperty("--parallax-wave", "0px");
      return;
    }

    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, scrollTop / scrollable));
    const glow = 0.86 + Math.sin(progress * Math.PI) * 0.1;

    document.documentElement.style.setProperty("--bg-scroll-x", `${(-scrollTop * 0.045).toFixed(2)}px`);
    document.documentElement.style.setProperty("--bg-scroll-y", `${(scrollTop * 0.022).toFixed(2)}px`);
    document.documentElement.style.setProperty("--bg-scroll-x-soft", `${(scrollTop * 0.024).toFixed(2)}px`);
    document.documentElement.style.setProperty("--bg-scroll-y-soft", `${(-scrollTop * 0.014).toFixed(2)}px`);
    document.documentElement.style.setProperty("--bg-glow-opacity", glow.toFixed(3));
    document.documentElement.style.setProperty("--parallax-soft", `${(-scrollTop * 0.006).toFixed(2)}px`);
    document.documentElement.style.setProperty("--parallax-medium", `${(-scrollTop * 0.011).toFixed(2)}px`);
    document.documentElement.style.setProperty("--parallax-wave", `${(scrollTop * 0.018).toFixed(2)}px`);
  }

  function requestUpdate() {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateScrollVars);
  }

  function initMochaBackground() {
    createBackground();
    updateScrollVars();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    if (reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener("change", requestUpdate);
    }
  }

  function getNewViewNavParts() {
    return {
      button: document.querySelector("[data-new-view-menu-button]"),
      panel: document.querySelector("[data-new-view-nav-panel]")
    };
  }

  function setNewViewNavOpen(isOpen) {
    const { button, panel } = getNewViewNavParts();

    document.documentElement.classList.toggle("tp-nav-open", isOpen);

    if (document.body) {
      document.body.classList.toggle("tp-nav-open", isOpen);
    }

    if (button) {
      const icon = button.querySelector("[data-new-view-menu-icon]");
      const label = button.querySelector("[data-new-view-menu-label]");

      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

      if (icon) {
        icon.textContent = isOpen ? "\u00d7" : "\u2630";
      }

      if (label) {
        label.textContent = isOpen ? "Close" : "Menu";
      }
    }

    if (panel) {
      panel.hidden = !isOpen;
    }
  }

  function getComparableUrl(url) {
    return `${url.origin}${url.pathname.replace(/\/index\.html$/, "/")}`;
  }

  function initTechPathPageLinks() {
    const currentUrl = new URL(window.location.href);
    const currentComparable = getComparableUrl(currentUrl);
    const currentHash = currentUrl.hash;

    document.querySelectorAll(".site-header .nav a[href]").forEach((link) => {
      if (link.classList.contains("brand")) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let linkUrl;

      try {
        linkUrl = new URL(href, window.location.href);
      } catch (error) {
        return;
      }

      if (linkUrl.origin !== currentUrl.origin) {
        return;
      }

      link.classList.add("tp-page-link", "tp-liquid-metal-link");

      const samePage = getComparableUrl(linkUrl) === currentComparable;
      const sameHash = linkUrl.hash && linkUrl.hash === currentHash;
      const pageOnlyMatch = samePage && !linkUrl.hash && !currentHash;

      if (sameHash || pageOnlyMatch) {
        link.classList.add("tp-current-page-link");
        link.setAttribute("aria-current", linkUrl.hash ? "location" : "page");
      }
    });
  }

  function buildNewViewPanelLink(sourceLink) {
    const link = document.createElement("a");

    link.className = "tp-new-view-panel-link tp-liquid-metal-link";
    link.href = sourceLink.getAttribute("href") || "#";
    link.textContent = sourceLink.textContent.trim();

    if (sourceLink.classList.contains("tp-current-page-link")) {
      link.classList.add("tp-current-page-link");
      link.setAttribute("aria-current", sourceLink.getAttribute("aria-current") || "page");
    }

    link.addEventListener("click", () => {
      setNewViewNavOpen(false);
    });

    return link;
  }

  function getNewViewPanelSide(link) {
    const label = link.textContent.trim().toLowerCase();

    if (["career paths", "languages", "roadmap"].includes(label)) {
      return "left";
    }

    if (["projects", "quiz", "business", "career guide"].includes(label)) {
      return "right";
    }

    return "";
  }

  function buildNewViewNavBrand(sourceBrand) {
    const brand = document.createElement("div");
    const logo = sourceBrand ? sourceBrand.querySelector(".site-logo-image") : null;
    const label = document.createElement("span");

    brand.className = "tp-new-view-nav-brand";

    if (logo) {
      const logoClone = logo.cloneNode(true);
      logoClone.removeAttribute("class");
      logoClone.className = "tp-new-view-nav-logo";
      brand.appendChild(logoClone);
    }

    label.textContent = "TechPathReady";
    brand.appendChild(label);

    return brand;
  }

  function initTechPathNewViewNavPanel() {
    const nav = document.querySelector(".site-header .nav");

    if (!nav || newViewNavPanelReady) {
      return;
    }

    newViewNavPanelReady = true;
    nav.classList.add("tp-new-view-nav-shell");

    const menuButton = document.createElement("button");
    menuButton.className = "tp-new-view-menu-button";
    menuButton.type = "button";
    menuButton.dataset.newViewMenuButton = "true";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "tp-new-view-nav-panel");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.innerHTML = '<span class="tp-menu-icon" data-new-view-menu-icon aria-hidden="true">&#9776;</span><span data-new-view-menu-label>Menu</span>';

    nav.appendChild(menuButton);

    const panel = document.createElement("div");
    const leftLinks = document.createElement("div");
    const rightLinks = document.createElement("div");
    const fallbackLinks = [];
    panel.id = "tp-new-view-nav-panel";
    panel.className = "tp-new-view-nav-panel";
    panel.dataset.newViewNavPanel = "true";
    panel.hidden = true;

    leftLinks.className = "tp-new-view-nav-links tp-new-view-nav-left";
    rightLinks.className = "tp-new-view-nav-links tp-new-view-nav-right";

    nav.querySelectorAll("a[href]").forEach((link) => {
      if (link.classList.contains("brand")) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let linkUrl;

      try {
        linkUrl = new URL(href, window.location.href);
      } catch (error) {
        return;
      }

      if (linkUrl.origin !== window.location.origin) {
        return;
      }

      fallbackLinks.push({
        element: buildNewViewPanelLink(link),
        side: getNewViewPanelSide(link)
      });
    });

    fallbackLinks.forEach((item, index) => {
      if (item.side === "left") {
        leftLinks.appendChild(item.element);
        return;
      }

      if (item.side === "right") {
        rightLinks.appendChild(item.element);
        return;
      }

      if (index < Math.ceil(fallbackLinks.length / 2)) {
        leftLinks.appendChild(item.element);
      } else {
        rightLinks.appendChild(item.element);
      }
    });

    panel.appendChild(leftLinks);
    panel.appendChild(buildNewViewNavBrand(nav.querySelector(".brand")));
    panel.appendChild(rightLinks);
    document.body.appendChild(panel);

    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = document.documentElement.classList.contains("tp-nav-open");
      setNewViewNavOpen(!isOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setNewViewNavOpen(false);
      }
    });

    document.addEventListener("click", (event) => {
      if (!document.documentElement.classList.contains("tp-nav-open")) {
        return;
      }

      const { button, panel: currentPanel } = getNewViewNavParts();
      const shell = button
        ? button.closest(".tp-new-view-nav-shell")
        : document.querySelector(".tp-new-view-nav-shell");
      if (
        (button && button.contains(event.target)) ||
        (currentPanel && currentPanel.contains(event.target)) ||
        (shell && shell.contains(event.target))
      ) {
        return;
      }

      setNewViewNavOpen(false);
    });
  }

  function updateNavSpotlight(nav, clientX, clientY, opacity) {
    const rect = nav.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    nav.style.setProperty("--tp-spotlight-x", `${x.toFixed(2)}%`);
    nav.style.setProperty("--tp-spotlight-y", `${y.toFixed(2)}%`);
    nav.style.setProperty("--tp-spotlight-opacity", String(opacity));
  }

  function initTechPathSpotlightNav() {
    document.querySelectorAll(".site-header .nav").forEach((nav) => {
      if (nav.dataset.techpathSpotlightReady === "true") {
        return;
      }

      nav.dataset.techpathSpotlightReady = "true";
      nav.style.setProperty("--tp-spotlight-x", "50%");
      nav.style.setProperty("--tp-spotlight-y", "50%");
      nav.style.setProperty("--tp-spotlight-opacity", "0");

      nav.addEventListener("pointermove", (event) => {
        if (reduceMotionQuery.matches) {
          return;
        }

        updateNavSpotlight(nav, event.clientX, event.clientY, 1);
      });

      nav.addEventListener("pointerleave", () => {
        nav.style.setProperty("--tp-spotlight-opacity", "0");
      });

      nav.addEventListener("focusin", (event) => {
        if (!event.target || !event.target.classList || !event.target.classList.contains("tp-page-link")) {
          return;
        }

        const rect = event.target.getBoundingClientRect();
        updateNavSpotlight(nav, rect.left + rect.width / 2, rect.top + rect.height / 2, 0.72);
      });

      nav.addEventListener("focusout", () => {
        nav.style.setProperty("--tp-spotlight-opacity", "0");
      });
    });
  }

  function updateLiquidPointer(element, clientX, clientY) {
    const rect = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    element.style.setProperty("--tp-glow-x", `${x.toFixed(1)}px`);
    element.style.setProperty("--tp-glow-y", `${y.toFixed(1)}px`);
  }

  function initTechPathLiquidPointer() {
    if (liquidPointerReady) {
      return;
    }

    liquidPointerReady = true;

    document.addEventListener("pointermove", (event) => {
      if (reduceMotionQuery.matches || !document.documentElement.classList.contains("tp-new-view")) {
        return;
      }

      const target = event.target && event.target.closest
        ? event.target.closest(liquidPointerSelector)
        : null;

      if (!target || !document.documentElement.contains(target)) {
        return;
      }

      updateLiquidPointer(target, event.clientX, event.clientY);
    }, { passive: true });
  }

  function isInteractiveCapsuleElement(element) {
    if (!element || element.nodeType !== 1) {
      return false;
    }

    const tagName = element.tagName.toLowerCase();
    const inputType = tagName === "input"
      ? (element.getAttribute("type") || "").toLowerCase()
      : "";
    const role = (element.getAttribute("role") || "").toLowerCase();

    return (
      (tagName === "a" && element.hasAttribute("href")) ||
      tagName === "button" ||
      ["button", "submit", "reset", "radio", "checkbox"].includes(inputType) ||
      ["button", "link", "menuitem", "option", "radio", "checkbox", "tab"].includes(role) ||
      element.hasAttribute("onclick") ||
      element.matches(
        "[data-new-view-menu-button], [data-preview-path], .quiz-option, .answer-option, .test-option, .choice-option, .option-button, .gcse-option-button, .practice-answer-option, .custom-dropdown-trigger, .quiz-modal-close, .active-test-button, .disabled-test-button, .topic-choice-button, .practice-skill-button, .quiz-next-button, .quiz-retake-button, .starter-quiz-button, .gcse-secondary-button"
      )
    );
  }

  function markInteractiveCapsule(element) {
    element.classList.add("tp-action-chrome-capsule", "tp-interactive-capsule");
    element.classList.remove("tp-static-capsule");
  }

  function markStaticCapsule(element) {
    element.classList.add("tp-static-capsule");
    element.classList.remove("tp-action-chrome-capsule", "tp-interactive-capsule");
  }

  function initTechPathActionChromeCapsules() {
    document.querySelectorAll(actionChromeCapsuleSelector).forEach((element) => {
      if (
        element.closest(".tp-new-view-nav-panel, .tp-new-view-nav-links, .tp-new-view-nav-brand") &&
        !element.matches(".tp-new-view-panel-link")
      ) {
        return;
      }

      if (isInteractiveCapsuleElement(element)) {
        markInteractiveCapsule(element);
      } else {
        markStaticCapsule(element);
      }
    });

    document.querySelectorAll("a, button").forEach((element) => {
      if (element.classList.contains("tp-action-chrome-capsule")) {
        return;
      }

      if (
        element.closest(".tp-new-view-nav-panel, .tp-new-view-nav-links, .tp-new-view-nav-brand") &&
        !element.matches(".tp-new-view-panel-link")
      ) {
        return;
      }

      if (
        element.closest(".card, .hero-actions, .final-cta, .feedback-card, .path-card, .language-card, .lesson-card, .roadmap-card, .service-card, .pricing-card, .preview-steps, .preview-path-selector, .readiness-dashboard-page, .guide-page, .quiz-card, .test-options, .gcse-answer-options") &&
        actionChromeTextPattern.test(element.textContent.trim())
      ) {
        markInteractiveCapsule(element);
      }
    });

    document.querySelectorAll(staticChromeCapsuleSelector).forEach((element) => {
      if (
        element.closest(".tp-new-view-nav-panel, .tp-new-view-nav-links, .tp-new-view-nav-brand") &&
        !element.matches(".tp-new-view-panel-link")
      ) {
        return;
      }

      if (isInteractiveCapsuleElement(element)) {
        markInteractiveCapsule(element);
      } else {
        markStaticCapsule(element);
      }
    });
  }

  function initTechPathNewViewUi() {
    applyPermanentNewView();
    initTechPathPageLinks();
    initTechPathNewViewNavPanel();
    initTechPathSpotlightNav();
    initTechPathActionChromeCapsules();
    initTechPathLiquidPointer();
  }

  function initTechPathSharedEffects() {
    initMochaBackground();
    initTechPathNewViewUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTechPathSharedEffects);
  } else {
    initTechPathSharedEffects();
  }
})();
