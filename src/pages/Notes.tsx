import { useState } from "react";
import { ChevronRight, ChevronDown, FolderClosed, FileText, Send, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fileTree = [
  {
    name: "Projects",
    type: "folder",
    expanded: true,
    children: [
      {
        name: "Notes",
        type: "folder",
        expanded: true,
        children: [
          { name: "Components", type: "folder" },
          { name: "Adm.nats", type: "file" },
          { name: "The Future of PKM...", type: "file" },
          { name: "The Future of PKM", type: "file", active: true },
          { name: "The Future of PKM...", type: "file" },
          { name: "The Future of PKM...", type: "file" },
          { name: "The Future of PKM...", type: "file" },
        ],
      },
      { name: "Papers", type: "folder" },
      { name: "Papers | Videos", type: "folder" },
      { name: "Library", type: "folder" },
      { name: "Source", type: "folder" },
    ],
  },
];

function FileTreeItem({ item, level = 0 }: { item: any; level?: number }) {
  const [expanded, setExpanded] = useState(item.expanded || false);

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer hover:bg-sidebar-accent rounded ${
          item.active ? "bg-sidebar-accent text-accent" : "text-sidebar-foreground"
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => item.type === "folder" && setExpanded(!expanded)}
      >
        {item.type === "folder" && (
          <>
            {expanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <FolderClosed className="w-4 h-4" />
          </>
        )}
        {item.type === "file" && <FileText className="w-4 h-4" />}
        <span className="truncate">{item.name}</span>
      </div>
      {item.children && expanded && (
        <div>
          {item.children.map((child: any, index: number) => (
            <FileTreeItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Notes() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-64 bg-sidebar border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-sm">Files</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {fileTree.map((item, index) => (
            <FileTreeItem key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Notes System</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Add to
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-4">The Future of PKM</h1>
          <div className="prose prose-invert max-w-none">
            <p>
              The Future of PKM is an asendar of{" "}
              <span className="text-accent">#The Future of PKM</span>, to teos.coimpently recognise the
              knowledge compeations on also undertgratory technology us readering website mibigatng and
              immiv.dern models.
            </p>
            <p className="mt-4">
              A moret.sarrun can be trieated twile's, techniloqaes raliks, fine and infewmious knowledge
              nodels. <span className="text-accent">#Research and bymmarale</span>. We can generate connection
              of technology skills, such ars's interpentence, and inte.liverrmonar.et.it understand for the
              cullatuces solution and to se.come{" "}
              <span className="text-accent">#wikilinks/reeaneliqs.synote</span> cnerrt poin te promotional
              including pol.sisterm, and implementaional line concerentizations, develop such as rieernational
              growths.
            </p>
            <p className="mt-4">
              Skyrius is to designte to extermatter and connections of rate to diuventile method
              drap.inmwiic.user strateges on <span className="text-accent">#Wikilinks/liiiy.qualae</span> and
              condeuqlly concepuerating in on.viedure research relations and records as the{" "}
              <span className="text-accent">#wWikilinks/formeminta</span>. The usanic mans a nalinherolle into
              play. its labori autores rafesequences of an apt.attomical m to compundity life thin knowledge.
            </p>
          </div>
        </div>
      </div>

      <div className="w-80 bg-card border-l border-border flex flex-col">
        <div className="border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold">AI Companion & Graph</h2>
          <button className="text-muted-foreground hover:text-foreground">×</button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-sidebar-accent rounded-lg p-3 text-sm">
              <p className="text-muted-foreground">
                Can I review RAG suggestions that yourmens enones to help more at unidoes in fireports?
              </p>
            </div>
            <div className="bg-accent/10 rounded-lg p-3 text-sm border border-accent/20">
              <p>
                Hi, heurats halt. Suncotorn: conscion aut.ored to deen connections models wakelating the
                eimadeus and dongeaning in diffmult samples.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1 bg-background" />
              <Button size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <h3 className="font-semibold text-sm mb-3">Mini local graph</h3>
          <div className="aspect-square bg-background rounded-lg flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <defs>
                <radialGradient id="nodeGlow">
                  <stop offset="0%" stopColor="hsl(174, 72%, 56%)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(174, 72%, 56%)" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Connection lines */}
              <line x1="100" y1="100" x2="60" y2="60" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="100" x2="140" y2="60" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="100" x2="160" y2="100" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="100" x2="140" y2="140" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="100" x2="60" y2="140" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.3" />
              <line x1="60" y1="60" x2="140" y2="60" stroke="hsl(174, 72%, 56%)" strokeWidth="1" opacity="0.2" />
              
              {/* Nodes */}
              <circle cx="100" cy="100" r="8" fill="hsl(174, 72%, 56%)" />
              <circle cx="100" cy="100" r="20" fill="url(#nodeGlow)" />
              
              <circle cx="60" cy="60" r="6" fill="hsl(174, 72%, 56%)" />
              <circle cx="140" cy="60" r="6" fill="hsl(280, 60%, 60%)" />
              <circle cx="160" cy="100" r="6" fill="hsl(174, 72%, 56%)" />
              <circle cx="140" cy="140" r="6" fill="hsl(280, 60%, 60%)" />
              <circle cx="60" cy="140" r="6" fill="hsl(174, 72%, 56%)" />
              
              {/* Smaller nodes */}
              <circle cx="40" cy="80" r="4" fill="hsl(220, 20%, 50%)" />
              <circle cx="180" cy="80" r="4" fill="hsl(220, 20%, 50%)" />
              <circle cx="80" cy="180" r="4" fill="hsl(220, 20%, 50%)" />
              <circle cx="120" cy="20" r="4" fill="hsl(220, 20%, 50%)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
