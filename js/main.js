/* ============================================================
   main.js — interactions + scroll animations
   ------------------------------------------------------------
   IMPORTANT: every animation here is driven by the scroll event
   + requestAnimationFrame (NOT IntersectionObserver). Some
   embedded/preview browsers throttle IntersectionObserver, which
   silently broke reveals/counters before. Scroll-driven logic
   runs anywhere the scroll bar does.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cached element collections (populated on init)
  var revealEls = [];
  var counterEls = [];
  var navLinks = [];
  var sections = [];
  var bar, hero, heroInner, showcase;
  var countersStarted = [];
  var workPanels = [];
  var workImgs = [];

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var links = document.querySelector(".nav__links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Counter animation (time-based; robust to frame throttling) ---------- */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target.toFixed(decimals) + suffix; return; }
    var dur = 1300, start = Date.now();
    var timer = setInterval(function () {
      var t = Math.min((Date.now() - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t >= 1) { el.textContent = target.toFixed(decimals) + suffix; clearInterval(timer); }
    }, 30);
  }

  /* ---------- Apple-style pinned showcase scrub ---------- */
  function updateShowcase() {
    if (!showcase) return;
    var steps = showcase.querySelectorAll(".showcase__step");
    var dots = showcase.querySelectorAll(".showcase__dot");
    var media = showcase.querySelector(".showcase__media");
    var rect = showcase.getBoundingClientRect();
    var scrollable = showcase.offsetHeight - window.innerHeight;
    var progress = clamp(-rect.top / (scrollable || 1), 0, 1);

    // Continuous media zoom + drift (Apple "scale up on scroll")
    if (media && !prefersReduced) {
      var scale = 0.9 + progress * 0.35;          // 0.90 -> 1.25
      var ty = (progress - 0.5) * -40;            // gentle vertical drift
      media.style.transform = "scale(" + scale.toFixed(4) + ") translateY(" + ty.toFixed(2) + "px)";
    }

    // Stepped caption crossfade
    var n = steps.length;
    if (n) {
      var idx = clamp(Math.floor(progress * n), 0, n - 1);
      for (var i = 0; i < n; i++) steps[i].classList.toggle("is-active", i === idx);
      for (var j = 0; j < dots.length; j++) dots[j].classList.toggle("is-active", j === idx);
    }
  }

  /* ---------- Main scroll update (one rAF-batched pass) ---------- */
  function update() {
    var vh = window.innerHeight;
    var doc = document.documentElement;
    var y = doc.scrollTop || window.scrollY || 0;

    // Progress bar
    if (bar) {
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }

    // Reveals — trigger when element's top rises above 88% of viewport
    for (var i = 0; i < revealEls.length; i++) {
      var el = revealEls[i];
      if (el.classList.contains("is-visible")) continue;
      if (el.getBoundingClientRect().top < vh * 0.88) el.classList.add("is-visible");
    }

    // Counters — start when ~85% up the viewport, run once
    for (var c = 0; c < counterEls.length; c++) {
      var ce = counterEls[c];
      if (countersStarted[c]) continue;
      if (ce.getBoundingClientRect().top < vh * 0.85) { countersStarted[c] = true; runCounter(ce); }
    }

    // Hero parallax
    if (heroInner && !prefersReduced && y < vh) {
      heroInner.style.transform = "translateY(" + y * 0.28 + "px)";
      heroInner.style.opacity = String(Math.max(1 - y / (vh * 0.8), 0));
    }

    // Scroll spy — active section is the one crossing the viewport middle
    if (navLinks.length && sections.length) {
      var mid = y + vh * 0.35;
      var activeId = null;
      for (var s = 0; s < sections.length; s++) {
        var sec = sections[s];
        var top = sec.offsetTop;
        if (mid >= top && mid < top + sec.offsetHeight) { activeId = sec.id; break; }
      }
      for (var l = 0; l < navLinks.length; l++) {
        navLinks[l].classList.toggle("is-active", navLinks[l].getAttribute("href") === "#" + activeId);
      }
    }

    // Apple-style showcase
    updateShowcase();

    // Selected Work — swap the sticky image to match the panel at viewport center
    if (workPanels.length) {
      var center = vh * 0.5;
      var activeW = 0;
      for (var wi = 0; wi < workPanels.length; wi++) {
        if (workPanels[wi].getBoundingClientRect().top <= center) activeW = wi;
      }
      for (var wj = 0; wj < workPanels.length; wj++) workPanels[wj].classList.toggle("is-active", wj === activeW);
      for (var wk = 0; wk < workImgs.length; wk++) workImgs[wk].classList.toggle("is-active", wk === activeW);
    }
  }

  // Run update() directly on scroll. update() is cheap (a short loop over a
  // handful of elements + a few style writes), and calling it synchronously
  // avoids depending on requestAnimationFrame, which some embedded/background
  // browser contexts throttle or pause.
  function onScroll() { update(); }

  /* ---------- Sticky navbar bg ---------- */
  function initNavScroll() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 20);
    }, { passive: true });
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  /* ---------- Init ---------- */
  function init() {
    // Always start at the top so reveals play as the user scrolls
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    bar = document.getElementById("scrollProgress");
    hero = document.getElementById("hero");
    heroInner = document.querySelector(".hero__inner");
    showcase = document.getElementById("showcase");
    revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    counterEls = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
    navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
    sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    workPanels = Array.prototype.slice.call(document.querySelectorAll(".work__panel"));
    workImgs = Array.prototype.slice.call(document.querySelectorAll(".work__frame .work__img"));

    if (prefersReduced) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      counterEls.forEach(function (el, i) { countersStarted[i] = true; runCounter(el); });
    }

    initNavScroll();
    initMobileMenu();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("load", function () { window.scrollTo(0, 0); update(); });

    // First paint + a follow-up pass (covers late layout / image load)
    update();
    window.requestAnimationFrame(update);
    setTimeout(update, 300);

    var yEl = document.getElementById("year");
    if (yEl) yEl.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
