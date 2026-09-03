import { mediaUrl } from "../../api/client";
import { FadeIn, SectionHeading } from "../ui/Primitives";

export function Certifications({ items }) {
  return (
    <section id="certs" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="Proof" title="Certifications & achievements" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item._id} delay={i * 0.05} className="glass hover-box group overflow-hidden rounded-3xl">
              <div className="h-44 overflow-hidden bg-slate-100 dark:bg-white/5 border-b border-slate-200/60 dark:border-white/5">
                {item.imageUrl ? (
                  <img src={mediaUrl(item.imageUrl)} alt={item.title} className="h-full w-full object-cover img-smooth" />
                ) : (
                  <div className="grid h-full place-items-center text-cyan font-medium">{item.date || "Award"}</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white transition-colors">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {item.issuer} {item.date ? `· ${item.date}` : ""}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
