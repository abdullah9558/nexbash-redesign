export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="/assets/nexbash-logo.png" alt="Nexbash Systems" />
      </div>
      <div>
        <div className="footlinks">
          <a href="#studios">Studios</a>
          <a href="#projects">Projects</a>
          <a href="#packages">Packages</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="copy">© {new Date().getFullYear()} Nexbash Systems — All rights reserved.</div>
      </div>
    </footer>
  );
}
