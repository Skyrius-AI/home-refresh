import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Masonry from "react-responsive-masonry";
import { LibraryCard } from "@/components/LibraryCard";

const contentItems = [
  {
    id: 1,
    type: "video",
    title: "The world: Erera saoutation more man Skyrius",
    date: "03/09/2023",
    description: "Auto-generated dolor sit amet, connections fonde sourks, and implementaeral line commrezation...",
    relatedNotes: 3,
  },
  {
    id: 2,
    type: "document",
    title: "Research and bymmarale",
    date: "03/09/2023",
    description: "Auto-generated dolor sit amet, connections fonde sourks, and implementaional line convernation...",
    relatedNotes: 3,
  },
  {
    id: 3,
    type: "document",
    title: "The Viewer ersentilbions and Skyrius",
    date: "03/09/2023",
    description: "Auto-generated dolor sit amet, connections fonde sourks, and implementaural line convernation...",
    relatedNotes: 3,
  },
  {
    id: 4,
    type: "document",
    title: "Flountian understanding tidal propriatation",
    date: "03/09/2023",
    description: "Auto-generated dolor sit amet, connections fande sourks, and implementaional line congerosation...",
    relatedNotes: 3,
  },
  {
    id: 5,
    type: "document",
    title: "Skyrius are unload source in karnamy",
    date: "02/03/2023",
    description: "Auto-generated dolor sit amet, consecutiva fonce acurks, and implementaeral line commerication...",
    relatedNotes: 0,
  },
  {
    id: 6,
    type: "document",
    title: "Skyrius is the conrmiiichnad",
    date: "02/04/2023",
    description: "Auto-generated dolor sit amet, consecutiva fonce acurks, and implementaeral line commerication...",
    relatedNotes: 3,
  },
];

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
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-tour-id="add-source-btn">
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

        <Masonry columnsCount={4} gutter="16px">
          {contentItems.map((item, index) => (
            <LibraryCard
              key={item.id}
              item={item}
              isTourTarget={index === 0}
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
}
