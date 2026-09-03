import { useEffect, useState } from "react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { mediaUrl } from "../../api/client";
import { trackResume } from "../../api/services";

export function Hero({ profile }) {
  const roles = profile?.roles?.length ? profile.roles : ["Full Stack Developer"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const speed = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) {
        setTimeout(() => setDeleting(true), 1100);
      } else if (deleting && next === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  async function onResume() {
    try {
      const res = await trackResume();
      const url = mediaUrl(res.url);
      window.open(url, "_blank", "noopener");
    } catch {
      alert("Resume is not uploaded yet. Add it from the admin panel.");
    }
  }

  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div className="section-wrap grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">Hello, I'm</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 dark:text-white transition-colors duration-300 sm:text-6xl">
            {profile?.name || "Ritesh Kumar"}
          </h1>
          <p className="mt-4 min-h-[2rem] text-xl font-medium text-blue-600 dark:text-blue-300 transition-colors duration-300">
            {text}
            <span className="ml-0.5 animate-pulse text-cyan">|</span>
          </p>
          <p className="mt-5 max-w-xl text-slate-600 dark:text-slate-400 transition-colors duration-300 leading-relaxed">
            {profile?.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="150" data-aos-duration="700" data-aos-once="true">
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Download size={16} /> Resume
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Mail size={16} /> Contact me
            </button>
          </div>
          <div className="mt-6 flex gap-4 text-slate-600 dark:text-slate-300" data-aos="fade-up" data-aos-delay="250" data-aos-duration="700" data-aos-once="true">
            {profile?.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-cyan"
                aria-label="GitHub"
              >
                <Github />
              </a>
            ) : null}
            {profile?.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-cyan"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            ) : null}
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="800"
          data-aos-once="true"
          className="glass hover-box group mx-auto flex h-60 w-60 sm:h-72 sm:w-72 md:h-80 md:w-80 max-w-[85vw] max-h-[85vw] items-center justify-center overflow-hidden rounded-full shadow-glow cursor-pointer"
        >
          {profile?.photoUrl ? (
            <img
              src={mediaUrl(profile.photoUrl)}
              alt={profile.name}
              className="h-full w-full object-cover object-top img-smooth"
            />
          ) : (
            <span className="text-6xl font-semibold text-cyan">{(profile?.name || "R").slice(0, 1)}</span>
          )}
        </div>
      </div>
    </section>
  );
}
