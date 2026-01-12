import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

const SOURCE_TYPES = [
  "Paper",
  "Video",
  "Documentary",
  "Podcast",
  "Article",
  "Book",
];

const DOMAINS = [
  "Physics",
  "Maths",
  "Chemistry",
  "Biology",
  "Computer Science",
  "History",
  "Finance",
  "Economics",
  "Arts",
  "Linguistics",
];

interface AddSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SourceFormData) => void;
}

export interface SourceFormData {
  title: string;
  url: string;
  type: string;
  domain: string;
  notes: string;
  file: File | null;
}

export function AddSourceDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddSourceDialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");
  const [domain, setDomain] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type || !domain) return;

    onSubmit({ title, url, type, domain, notes, file });
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setType("");
    setDomain("");
    setNotes("");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const isValid = title && type && domain;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Source</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Type <span className="text-destructive">*</span>
              </Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {SOURCE_TYPES.map((t) => (
                    <SelectItem key={t} value={t.toLowerCase()}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Domain <span className="text-destructive">*</span>
              </Label>
              <Select value={domain} onValueChange={setDomain} required>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {DOMAINS.map((d) => (
                    <SelectItem key={d} value={d.toLowerCase()}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Document Upload</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file")?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {file ? file.name : "Choose file"}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Add Source
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { SOURCE_TYPES, DOMAINS };
