import { FadeIn, SectionHeading } from "../ui/Primitives";

export function Experience({ items }) {
  return (
    <section id="experience" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="Career" title="Experience" subtitle="Roles and impact, in timeline form." />
        <div className="relative space-y-8 border-l border-slate-300 dark:border-white/15 pl-6 sm:pl-10">
          {items.map((item, i) => (
            <FadeIn key={item._id} delay={i * 0.06} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-cyan shadow-sm shadow-cyan/50 sm:-left-[47px]" />
              <article className="glass hover-box rounded-3xl p-6">
                <p className="text-sm font-semibold text-cyan">
                  {item.startDate} — {item.current ? "Present" : item.endDate}
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white transition-colors">{item.role}</h3>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
