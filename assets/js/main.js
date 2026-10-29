/* =========================================================
   Syed Abdul Kadar P — Portfolio
   Vanilla JS: nav, scroll reveal, filters, case dialogs
   ========================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const nav = document.getElementById("primaryNav");
  const navToggle = document.getElementById("navToggle");

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(() => entry.target.classList.add("is-visible"), delay);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Scroll spy ---------- */
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === id;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Stat count-up ---------- */
  const statNums = Array.from(document.querySelectorAll(".stat-num[data-count]"));

  const animateStat = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || prefersReducedMotion) return;
    const duration = 1100;
    const start = performance.now();
    const pad = (value) => String(value).padStart(2, "0");

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = pad(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    el.textContent = "00";
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && statNums.length && !prefersReducedMotion) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    statNums.forEach((el) => statObserver.observe(el));
  }

  /* ---------- Project filters ---------- */
  const filterButtons = Array.from(document.querySelectorAll(".filter"));
  const projectCards = Array.from(document.querySelectorAll("#projectsGrid .project"));
  const emptyState = document.getElementById("projectsEmpty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });

      let visible = 0;
      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) {
          visible += 1;
          card.classList.add("is-visible");
        }
      });

      if (emptyState) emptyState.hidden = visible !== 0;
    });
  });

  /* ---------- Case study dialog ---------- */
  const dialog = document.getElementById("caseDialog");
  const dialogContent = document.getElementById("caseContent");
  const dialogClose = document.getElementById("caseClose");
  const researchRows = Array.from(document.querySelectorAll(".research-row"));

  let lastTrigger = null;

  const openCase = (trigger) => {
    if (!dialog || !dialogContent) return;
    const caseId = trigger.dataset.case;
    const template = document.getElementById("case-" + caseId);
    if (!template) return;

    lastTrigger = trigger;
    dialogContent.replaceChildren(template.content.cloneNode(true));

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    document.body.classList.add("dialog-open");

    const heading = dialogContent.querySelector(".case-header h2");
    if (heading) {
      heading.setAttribute("id", "caseTitle");
    }

    const scrollBox = dialog.querySelector(".case-dialog-inner");
    if (scrollBox) scrollBox.scrollTop = 0;
  };

  const closeCase = () => {
    if (!dialog || !dialog.open) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  };

  researchRows.forEach((row) => {
    row.addEventListener("click", () => openCase(row));
  });

  if (dialog) {
    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
      if (dialogContent) dialogContent.replaceChildren();
      if (lastTrigger) lastTrigger.focus();
    });

    /* click outside the panel closes the modal */
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeCase();
    });
  }

  if (dialogClose) {
    dialogClose.addEventListener("click", closeCase);
  }

  /* ---------- Copy email ---------- */
  const copyButton = document.getElementById("copyEmail");

  if (copyButton) {
    const copyLabel = copyButton.querySelector("span");
    const originalLabel = copyLabel ? copyLabel.textContent : "Copy email";

    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.email || "";
      try {
        await navigator.clipboard.writeText(email);
        if (copyLabel) copyLabel.textContent = "Copied ✓";
      } catch (error) {
        /* fallback for non-secure contexts */
        const input = document.createElement("textarea");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand("copy");
          if (copyLabel) copyLabel.textContent = "Copied ✓";
        } catch (fallbackError) {
          if (copyLabel) copyLabel.textContent = email;
        }
        document.body.removeChild(input);
      }

      window.setTimeout(() => {
        if (copyLabel) copyLabel.textContent = originalLabel;
      }, 2000);
    });
  }

  /* ---------- Subtle parallax glow on hero panel ---------- */
  const heroPanel = document.querySelector(".hero-panel");

  if (heroPanel && window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
    const terminal = heroPanel.querySelector(".terminal");

    heroPanel.addEventListener("pointermove", (event) => {
      if (!terminal) return;
      const rect = heroPanel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      terminal.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      terminal.style.transition = "transform 0.15s ease-out";
    });

    heroPanel.addEventListener("pointerleave", () => {
      if (!terminal) return;
      terminal.style.transform = "";
      terminal.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    });
  }
})();
