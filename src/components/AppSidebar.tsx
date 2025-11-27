import { Home, Library, FileText, Clock, User, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Library, label: "Library", path: "/library" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: Clock, label: "Recall", path: "/recall" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function AppSidebar() {
  const { signOut } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-8">
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636" />
          </svg>
        </div>
        <span className="text-xs font-medium">brain-node</span>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="text-accent bg-sidebar-accent"
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
  );
}
