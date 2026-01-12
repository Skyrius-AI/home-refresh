import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AddSourceDialog,
  SOURCE_TYPES,
  DOMAINS,
  SourceFormData,
} from "@/components/library/AddSourceDialog";
import { toast } from "sonner";

export default function Library() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddSource = (data: SourceFormData) => {
    // TODO: Save to database
    console.log("New source:", data);
    toast.success("Source added successfully!");
  };

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
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Add Source
          </Button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Type:</span>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-card">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Types</SelectItem>
                {SOURCE_TYPES.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Domain:</span>
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-44 bg-card">
                <SelectValue placeholder="All Domains" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Domains</SelectItem>
                {DOMAINS.map((domain) => (
                  <SelectItem key={domain} value={domain.toLowerCase()}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <p>No sources added yet. Click "Add Source" to get started.</p>
        </div>
      </div>

      <AddSourceDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSource}
      />
    </div>
  );
}
