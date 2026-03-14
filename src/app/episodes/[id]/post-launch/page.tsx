import { PhasePage } from "@/components/phase-page";

export default function PostLaunchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <PhasePage
      params={params}
      phase="post_launch"
      title="Post-Launch Content"
      description="Derivative blog posts, 14-day social calendar, quote cards, and cross-promotion strategy"
    />
  );
}
