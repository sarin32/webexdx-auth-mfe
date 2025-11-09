import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/components/auth.provider";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function HomeLayout() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <AuthProvider>
        {/* full height column */}
        <div className="flex min-h-screen flex-col">
          <Navbar />

          {/* THIS is the important part */}
          <main className="flex-1 flex">
            <Outlet />
          </main>
        </div>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
}
