import { Bell, Search, User as UserIcon, ChevronRight, ChevronDown, FolderClosed, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();

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

        <div className="flex items-start gap-4 mb-8">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-muted">
              <UserIcon className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold">{user?.email?.split('@')[0] || 'User'}</h2>
              <Button size="sm" variant="outline">
                Edit Profile
              </Button>
            </div>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Notes</div>
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
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    No pinned insights yet. Pin your best notes to showcase them here.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Insight Tree</h3>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Your insight tree will grow as you add notes and connections.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No recent activity yet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
