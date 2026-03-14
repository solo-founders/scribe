"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Pencil, X } from "lucide-react";

interface ContentCardProps {
  id: string;
  type: string;
  title?: string | null;
  body: string;
  metadata?: Record<string, string | number | boolean | null> | null;
  isSelected?: boolean;
  isEdited?: boolean;
  onSave?: (id: string, body: string) => Promise<void>;
  onToggleSelect?: (id: string, selected: boolean) => Promise<void>;
}

const TYPE_COLORS: Record<string, string> = {
  title_option: "bg-purple-100 text-purple-700",
  description: "bg-blue-100 text-blue-700",
  guest_bio: "bg-indigo-100 text-indigo-700",
  show_notes: "bg-cyan-100 text-cyan-700",
  quote: "bg-amber-100 text-amber-700",
  clip_suggestion: "bg-red-100 text-red-700",
  blog_topic: "bg-emerald-100 text-emerald-700",
  teaser_post: "bg-pink-100 text-pink-700",
  newsletter_teaser: "bg-orange-100 text-orange-700",
  blog_post: "bg-green-100 text-green-700",
  newsletter: "bg-teal-100 text-teal-700",
  social_post: "bg-sky-100 text-sky-700",
  social_thread: "bg-violet-100 text-violet-700",
  platform_description: "bg-slate-100 text-slate-700",
  derivative_blog: "bg-lime-100 text-lime-700",
  social_calendar_entry: "bg-fuchsia-100 text-fuchsia-700",
  quote_card_text: "bg-yellow-100 text-yellow-700",
  cross_promo: "bg-rose-100 text-rose-700",
};

export function ContentCard({
  id,
  type,
  title,
  body,
  metadata,
  isSelected,
  isEdited,
  onSave,
  onToggleSelect,
}: ContentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    await onSave(id, editedBody);
    setSaving(false);
    setIsEditing(false);
  };

  const typeLabel = type.replace(/_/g, " ");

  return (
    <Card
      className={
        isSelected ? "ring-2 ring-primary" : undefined
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className={TYPE_COLORS[type] || ""}
            >
              {typeLabel}
            </Badge>
            {title && <CardTitle className="text-base">{title}</CardTitle>}
            {isEdited && (
              <Badge variant="outline" className="text-xs">
                edited
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {onToggleSelect && (
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleSelect(id, !isSelected)}
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            {onSave && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isEditing) {
                    setEditedBody(body);
                  }
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Pencil className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        {metadata && (
          <div className="flex gap-2 flex-wrap mt-1">
            {metadata.category && (
              <Badge variant="outline" className="text-xs">
                {String(metadata.category)}
              </Badge>
            )}
            {metadata.timestamp && (
              <Badge variant="outline" className="text-xs">
                {String(metadata.timestamp)}
              </Badge>
            )}
            {metadata.account && (
              <Badge variant="outline" className="text-xs">
                @{String(metadata.account)}
              </Badge>
            )}
            {metadata.platform && (
              <Badge variant="outline" className="text-xs">
                {String(metadata.platform)}
              </Badge>
            )}
            {metadata.best_platform && (
              <Badge variant="outline" className="text-xs">
                Best: {String(metadata.best_platform).replace(/_/g, " ")}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              rows={Math.max(5, editedBody.split("\n").length + 2)}
              className="font-mono text-sm"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditedBody(body);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {body}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
