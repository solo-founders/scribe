import { PhasePage } from "@/components/phase-page";

export default function MiningPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <PhasePage
      params={params}
      phase="mining"
      title="Content Mining"
      description="Key quotes, video clip suggestions, and blog-worthy topics extracted from the episode"
    />
  );
}
