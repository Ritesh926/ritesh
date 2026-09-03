export function FadeIn({ children, delay = 0, className = "", animation = "fade-up" }) {
  const delayMs = Math.round(delay * 1000);
  return (
    <div
      className={className}
      data-aos={animation}
      data-aos-delay={delayMs > 0 ? delayMs : undefined}
      data-aos-duration="700"
      data-aos-easing="ease-out-cubic"
      data-aos-once="true"
    >
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 max-w-2xl" data-aos="fade-up" data-aos-duration="700" data-aos-once="true">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan font-semibold">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-slate-600 dark:text-slate-400 transition-colors duration-300">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/80 dark:bg-white/10 ${className}`} />;
}

export function EmptyState({ title, hint }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 px-6 py-12 text-center text-slate-500 dark:text-slate-400">
      <p className="font-medium text-slate-800 dark:text-slate-200">{title}</p>
      {hint ? <p className="mt-1 text-sm">{hint}</p> : null}
    </div>
  );
}
