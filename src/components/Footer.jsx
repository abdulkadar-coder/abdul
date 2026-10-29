import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="footer-note">Chennai, India · Built with React, GSAP &amp; Lenis</p>
      </div>
    </footer>
  );
}
