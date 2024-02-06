import { z } from "zod";

const openAiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;

// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchema = z.object({
      title: z.string(),
      content: z.array(
            z.object({
                  // type: z.enum(["para", "points"]),
                  data: z.array(z.string()),
            })
      ),
});


// Function to make the API request to OpenAI
async function fetchOpenAICompletion(prompt: string, lastResponse = null, lastErrorMessage = null) {
      if (!openAiKey) {
            throw new Error("OpenAI key is not set in environment variables");
      }

      const messages = [
            {
                  role: "user",
                  content: `Please generate a response in a JSON format compatible with our Zod schema. The response should be a JSON object containing a 'content' array. Each element in 'content' should be an object with data as key and  as array of string it can be for para or points. The content should be an SEO-friendly blog post in markdown format, approximately 200 words, with a compelling title and engaging, informative content suitable for a digital marketing blog. Use headings, bullet points, and short paragraphs.`,
            }, {
                  role: "system",
                  content: "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
            },
            {
                  role: "user",
                  content: `Example Response Format: {"title":Best suted tile,"content": [ {
                  "message": {
                  "data": "### 3 Essential SEO Tips for 2024\n\n1. Optimize for voice search\n2. Leverage AI for content creation\n3. Focus on mobile-first indexing\n\nIn 2024, SEO is evolving rapidly..."
                  }}]}`,
            },
            {
                  role: "system",
                  content: "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
            },
            {
                  role: "user",
                  content: prompt,
            },
            {
                  role: "system",
                  content: "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
            },

      ]


      if (lastResponse) {
            messages.push({
                  role: "system",
                  content: lastResponse
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
            response_format: { "type": "json_object" },
            messages: messages,
      });


      const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${openAiKey}`,
            },
            body: body,
      });

      const responseData: any = await response.json();

      // Validate the response
      console.log("Validate the response ✅", responseData)
      const parseResult: any = openAIResponseSchema.safeParse(JSON.parse(responseData.choices[0].message.content));
      console.log({ parseResult, responseData: responseData.choices[0].message.content, })
      if (parseResult.success) {
            console.log("🚀: got value in parse Result ")
            return parseResult;
      } else {
            console.error("❌", "Validation failed, retrying with error details:", parseResult.error);
            return fetchOpenAICompletion(prompt, responseData.choices[0].message.content, JSON.stringify(parseResult.error));
      }
}

// The main function to create an OpenAI completion
export async function createOpenAICompletion(prompt: string): Promise<{ data: string }> {
      try {
            return await fetchOpenAICompletion(prompt);
      } catch (error) {
            console.error("❌ Error fetching OpenAI completion:", error);
            throw error;
      }
}
