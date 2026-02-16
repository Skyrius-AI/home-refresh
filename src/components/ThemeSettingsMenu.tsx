import { Check, Palette, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { COLOR_THEMES, useColorTheme } from "@/hooks/useColorTheme";
import { cn } from "@/lib/utils";

export function ThemeSettingsMenu() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-lg bg-accent/20 hover:bg-accent/30"
          aria-label="Open theme settings"
        >
          <Settings2 className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Themes
        </DropdownMenuLabel>
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <div className="space-y-1">
            {COLOR_THEMES.map((theme) => {
              const isActive = theme.id === colorTheme;

              return (
                <HoverCard key={theme.id} openDelay={120} closeDelay={80}>
                  <HoverCardTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setColorTheme(theme.id)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-md border px-3 py-2 text-left transition-colors",
                        isActive
                          ? "border-primary bg-accent/50"
                          : "border-transparent hover:border-border hover:bg-accent/20",
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isActive && <Check className="h-4 w-4 shrink-0 text-primary" />}
                        <span className={cn("text-sm font-medium truncate", !isActive && "pl-6")}>{theme.label}</span>
                      </div>
                      <div className="flex items-center gap-1 ml-3 shrink-0">
                        {theme.colors.map((color) => (
                          <span
                            key={`${theme.id}-${color}`}
                            className="h-3.5 w-3.5 rounded-full border border-black/15"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent side="left" align="start" className="w-64 p-3">
                    <ThemePreviewCard
                      label={theme.label}
                      backgroundColor={theme.colors[2]}
                      panelColor={theme.colors[0]}
                      accentColor={theme.colors[1]}
                    />
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemePreviewCard({
  label,
  backgroundColor,
  panelColor,
  accentColor,
}: {
  label: string;
  backgroundColor: string;
  panelColor: string;
  accentColor: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label} preview</p>
      <div className="rounded-lg border p-2" style={{ backgroundColor: "hsl(var(--background))" }}>
        <div className="rounded-md border p-2 space-y-2" style={{ backgroundColor: backgroundColor }}>
          <div className="rounded px-2 py-1 text-xs font-medium" style={{ backgroundColor: panelColor, color: "white" }}>
            Dashboard Header
          </div>
          <div className="flex gap-2">
            <div className="h-6 flex-1 rounded" style={{ backgroundColor: accentColor }} />
            <div className="h-6 flex-1 rounded" style={{ backgroundColor: panelColor, opacity: 0.8 }} />
          </div>
          <div className="h-2.5 w-2/3 rounded" style={{ backgroundColor: "hsl(var(--muted))" }} />
        </div>
      </div>
    </div>
  );
}
