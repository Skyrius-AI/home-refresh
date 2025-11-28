import { Home, Library, FileText, Clock, User, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

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
    <Sidebar className="border-r border-border/50" data-tour-id="sidebar-nav">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/80 to-primary/80 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-background" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-tight">brain-node</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="gap-2 p-2">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.path}
                  className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
                  activeClassName="text-accent bg-sidebar-accent font-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="flex flex-col items-center gap-1 h-auto py-3 text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
