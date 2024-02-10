import { z } from "zod";
import { MessagesType, fetchOpenAICompletion } from "../fetchOpenAICompletion";
import { blogData } from "./standerdRes";


// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchema = z.object({
      title: z.string(),
      content: z.string(),
      imageTags: z.array(z.string())
});

export type OpenAIResponse = {
      title: string;
      content: string;
      imageTags: string[];
};

// The main function to create an OpenAI completion
export async function createOpenAICompletion(prompt: string): Promise<OpenAIResponse> {

      const messages: MessagesType = [
            {
                  role: "user",
                  content: `Please generate a response in a JSON format compatible with our Zod schema. The response should be a JSON object containing a 'content' as string in markdown format. The content should be an SEO-friendly blog post in markdown format, with a compelling title and engaging, informative content suitable for the topic. Use headings, bullet points, and short paragraphs.
                  also give me imagesTags as an array of string to search for topic related images
                  `,
            }, {
                  role: "system",
                  content: "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
            },
            {
                  role: "user",
                  content: `Example Response Format: ${JSON.stringify(blogData)}`,
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

      try {
            return await fetchOpenAICompletion(prompt, openAIResponseSchema, messages);
      } catch (error) {
            console.error("❌ Error fetching OpenAI completion:", error);
            throw error;
      }
}


