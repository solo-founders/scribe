"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEpisodePage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [transcript, setTranscript] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !transcript.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectName.trim() || null,
          guestName: guestName.trim(),
          episodeNumber: episodeNumber.trim() || null,
          transcript: transcript.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create episode");
      }

      const episode = await res.json();
      router.push(`/episodes/${episode.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">New Episode</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Episode Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="guest">Guest Name</Label>
              <Input
                id="guest"
                placeholder="e.g., Ben Broca"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name (optional)</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., ep03_jane_smith"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Internal reference only
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="episodeNumber">Episode Number (optional)</Label>
                <Input
                  id="episodeNumber"
                  placeholder="e.g., 03"
                  value={episodeNumber}
                  onChange={(e) => setEpisodeNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transcript">Transcript</Label>
              <Textarea
                id="transcript"
                placeholder="Paste your episode transcript here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={20}
                className="font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground">
                Paste the full transcript with speaker labels and timestamps.
                The pipeline will generate episode titles, descriptions, and all
                content from this.
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Creating..." : "Create Episode"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
