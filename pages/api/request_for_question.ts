import { requestForHeadding } from "../../@/lib/requestToOpenAi/requestForHeadding/requestForHeadding";



interface RequestData {
      prompt: string;
}


function validateInputs(prompt: string): void {
      if (!prompt) {
            throw new Error("Prompt is missing");
      }

}

export const runtime = "edge";

export default async function handler(request: Request): Promise<Response> {
      if (request.method !== "POST") {
            console.log({ request });
            return new Response("Method Not Allowed", { status: 405 });
      }

      try {
            const data = (await request.json()) as RequestData;
            const prompt = data?.prompt;

            validateInputs(prompt);

            console.log("🌟 Generating question with OpenAI...");
            const questions = await requestForHeadding(prompt);
            console.log("🚀 Question generated successfully.");



            return new Response(JSON.stringify(questions), {
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