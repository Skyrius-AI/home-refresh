import { Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const recallItems = [
  { date: "Today", items: ["The Future of PKM", "Research and bymmarale"] },
  { date: "Yesterday", items: ["Skyrius under search", "Tenters and impress"] },
  { date: "Last Week", items: ["The world: Erera saoutation", "Flountian understanding"] },
];

export default function Recall() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 py-6">
        <div className="flex items-center gap-4 mb-8">
          <Clock className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold">Recall</h1>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search your history..." className="pl-10 bg-card" />
        </div>

        <div className="space-y-8">
          {recallItems.map((section, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-4 text-muted-foreground">{section.date}</h2>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="hover:border-accent transition-colors cursor-pointer"
                  >
                    <CardContent className="py-4">
                      <p className="font-medium">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
