import { z } from "zod";

import { MessagesType, fetchOpenAICompletion } from "../fetchOpenAICompletion";
import { blogData } from "./standerdRes";

// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageTags: z.array(z.string()),
});
const openAIMarkdownResponseSchema = z.string();
export type OpenAIResponse = {
  title: string;
  content: string;
  imageTags: string[];
};

// The main function to create an OpenAI completion
export async function createOpenAICompletion(
  prompt: string
): Promise<OpenAIResponse> {
  const messages: MessagesType = [
    {
      role: "user",
      content: `Please generate a detailed response in a JSON format that adheres to our Zod schema. The response should consist of a JSON object with a 'content' field in markdown format. The content should be a comprehensive SEO-friendly blog post with a minimum of 1000 words. Ensure the post has a captivating title and engaging, informative content relevant to the topic. Utilize headings, bullet points, and concise paragraphs. Additionally, include imageTags as an array of strings to facilitate searching for topic-related images.
                  `,
    },
    {
      role: "system",
      content:
        "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
    },
    {
      role: "user",
      content: `Example Response Format: ${JSON.stringify(blogData)}`,
    },
    {
      role: "system",
      content:
        "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    return await fetchOpenAICompletion(openAIResponseSchema, messages);
  } catch (error) {
    console.error("❌ Error fetching OpenAI completion:", error);
    throw error;
  }
}
