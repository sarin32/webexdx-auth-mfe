import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-25 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="WebexDX Logo" className="h-15 w-auto" />
          <span className="text-lg sm:text-xl font-semibold">WebexDX</span>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
