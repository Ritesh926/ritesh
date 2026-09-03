import { useEffect, useState } from "react";
import AOS from "aos";
import {
  getCertifications,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
} from "../api/services";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/public/Hero";
import { About } from "../components/public/About";
import { Skills } from "../components/public/Skills";
import { Experience } from "../components/public/Experience";
import { Projects } from "../components/public/Projects";
import { Certifications } from "../components/public/Certifications";
import { Education } from "../components/public/Education";
import { Contact } from "../components/public/Contact";
import { Skeleton } from "../components/ui/Primitives";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getProfile(),
      getSkills(),
      getExperience(),
      getProjects(),
      getCertifications(),
      getEducation(),
    ])
      .then(([profile, skills, experience, projects, certs, education]) => {
        setData({
          profile: profile.data,
          skills: skills.data || [],
          experience: experience.data || [],
          projects: projects.data || [],
          certs: certs.data || [],
          education: education.data || [],
        });
      })
      .catch(() => setError("Could not load portfolio data. Start the API and seed the database."));
  }, []);

  useEffect(() => {
    if (data) {
      setTimeout(() => AOS.refresh(), 120);
    }
  }, [data]);

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <p className="text-slate-700 dark:text-slate-300">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="section-wrap space-y-6 pt-24">
        <Skeleton className="h-16 w-48" />
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar name={data.profile?.name} />
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills categories={data.skills} />
        <Experience items={data.experience} />
        <Projects items={data.projects} />
        <Certifications items={data.certs} />
        <Education items={data.education} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </>
  );
}
