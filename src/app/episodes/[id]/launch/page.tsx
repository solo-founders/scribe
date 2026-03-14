import { PhasePage } from "@/components/phase-page";

export default function LaunchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <PhasePage
      params={params}
      phase="launch"
      title="Launch Content"
      description="Blog post, newsletter, X posts, and platform descriptions for launch day"
    />
  );
}
