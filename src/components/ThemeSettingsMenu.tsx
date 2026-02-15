import { Palette, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { colorThemes, useColorTheme } from "@/hooks/useColorTheme";

const toHsl = (value: string) => `hsl(${value})`;

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
      <DropdownMenuContent side="right" align="start" className="w-72">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Theme
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup value={colorTheme} onValueChange={setColorTheme} className="max-h-96 overflow-y-auto">
          {colorThemes.map((themeOption) => (
            <HoverCard key={themeOption.id} openDelay={120}>
              <HoverCardTrigger asChild>
                <DropdownMenuRadioItem value={themeOption.id} className="pr-2">
                  <div className="flex w-full items-center justify-between gap-3">
                    <span>{themeOption.name}</span>
                    <span className="flex items-center gap-1.5">
                      {themeOption.swatches.map((swatch, index) => (
                        <span
                          key={`${themeOption.id}-swatch-${index}`}
                          className="h-3 w-3 rounded-full border"
                          style={{ backgroundColor: toHsl(swatch) }}
                        />
                      ))}
                    </span>
                  </div>
                </DropdownMenuRadioItem>
              </HoverCardTrigger>
              <HoverCardContent side="right" align="start" className="w-64">
                <div className="space-y-3">
                  <p className="text-sm font-medium">{themeOption.name} Preview</p>
                  <div
                    className="rounded-md border p-3"
                    style={{
                      backgroundColor: toHsl(themeOption.palette["--background"]),
                      borderColor: toHsl(themeOption.palette["--border"]),
                      color: toHsl(themeOption.palette["--foreground"]),
                    }}
                  >
                    <div className="mb-2 text-xs opacity-80">Dashboard preview</div>
                    <div
                      className="mb-2 rounded px-3 py-2 text-xs"
                      style={{
                        backgroundColor: toHsl(themeOption.palette["--accent"]),
                        color: toHsl(themeOption.palette["--accent-foreground"]),
                      }}
                    >
                      Weekly Summary Card
                    </div>
                    <button
                      type="button"
                      className="rounded px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: toHsl(themeOption.palette["--primary"]),
                        color: toHsl(themeOption.palette["--primary-foreground"]),
                      }}
                    >
                      Primary Action
                    </button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
