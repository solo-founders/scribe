"use client";

import { useEffect, useState, useCallback, use } from "react";
import { PipelineProgress } from "@/components/pipeline-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PHASE_LABELS, PIPELINE_PHASES } from "@/lib/pipeline/types";
import Link from "next/link";
import { Loader2, Play, ArrowRight } from "lucide-react";

interface Episode {
  id: string;
  title: string;
  guestName?: string;
  status: string;
  createdAt: string;
}

interface PipelineRun {
  id: string;
  status: string;
  currentStep: number;
  error?: string;
}

const PHASE_ROUTES = [
  "foundation",
  "mining",
  "pre-launch",
  "launch",
  "post-launch",
];

export default function EpisodeOverview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [run, setRun] = useState<PipelineRun | null>(null);
  const [starting, setStarting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchEpisode = useCallback(async () => {
    const res = await fetch(`/api/episodes?id=${id}`);
    const data = await res.json();
    const ep = Array.isArray(data) ? data.find((e: Episode) => e.id === id) : data;
    if (ep) setEpisode(ep);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchEpisode();
  }, [fetchEpisode]);

  // Poll for pipeline status when processing
  useEffect(() => {
    if (!run || (run.status !== "pending" && run.status !== "running")) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/pipeline/status?runId=${run.id}`);
      const data = await res.json();
      setRun(data);

      if (data.status === "completed" || data.status === "failed") {
        fetchEpisode();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [run, fetchEpisode]);

  const handleStartPipeline = async () => {
    setStarting(true);
    try {
      const res = await fetch("/api/pipeline/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId: id }),
      });
      const data = await res.json();
      setRun({ id: data.runId, status: "running", currentStep: 1 });
      fetchEpisode();
    } catch {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!episode) {
    return <div className="text-center py-16">Episode not found</div>;
  }

  const isProcessing =
    episode.status === "processing" ||
    (run && (run.status === "pending" || run.status === "running"));
  const isCompleted = episode.status === "completed" || run?.status === "completed";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{episode.title}</h1>
        {episode.guestName && (
          <p className="text-muted-foreground mt-1">
            Guest: {episode.guestName}
          </p>
        )}
      </div>

      {/* Pipeline Progress */}
      {(isProcessing || isCompleted) && run && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Pipeline Progress
          </h2>
          <PipelineProgress
            episodeId={id}
            currentStep={run.currentStep}
            status={run.status}
          />
          {run.status === "failed" && run.error && (
            <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-md">
              Pipeline failed: {run.error}
            </div>
          )}
        </div>
      )}

      {/* Action Area */}
      {episode.status === "draft" && !isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Generate Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Run the content pipeline to generate 20+ pieces of content from
              this episode&apos;s transcript across 5 phases.
            </p>
            <Button
              onClick={handleStartPipeline}
              disabled={starting}
              size="lg"
            >
              {starting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Content Pipeline
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Phase Navigation */}
      {isCompleted && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Content Phases
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PIPELINE_PHASES.map((phase, i) => (
              <Link
                key={phase}
                href={`/episodes/${id}/${PHASE_ROUTES[i]}`}
              >
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        Step {i + 1}
                      </Badge>
                      <p className="font-medium">{PHASE_LABELS[phase]}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Processing state */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <div>
                <p className="font-medium">Generating content...</p>
                <p className="text-sm text-muted-foreground">
                  Step {run?.currentStep || 1} of 5 —{" "}
                  {run?.currentStep
                    ? PHASE_LABELS[PIPELINE_PHASES[run.currentStep - 1]]
                    : "Starting"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
