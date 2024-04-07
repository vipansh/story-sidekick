import { ZodSchema } from "zod";

export type MessagesType = Array<{ role: "system" | "user"; content: string }>;

export async function fetchOpenAICompletion(
  openAIResponseSchema: ZodSchema,
  messages: MessagesType,
  lastResponse = null,
  lastErrorMessage = null
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

  const responseData: any = await response.json();
  console.log("Validate the response ✅", responseData);
  try {
    const parseResult: any = openAIResponseSchema.safeParse(
      JSON.parse(responseData?.choices?.[0]?.message?.content)
    );
    if (parseResult.success) {
      console.log("✅ Resonse is Validate", parseResult.data);
      return parseResult.data;
    } else {
      console.error(
        "❌ Validation failed, retrying with error details:",
        parseResult.error
      );
      return fetchOpenAICompletion(
        openAIResponseSchema,
        messages,
        responseData.choices[0].message.content,
        JSON.stringify(parseResult.error)
      );
    }
  } catch (error) {
    console.log("roor in json parse:", error);
    throw new Error(error);
  }
}
