import { z } from "zod";

import { MessagesType, fetchOpenAICompletion } from "../fetchOpenAICompletion";
import { exampleQuestionStructure } from "./standerdRes";

// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchema = z.object({
  headingsOption: z.array(z.string()),
});

// The main function to create an OpenAI completion
export async function requestForHeadding(prompt: string) {
  // return exampleQuestionStructure
  const messages: MessagesType = [
    {
      role: "user",
      content: `Given Topic: ${prompt}

      Generate 8 headings to include in the blog post for the given topic. The headings should cover key aspects, subtopics, or focal points related to the topic. 
      Please format the output as a JSON that matches the following structure for each question
      (i.e: It should be an objects with keys 'headingsOption' value array of strings):
      Example JSON structure: {
        headingsOption: ["heading 1", "heading 2", "heading 3"]
      }
      Ensure that the headings provide a clear outline of the content to be covered in the blog post and are relevant to the given topic. Dont add number at the start`,
    },
  ];

  try {
    return await fetchOpenAICompletion(openAIResponseSchema, messages);
  } catch (error) {
    console.error("❌ Error fetching OpenAI completion:", error);
    throw error;
  }
}

export const singleHeadingOptionSchema = z.string();




// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchemaForSingleOption = z.object({
  heading: (z.string()),
});


export async function requestForSingleOptionChange(
  prompt: string,
  option: string,
  newOption?: boolean
): Promise<string> {
  const messages: MessagesType = [
    {
      role: "user",
      content: `
      Given Topic: ${prompt}
      ${newOption ? "Generate a new heading option for the blog post" : `Generate a new heading option for the blog post considering the provided topic and the specified option: "${option}"`}
      This heading should provide additional insight into the blog post content. Max length of 15 words.
      Example JSON structure: { heading: "heading" }
`,
    },
  ];

  try {
    console.log("runnning fetch OpenAi");
    const response = await fetchOpenAICompletion(
      openAIResponseSchemaForSingleOption,
      messages
    );
    // Extract the first heading option from the OpenAI response
    console.log({ response });
    // const newOption = response.headingsOption[0];
    return response;
  } catch (error) {
    console.error("❌ Error fetching OpenAI completion:", error);
    throw error;
  }
}
