import { Outlet } from "react-router-dom";
import { AuthGuard } from "@/components/auth.provider";

export function AppLayout() {
  return (
    <AuthGuard>
      <div className="flex flex-1 w-full">
        <Outlet />
      </div>
    </AuthGuard>
  );
}
