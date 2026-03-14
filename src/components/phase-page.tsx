"use client";

import { useEffect, useState, useCallback, use } from "react";
import { ContentCard } from "@/components/content-card";
import { PipelineProgress } from "@/components/pipeline-progress";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Phase } from "@/lib/pipeline/types";

interface ContentItem {
  id: string;
  type: string;
  phase: string;
  title: string | null;
  body: string;
  metadata: Record<string, string | number | boolean | null> | null;
  isSelected: boolean;
  isEdited: boolean;
  sortOrder: number;
}

interface PhasePageProps {
  params: Promise<{ id: string }>;
  phase: Phase;
  title: string;
  description: string;
}

export function PhasePage({ params, phase, title, description }: PhasePageProps) {
  const { id } = use(params);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const res = await fetch(`/api/content?episodeId=${id}&phase=${phase}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [id, phase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (itemId: string, body: string) => {
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, body }),
    });
    await fetchItems();
  };

  const handleToggleSelect = async (itemId: string, selected: boolean) => {
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, isSelected: selected }),
    });
    await fetchItems();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // Group items by type
  const groupedItems = items.reduce(
    (acc, item) => {
      const key = item.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, ContentItem[]>
  );

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/episodes/${id}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to episode
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      <PipelineProgress
        episodeId={id}
        currentStep={5}
        status="completed"
        activePhase={phase}
      />

      {items.length === 0 ? (
        <div className="text-center py-16 border rounded-lg border-dashed">
          <p className="text-muted-foreground">
            No content generated for this phase yet
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([type, typeItems]) => (
            <div key={type} className="space-y-4">
              <h2 className="text-lg font-semibold capitalize">
                {type.replace(/_/g, " ")}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({typeItems.length})
                </span>
              </h2>
              <div className="grid gap-4">
                {typeItems.map((item) => (
                  <ContentCard
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    title={item.title}
                    body={item.body}
                    metadata={item.metadata}
                    isSelected={item.isSelected}
                    isEdited={item.isEdited}
                    onSave={handleSave}
                    onToggleSelect={
                      type === "title_option" ? handleToggleSelect : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
