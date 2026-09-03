import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center">Checking session...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
