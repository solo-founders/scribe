import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateContent(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 16384
): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }
  return textBlock.text;
}

const SYSTEM_PROMPT = `You are an expert podcast content strategist working for the Solo Founders Podcast. You produce high-quality, specific, actionable content — never generic filler.

Follow the step instructions precisely. Pay close attention to the Output Format section and Quality Criteria. When all quality criteria are met, include <promise>Quality Criteria Met</promise> in your response.`;

/**
 * Execute a DeepWork step with quality validation and retry.
 *
 * 1. Sends the step instructions + context to Claude
 * 2. Checks if the output contains the <promise> quality tag
 * 3. If not, runs the quality validation prompt and retries
 * 4. Returns the final validated output
 */
export async function executeStepWithValidation(
  stepInstructions: string,
  context: string,
  qualityPrompt: string | null,
  maxRetries: number = 2
): Promise<string> {
  let output = await generateContent(
    SYSTEM_PROMPT,
    `${stepInstructions}\n\n---\n\n## Context for this step\n\n${context}`
  );

  // Check for quality promise tag
  if (output.includes("<promise>")) {
    return output;
  }

  // If no promise tag and we have a quality prompt, validate and retry
  if (qualityPrompt) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const validationResult = await generateContent(
        "You are a quality reviewer for podcast content. Evaluate the content against the criteria below. Be specific about what's missing, weak, or generic. If everything passes, include <promise>Quality Criteria Met</promise>.",
        `## Quality Criteria\n\n${qualityPrompt}\n\n## Content to Review\n\n${output}`
      );

      if (validationResult.includes("<promise>")) {
        return output;
      }

      // Retry with revision feedback
      output = await generateContent(
        SYSTEM_PROMPT,
        `${stepInstructions}\n\n---\n\n## Context for this step\n\n${context}\n\n---\n\n## REVISION REQUIRED\n\nA quality review found these issues with your previous attempt:\n\n${validationResult}\n\nRegenerate the content addressing ALL issues above. Include <promise>Quality Criteria Met</promise> when done.`
      );

      if (output.includes("<promise>")) {
        return output;
      }
    }
  }

  return output;
}
