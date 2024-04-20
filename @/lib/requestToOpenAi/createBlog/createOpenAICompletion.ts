import { z } from "zod";

import { MessagesType, fetchOpenAICompletion } from "../fetchOpenAICompletion";
import { blogData } from "./standerdRes";

// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchema = z.object({
  title: z.string(),
  content: z.string(),
  imagePrompt: z.string(),
});

export type OpenAIResponse = {
  title: string;
  content: string;
  imagePrompt: string;
};

// The main function to create an OpenAI completion
export async function createOpenAICompletion(
  prompt: string
): Promise<OpenAIResponse> {
  const messages: MessagesType = [
    {
      role: "user",
      content: `Could you please craft a detailed JSON response that aligns with our Zod schema? The JSON object should feature a 'content' field formatted in markdown. This content needs to be an extensive and SEO-friendly blog post, spanning a minimum of 1000 words. It's essential that the post boasts a compelling title and delivers engaging, informative content relevant to the topic at hand. Be sure to use headings, bullet points, and concise paragraphs to enhance readability.

      Additionally, don't forget to incorporate 'imagePrompt' as an LLM prompt as another Key. This will help in sourcing topic-related images. Aim to provide a diverse array of descriptive and relevant image prompts to enrich the visual appeal and improve the searchability of the blog post.
      so your json will contain title: z.string(),content: z.string(),imagePrompt: z.string()`,
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
