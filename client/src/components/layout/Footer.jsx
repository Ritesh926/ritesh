import { Github, Linkedin } from "lucide-react";

export function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-10 transition-colors">
      <div className="section-wrap flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {year} {profile?.name || "Ritesh Kumar"}. All rights reserved.
        </p>
        <div className="flex gap-4">
          {profile?.github ? (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-cyan dark:hover:text-cyan transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          ) : null}
          {profile?.linkedin ? (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-cyan dark:hover:text-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
