import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@/components/auth.provider";

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-25 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="WebexDX Logo" className="h-15 w-auto" />
          <span className="text-lg sm:text-xl font-semibold">WebexDX</span>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isLoggedIn ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
