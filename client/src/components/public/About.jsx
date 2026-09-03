import { MapPin, GraduationCap } from "lucide-react";
import { mediaUrl } from "../../api/client";
import { FadeIn, SectionHeading } from "../ui/Primitives";

export function About({ profile }) {
  return (
    <section id="about" className="py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow="About" title="About me" subtitle="A short snapshot of who I am and how I work." />
        <FadeIn className="glass hover-box group grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[220px_1fr]">
          <div className="mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-none overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/60 dark:border-white/10 dark:bg-white/5 aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-full">
            {profile?.photoUrl ? (
              <img src={mediaUrl(profile.photoUrl)} alt="" className="h-full w-full object-cover object-top img-smooth" />
            ) : (
              <div className="grid h-full min-h-[260px] place-items-center text-4xl text-cyan font-bold">RK</div>
            )}
          </div>
          <div>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300 transition-colors duration-300">{profile?.bio}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/50 p-4 transition-all duration-300 hover:border-cyan/50 hover:shadow-sm dark:border-white/10 dark:bg-white/5">
                <MapPin size={18} className="text-cyan" />
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Location</p>
                <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{profile?.location}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/50 p-4 transition-all duration-300 hover:border-cyan/50 hover:shadow-sm dark:border-white/10 dark:bg-white/5">
                <GraduationCap size={18} className="text-cyan" />
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Education</p>
                <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{profile?.educationQuickFact}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
