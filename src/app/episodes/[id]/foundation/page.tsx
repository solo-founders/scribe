import { PhasePage } from "@/components/phase-page";

export default function FoundationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <PhasePage
      params={params}
      phase="foundation"
      title="Foundation"
      description="Episode titles, description, guest bio, and timestamped show notes"
    />
  );
}
