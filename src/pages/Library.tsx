import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
import { LibraryCard } from "@/components/LibraryCard";
import { useLibraryItems, useCreateLibraryItem } from "@/hooks/useLibraryItems";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Library() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: libraryItems, isLoading } = useLibraryItems(typeFilter, domainFilter);
  const createLibraryItem = useCreateLibraryItem();

  const handleAddSource = async (data: SourceFormData) => {
    try {
      await createLibraryItem.mutateAsync({
        title: data.title,
        item_type: data.type,
        url: data.url || undefined,
        description: data.notes || undefined,
        domain: data.domain,
      });
      toast.success("Source added successfully!");
    } catch (error) {
      toast.error("Failed to add source");
      console.error(error);
    }
  };

  // Filter items by search query and domain
  const filteredItems = libraryItems?.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain =
      domainFilter === "all" ||
      item.description?.toLowerCase().includes(`[${domainFilter}]`);

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1100: 3 }}>
            <Masonry gutter="1.5rem">
              {filteredItems.map((item, index) => (
                <LibraryCard
                  key={item.id}
                  item={item}
                  isTourTarget={index === 0}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>No sources added yet. Click "Add Source" to get started.</p>
          </div>
        )}
      </div>

      <AddSourceDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSource}
      />
    </div>
  );
}
