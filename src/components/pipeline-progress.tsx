"use client";

import { cn } from "@/lib/utils";
import { PIPELINE_PHASES, PHASE_LABELS, type Phase } from "@/lib/pipeline/types";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import Link from "next/link";

interface PipelineProgressProps {
  episodeId: string;
  currentStep: number;
  status: string;
  activePhase?: Phase;
}

const PHASE_ROUTES: Record<Phase, string> = {
  foundation: "foundation",
  mining: "mining",
  pre_launch: "pre-launch",
  launch: "launch",
  post_launch: "post-launch",
};

export function PipelineProgress({
  episodeId,
  currentStep,
  status,
  activePhase,
}: PipelineProgressProps) {
  return (
    <div className="flex items-center gap-1 w-full">
      {PIPELINE_PHASES.map((phase, index) => {
        const stepNum = index + 1;
        const isComplete =
          status === "completed" || (status === "running" && stepNum < currentStep);
        const isActive = status === "running" && stepNum === currentStep;
        const isPending = !isComplete && !isActive;
        const isClickable = isComplete || status === "completed";

        const content = (
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1",
              isComplete && "bg-green-50 text-green-700 border border-green-200",
              isActive && "bg-blue-50 text-blue-700 border border-blue-200",
              isPending && "bg-muted text-muted-foreground border border-transparent",
              activePhase === phase && "ring-2 ring-primary ring-offset-2",
              isClickable && "hover:bg-green-100 cursor-pointer"
            )}
          >
            {isComplete && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {isActive && <Loader2 className="w-4 h-4 shrink-0 animate-spin" />}
            {isPending && <Circle className="w-4 h-4 shrink-0" />}
            <span className="truncate">{PHASE_LABELS[phase]}</span>
          </div>
        );

        return (
          <div key={phase} className="flex items-center gap-1 flex-1">
            {isClickable ? (
              <Link
                href={`/episodes/${episodeId}/${PHASE_ROUTES[phase]}`}
                className="flex-1"
              >
                {content}
              </Link>
            ) : (
              <div className="flex-1">{content}</div>
            )}
            {index < PIPELINE_PHASES.length - 1 && (
              <div
                className={cn(
                  "w-4 h-px shrink-0",
                  isComplete ? "bg-green-300" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
