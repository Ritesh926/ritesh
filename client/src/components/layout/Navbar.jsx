import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Remove any initial hash from URL without disrupting scroll
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-md" : "bg-transparent"
      }`}
    >
      <div className="section-wrap flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="group flex items-center gap-2.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 text-left cursor-pointer"
          aria-label="Ritesh Kumar Home"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan via-blue-500 to-accent p-[1.5px] shadow-sm shadow-cyan/30 transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.55)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white transition-colors duration-300 dark:bg-navy">
              <span className="bg-gradient-to-r from-cyan to-blue-400 bg-clip-text font-mono text-sm font-extrabold tracking-tight text-transparent">
                RK
              </span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
              {name || "Ritesh Kumar"}
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan mt-0.5">
              Developer
            </span>
          </div>
        </button>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={`transition-colors duration-200 cursor-pointer hover:text-cyan ${
                active === link.id
                  ? "text-cyan font-medium"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-slate-200 bg-slate-100/80 p-2 text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-200 hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/admin/login"
            className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:brightness-110 active:scale-95 sm:inline-flex"
          >
            Admin
          </Link>
          <button
            className="rounded-lg p-1.5 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            type="button"
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="glass mx-4 mb-4 rounded-2xl p-4 shadow-lg lg:hidden">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-cyan dark:text-slate-300 dark:hover:text-white cursor-pointer"
              onClick={() => {
                setOpen(false);
                scrollTo(link.id);
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}
