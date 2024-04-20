import { ZodFormattedError, ZodSchema, z } from "zod";

export type MessagesType = Array<{ role: "system" | "user"; content: string }>;


export type GenerationPrompt = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    logprobs: null;
    finish_reason: string;
    index: number;
  }>;
};


export async function fetchOpenAICompletion(
  openAIResponseSchema: ZodSchema,
  messages: MessagesType,
  lastResponse: string | null = null,
  lastErrorMessage: string | null = null
) {
  const openAiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
  if (!openAiKey) {
    throw new Error("OpenAI key is not set in environment variables");
  }

  if (lastResponse) {
    messages.push({
      role: "system",
      content: lastResponse,
    });
  }

  if (lastErrorMessage) {
    messages.push({
      role: "user",
      content: lastErrorMessage,
    });
  }

  const body = JSON.stringify({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    messages: messages,
  });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body,
  });

  const responseData: GenerationPrompt = await response.json();
  console.log("Validate the response ✅", responseData);
  try {
    const parseResult = openAIResponseSchema.safeParse(
      JSON.parse(responseData?.choices?.[0]?.message?.content)
    );
    if (parseResult.success) {
      console.log("✅ Resonse is Validate", parseResult.data);
      return parseResult.data;
    } else {
      const failureResult = parseResult as any
      console.error(
        "❌ Validation failed, retrying with error details:",
        failureResult.error
      );
      return fetchOpenAICompletion(
        openAIResponseSchema,
        messages,
        responseData.choices[0].message.content,
        JSON.stringify(failureResult.error)
      );
    }
  } catch (error: any) {
    console.log("roor in json parse:", error);
    throw new Error(error);
  }
}
