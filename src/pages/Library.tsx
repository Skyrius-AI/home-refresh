import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const tabs = ["All", "Papers", "Videos", "Podcasts"];

export default function Library() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Add Source
          </Button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <p>No sources added yet. Click "Add Source" to get started.</p>
        </div>
      </div>
    </div>
  );
}
