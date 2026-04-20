import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/expense.api";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!data?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute;
