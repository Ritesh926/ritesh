import { FadeIn, SectionHeading } from "../ui/Primitives";

export function Skills({ categories }) {
  return (
    <section id="skills" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="Capabilities" title="Skills" subtitle="Categorized by how I actually ship work." />
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => (
            <FadeIn key={cat._id} delay={i * 0.05} className="glass hover-box rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-cyan">{cat.name}</h3>
              <div className="mt-5 space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill._id || skill.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-cyan transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
