import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex flex-1 w-full items-center justify-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
