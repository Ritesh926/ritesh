import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import { ProtectedRoute } from "./pages/admin/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProfilePage from "./pages/admin/ProfilePage";
import SkillsPage from "./pages/admin/SkillsPage";
import ExperiencePage from "./pages/admin/ExperiencePage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import CertificationsPage from "./pages/admin/CertificationsPage";
import EducationPage from "./pages/admin/EducationPage";
import api from "./api/client";
import MessagesPage from "./pages/admin/MessagesPage";
import PasswordPage from "./pages/admin/PasswordPage";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    // Background keep-alive: ping health endpoint every 10 mins while user has site open
    const timer = setInterval(() => {
      api.get("/health").catch(() => {});
    }, 10 * 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="skills" element={<SkillsPage />} />
                  <Route path="experience" element={<ExperiencePage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="certifications" element={<CertificationsPage />} />
                  <Route path="education" element={<EducationPage />} />
                  <Route path="messages" element={<MessagesPage />} />
                  <Route path="password" element={<PasswordPage />} />
                </Route>
              </Route>
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
