import { z } from "zod";
import { MessagesType, fetchOpenAICompletion } from "../fetchOpenAICompletion";
import { exampleQuestionStructure } from "./standerdRes";


// Zod schema for the expected structure of the OpenAI API response
const openAIResponseSchema = z.record(z.object({
      question: z.string(),
      options: z.array(z.string()),
}));






// The main function to create an OpenAI completion
export async function requestForQuestion(prompt: string): Promise<{ data: string }> {

      const messages: MessagesType = [
            {
                  role: "user",
                  content: `
                  Given Topic:${prompt}

                  Generate a at max 3 questions that will help in understanding the requirements for creating a blog post. The questions should explore the depth of information required but should be simple to be ansrable by 6 year old boy. Please format the output as a JSON that matches the following structure for each question
                  (i.e: It should be an objects with keys as index where each object should have a 'question' key with a string value and an 'options' key with an array of strings):
                  {
                        1:{
                              "question": "The question text",
                              "options": [
                                    "Option 1",
                                    "Option 2",
                                    "Option 3",
                                    "Option 4"
                              ]
                        },
                        2:{
                              "question": "The question text",
                              "options": [
                                    "Option 1",
                                    "Option 2",
                                    "Option 3",
                                    "Option 4"
                              ]
                        }
                  }
                  
                  The output should be simple and straightforward, aiming to clarify the scope and focus of the blog post content. Here's an example of how the questions might look: ${exampleQuestionStructure}
                  
                  Based on this, create a new set of questions that could be used to guide the generation of a blog post that is SEO-friendly.`
                  ,
            }, {
                  role: "system",
                  content: "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
            },

            {
                  role: "system",
                  content: "As per the example, structure your response to fit our JSON format specification. The markdown formatted blog post should address the prompt provided, adhering to SEO best practices.",
            },
            {
                  role: "user",
                  content: `Keep in mind that the questions should be related to topic:${prompt} and can be asnwered by 6 year old`,
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


