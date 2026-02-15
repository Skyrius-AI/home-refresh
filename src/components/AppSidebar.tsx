import { Home, Library, FileText, Clock, User, LogOut, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeSettingsMenu } from "@/components/ThemeSettingsMenu";

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Library, label: "Library", path: "/library" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: Clock, label: "Recall", path: "/recall" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function AppSidebar() {
  const { signOut } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile menu button - fixed position */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 bg-background/80 backdrop-blur-sm border border-border"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-8 z-50 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 mb-4">
          <ThemeSettingsMenu />
          <span className="text-xs font-medium">SKYRIUS</span>
        </div>

        <nav className="flex-1 flex flex-col gap-4">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="text-foreground font-medium border-l-2 border-primary bg-primary/10"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="flex flex-col items-center gap-1 h-auto py-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Logout</span>
        </Button>
      </aside>
    </>
  );
}
