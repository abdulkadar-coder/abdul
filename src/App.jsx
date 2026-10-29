import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Research from "./sections/Research";
import Experience from "./sections/Experience";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useSmoothScroll();
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="bg-grid" aria-hidden="true" />

      <Header />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Credentials />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </>
  );
}
