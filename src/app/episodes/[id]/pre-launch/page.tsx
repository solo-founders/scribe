import { PhasePage } from "@/components/phase-page";

export default function PreLaunchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <PhasePage
      params={params}
      phase="pre_launch"
      title="Pre-Launch Content"
      description="Teaser posts for X (brand + personal accounts) and newsletter teaser to build anticipation"
    />
  );
}
