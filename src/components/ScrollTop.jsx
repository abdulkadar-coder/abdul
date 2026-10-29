import { useEffect, useState } from "react";
import { scrollToTop } from "../hooks/useSmoothScroll";
import Icon from "./Icon";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top-btn${visible ? " is-visible" : ""}`}
      aria-label="Scroll back to top"
      onClick={scrollToTop}
    >
      <Icon name="arrowUp" size={17} />
    </button>
  );
}
