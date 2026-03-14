import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EpisodeCardProps {
  id: string;
  title: string;
  guestName?: string | null;
  status: string;
  createdAt: string;
  contentCount?: number;
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

export function EpisodeCard({
  id,
  title,
  guestName,
  status,
  createdAt,
  contentCount,
}: EpisodeCardProps) {
  return (
    <Link href={`/episodes/${id}`}>
      <Card className="hover:border-primary/50 transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge className={STATUS_STYLES[status] || ""} variant="secondary">
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {guestName && <span>Guest: {guestName}</span>}
            <span>{new Date(createdAt).toLocaleDateString()}</span>
            {contentCount !== undefined && contentCount > 0 && (
              <span>{contentCount} content pieces</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
