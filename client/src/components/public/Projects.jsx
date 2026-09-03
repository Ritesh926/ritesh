import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { mediaUrl } from "../../api/client";
import { FadeIn, SectionHeading } from "../ui/Primitives";

export function Projects({ items }) {
  const [filter, setFilter] = useState("All");
  const tags = useMemo(() => {
    const set = new Set();
    items.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [items]);

  const visible = filter === "All" ? items : items.filter((p) => p.techStack.includes(filter));

  return (
    <section id="projects" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="Work" title="Projects" subtitle="Filter by stack. Every card is driven by the CMS." />
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                filter === tag
                  ? "bg-accent text-white shadow-sm"
                  : "border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <FadeIn key={project._id} delay={i * 0.05}>
              <article className="glass hover-box group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="h-44 overflow-hidden bg-gradient-to-br from-accent/30 to-cyan/20">
                  {project.imageUrl ? (
                    <img
                      src={mediaUrl(project.imageUrl)}
                      alt={project.title}
                      className="h-full w-full object-cover img-smooth"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4 text-sm font-medium">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-cyan hover:underline"
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    ) : null}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan transition-colors"
                      >
                        <Github size={14} /> Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
