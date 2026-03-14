export const PIPELINE_PHASES = [
  "foundation",
  "mining",
  "pre_launch",
  "launch",
  "post_launch",
] as const;

export type Phase = (typeof PIPELINE_PHASES)[number];

export const PHASE_LABELS: Record<Phase, string> = {
  foundation: "Foundation",
  mining: "Content Mining",
  pre_launch: "Pre-Launch",
  launch: "Launch",
  post_launch: "Post-Launch",
};

export interface ContentItemInsert {
  type: string;
  phase: Phase;
  title?: string;
  body: string;
  metadata?: Record<string, unknown>;
  sortOrder?: number;
}
