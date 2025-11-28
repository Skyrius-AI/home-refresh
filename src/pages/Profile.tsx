import { Bell, Search, User as UserIcon, ChevronRight, ChevronDown, FolderClosed, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const pinnedInsights = [
  { title: "The Future of PKM in Management" },
  { title: "How to spank Slarket Ibugins" },
  { title: "Unuersaand Knowledge Connections" },
];

const recentActivity = [
  { title: "The Future of PKM", time: "2 minuts ago" },
  { title: "The Future of PKM", time: "2 minuts ago" },
  { title: "The Future of PKM", time: "2 minuts ago" },
  { title: "The Future of PKM", time: "2 minuts ago" },
];

const insightTree = [
  {
    name: "Product Management",
    expanded: true,
    children: [
      { name: "Frameworks" },
      { name: "Metrics" },
      { name: "Slarket Management" },
      { name: "Conferent/Dugins" },
      { name: "Interaction" },
      { name: "Maindernent" },
      { name: "Paerem and Reports", children: [{ name: "Compare insights Analysis" }] },
    ],
  },
  { name: "Frameworks" },
];

function TreeItem({ item, level = 0 }: { item: any; level?: number }) {
  const [expanded, setExpanded] = useState(item.expanded || false);

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-muted/50 rounded"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => item.children && setExpanded(!expanded)}
      >
        {item.children ? (
          expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )
        ) : (
          <div className="w-4" />
        )}
        {item.children ? (
          <FolderClosed className="w-4 h-4 text-muted-foreground" />
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {item.children && expanded && (
        <div>
          {item.children.map((child: any, index: number) => (
            <TreeItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Portfolio");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <Avatar>
              <AvatarFallback className="bg-muted">
                <UserIcon className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-8" data-tour-id="social-header">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-muted">
              <UserIcon className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold">Alex Chen</h2>
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                Follow
              </Button>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold">520</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1.2k</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mb-8 border-b border-border">
          {["Portfolio", "Activity", "About"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pinned Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pinnedInsights.map((insight, index) => (
                  <Card key={index} className="hover:border-accent transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                      <p className="font-medium">{insight.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Insight Tree</h3>
              <Card data-tour-id="insight-tree">
                <CardContent className="pt-6">
                  {insightTree.map((item, index) => (
                    <TreeItem key={index} item={item} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="hover:border-accent transition-colors cursor-pointer">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">Created note: {activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
