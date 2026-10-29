import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let activeLenis = null;
let lockCount = 0;

export function lockScroll() {
  lockCount += 1;
  activeLenis?.stop();
  document.body.classList.add("is-locked");
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    activeLenis?.start();
    document.body.classList.remove("is-locked");
  }
}

export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { duration: 1.1 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function currentHashTarget() {
  const hash = window.location.hash;
  if (!hash || hash === "#") return null;
  try {
    return document.querySelector(decodeURIComponent(hash));
  } catch {
    return null;
  }
}

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialTarget = currentHashTarget();

    if (reduced) {
      if (!initialTarget) return undefined;
      const timer = window.setTimeout(() => {
        initialTarget.scrollIntoView({ block: "start", behavior: "auto" });
      }, 80);
      return () => window.clearTimeout(timer);
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    activeLenis = lenis;
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let pendingScroll = 0;
    let initialJumpDone = false;

    const jumpToInitialHash = () => {
      if (!initialTarget || initialJumpDone) return;
      initialJumpDone = true;
      lenis.scrollTo(initialTarget, { immediate: true });
    };

    const initialHashTimer = window.setTimeout(jumpToInitialHash, 100);
    document.fonts?.ready.then(jumpToInitialHash);

    const onAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();

      const navigate = () => lenis.scrollTo(target, { duration: 1.15 });

      // While the mobile menu or dialog is open, Lenis is stopped. Let React
      // release the lock first, then perform the scroll.
      if (document.body.classList.contains("is-locked")) {
        window.clearTimeout(pendingScroll);
        pendingScroll = window.setTimeout(navigate, 90);
      } else {
        navigate();
      }

      if (history.replaceState) {
        history.replaceState(null, "", hash);
      }
    };

    document.addEventListener("click", onAnchorClick);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(pendingScroll);
      window.clearTimeout(initialHashTimer);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      activeLenis = null;
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
