import { useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, personal } from "../../data/portfolio";
import useActiveSection from "../../hooks/useActiveSection";

const sectionIds = [
  "home",
  "about",
  "experience",
  "projects",
  "playground",
  "skills",
  "education",
  "contact",
];

export default function Navbar() {
  const active = useActiveSection(sectionIds);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) dialogRef.current?.close();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = "";
    };
  }, []);

  function openMenu() {
    dialogRef.current.showModal();
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    dialogRef.current.close();
  }

  function afterClose() {
    document.body.style.overflow = "";
    triggerRef.current?.focus({ preventScroll: true });
  }

  function navigate(event, id) {
    event.preventDefault();
    closeMenu();
    window.requestAnimationFrame(() => {
      const section = document.getElementById(id);
      history.pushState(null, "", `#${id}`);
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Hifzan, kembali ke awal"
        >
          {personal.shortName}
          <span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-contact">
          Mari bicara <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={triggerRef}
          type="button"
          className="menu-trigger"
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          onClick={openMenu}
        >
          Menu <Menu size={20} aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className="mobile-menu"
        aria-labelledby="menu-title"
        onClose={afterClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientY > bounds.bottom ||
              event.clientX < bounds.left ||
              event.clientX > bounds.right
            )
              closeMenu();
          }
        }}
      >
        <div className="mobile-menu-top">
          <span id="menu-title" className="wordmark">
            Navigasi<span>.</span>
          </span>
          <button
            type="button"
            className="menu-close"
            onClick={closeMenu}
            autoFocus
          >
            Tutup <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navigasi seluler">
          {navigation.map(({ id, label }, index) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={(event) => navigate(event, id)}
            >
              <span className="menu-index">0{index + 1}</span>
              {label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </dialog>
    </header>
  );
}
