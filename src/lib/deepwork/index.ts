import { readFile } from "fs/promises";
import { join } from "path";
import { parse as parseYaml } from "yaml";

const DEEPWORK_ROOT = join(process.cwd(), ".deepwork");
const JOBS_DIR = join(DEEPWORK_ROOT, "jobs");

export interface StepDefinition {
  id: string;
  name: string;
  description: string;
  instructions_file: string;
  inputs: { name?: string; description?: string; file?: string; from_step?: string }[];
  outputs: string[];
  dependencies: string[];
  hooks: {
    after_agent?: { prompt: string }[];
  };
}

export interface JobDefinition {
  name: string;
  version: string;
  summary: string;
  description: string;
  steps: StepDefinition[];
}

export async function loadJob(jobName: string): Promise<JobDefinition> {
  const jobPath = join(JOBS_DIR, jobName, "job.yml");
  const content = await readFile(jobPath, "utf-8");
  return parseYaml(content) as JobDefinition;
}

export async function loadStepInstructions(
  jobName: string,
  instructionsFile: string
): Promise<string> {
  const filePath = join(JOBS_DIR, jobName, instructionsFile);
  return readFile(filePath, "utf-8");
}

export function getQualityPrompt(step: StepDefinition): string | null {
  if (!step.hooks?.after_agent?.length) return null;
  return step.hooks.after_agent.map((h) => h.prompt).join("\n\n");
}
