import { requestForSingleOptionChange } from "../../@/lib/requestToOpenAi/requestForHeadding/requestForHeadding";

interface RequestData {
  prompt: string;
  option: string;
}

import { z } from "zod";

const requestDataSchema = z.object({
  prompt: z.string(),
  option: z.string(),
});

function validateInputs(data: RequestData): void {
  const validationResult = requestDataSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Invalid request data");
  }
}

export const runtime = "edge";

export default async function handleRequest(
  request: Request
): Promise<Response> {
  if (request.method !== "POST") {
    console.log({ request });
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const requestData = (await request.json()) as RequestData;
    validateInputs(requestData);
    const { prompt, option } = requestData;

    console.log(
      "🌟 Generating question with OpenAI(request-for-option-change)..."
    );
    const generatedQuestion = await requestForSingleOptionChange(
      prompt,
      option
    );
    console.log("🚀 Question generated successfully.", generatedQuestion);

    return new Response(JSON.stringify(generatedQuestion), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
