import { useEffect, useState } from "react";
import { getDashboard } from "../../api/services";
import { Skeleton } from "../../components/ui/Primitives";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboard().then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }

  const cards = [
    ["Projects", stats.projects],
    ["Certificates", stats.certificates],
    ["Experience", stats.experience],
    ["Education", stats.education],
    ["Skill categories", stats.skillCategories],
    ["Messages", stats.messages],
    ["Resume views", stats.resumeViews],
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold">Overview</h2>
      <p className="mt-1 text-sm text-slate-400">Live counts from MongoDB.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="glass rounded-2xl p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
