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
                  content: `
                  Given Topic:${prompt}

                  Generate 8-10 headings to include in in th eblog for the given Topic. Please format the output as a JSON that matches the following structure for each question
                  (i.e: It should be an objects with keys 'headingsOption' value array of strings):
                  {
                       headingsOption: ["heading 1", "heading 2", "heading 3"]
                  }
                  
                  The output should be simple and straightforward, aiming to clarify the scope and focus of the blog post content. Here's an example of how the object might look: ${exampleQuestionStructure}
                  
                  Based on this, create a new set of questions that could be used to guide the generation of a blog if blog topic is to much specification.`

            },


      ]

      try {
            return await fetchOpenAICompletion(openAIResponseSchema, messages);
      } catch (error) {
            console.error("❌ Error fetching OpenAI completion:", error);
            throw error;
      }
}


