import { db } from "@/lib/db";
import { episodes, contentItems } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { EpisodeCard } from "@/components/episode-card";
import { ImportButton } from "@/components/import-button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const allEpisodes = await db
    .select()
    .from(episodes)
    .orderBy(desc(episodes.createdAt));

  // Get content counts per episode
  const contentCounts = await db
    .select({
      episodeId: contentItems.episodeId,
      count: sql<number>`count(*)`,
    })
    .from(contentItems)
    .groupBy(contentItems.episodeId);

  const countMap = new Map(
    contentCounts.map((c) => [c.episodeId, Number(c.count)])
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Episodes</h1>
          <p className="text-muted-foreground mt-1">
            Transform podcast episodes into multi-platform content
          </p>
        </div>
        <ImportButton />
      </div>

      {allEpisodes.length === 0 ? (
        <div className="text-center py-16 border rounded-lg border-dashed">
          <h3 className="text-lg font-medium mb-2">No episodes yet</h3>
          <p className="text-muted-foreground mb-4">
            Import past episodes or create a new one to get started
          </p>
          <div className="flex gap-3 justify-center">
            <ImportButton variant="outline" />
            <Link
              href="/episodes/new"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
            >
              New Episode
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {allEpisodes.map((ep) => (
            <EpisodeCard
              key={ep.id}
              id={ep.id}
              title={ep.title}
              guestName={ep.guestName}
              status={ep.status}
              createdAt={ep.createdAt.toISOString()}
              contentCount={countMap.get(ep.id) || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
