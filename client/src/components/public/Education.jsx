import { FadeIn, SectionHeading } from "../ui/Primitives";

export function Education({ items }) {
  return (
    <section id="education" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="Study" title="Education" />
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn key={item._id} delay={i * 0.05} className="glass hover-box rounded-3xl p-6">
              <p className="text-sm font-semibold text-cyan">
                {item.startYear} — {item.endYear}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white transition-colors">{item.degree}</h3>
              <p className="text-slate-700 dark:text-slate-300 font-medium">{item.institution}</p>
              {item.sgpa ? <p className="mt-3 text-sm font-semibold text-cyan">SGPA {item.sgpa}</p> : null}
              {item.description ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p> : null}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
