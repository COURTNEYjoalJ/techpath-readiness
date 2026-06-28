(function () {
  const reduceMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  let ticking = false;

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMochaBackground);
  } else {
    initMochaBackground();
  }
})();
