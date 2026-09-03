import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/profile", label: "Profile" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/education", label: "Education" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/password", label: "Password" },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="flex flex-col justify-between border-b border-white/10 p-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-accent text-xs font-bold text-white shadow-sm">
              RK
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan leading-none">CMS</p>
              <h1 className="mt-0.5 text-sm font-semibold">Admin panel</h1>
            </div>
          </div>
          <p className="mt-2 truncate text-xs text-slate-400">{user?.email}</p>
          <nav className="mt-6 flex flex-wrap gap-1.5 lg:flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-accent text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-4">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 active:scale-98 text-center"
          >
            <ExternalLink size={16} />
            <span>View site</span>
          </Link>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-red-600/25 transition-all duration-200 hover:bg-red-500 active:scale-98 text-center"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      <div className="p-4 sm:p-8">
        <Outlet />
      </div>
    </div>
  );
}
