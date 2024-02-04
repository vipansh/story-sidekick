// import OpenAI from "openai";
import { decode } from "base64-arraybuffer";
import { getServiceSupabase } from "../../../@/lib/supabase";
import { ApplicationError } from "../../../@/lib/error";

export const runtime = "edge";

const supabaseClient = getServiceSupabase();
const apiKey = process.env.NEXT_PUBLIC_SIGMIND_API_KEY;
const openAiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL;

function validateInputs(prompt: string): void {
  if (!prompt) {
    throw new Error("Prompt is missing");
  }

  if (!openAiKey || !projectId || !apiKey) {
    throw new ApplicationError("One or more environment variables are missing");
  }
}

console.log({ projectId });

async function createOpenAICompletion(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in SEO. Create a SEO-friendly blog post in markdown format including a compelling title. The blog post should be around 200 words.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const chatCompletion: any = await response.json();

  return chatCompletion.choices[0].message?.content || "";
}

async function generateSegmindImage(prompt: string) {
  const url = "https://api.segmind.com/v1/sd1.5-cyberrealistic";
  const data = {
    prompt: prompt,
    negative_prompt: "CyberRealistic_Negative",
    scheduler: "dpmpp_2m",
    num_inference_steps: 25,
    guidance_scale: 7.5,
    samples: 1,
    seed: 945216760,
    img_width: 512,
    img_height: 768,
    base64: true,
  };

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey || "",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const imageBlob = (await response.json()) as { image: string };
    return imageBlob.image;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error generating image");
  }
}

async function uploadImageToSupabase(imageBuffer: any): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
  const filePath = `blog2_${timestamp}`;

  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(filePath, decode(imageBuffer), {
      contentType: "image/jpeg",
    });

  if (error) {
    console.log(error);
    throw new ApplicationError("Unable to upload image");
  }

  return data.path;
}

async function createBlogPostInSupabase(
  prompt: string,
  blogContent: string,
  imagePath: string
): Promise<any> {
  const imageUrl = `${projectId}/storage/v1/object/public/images/${imagePath}`;

  const { data, error } = await supabaseClient
    .from("blogs")
    .insert([
      {
        title: prompt,
        content: blogContent,
        imageUrl: imageUrl,
        userId: "123",
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Failed to create blog post");
  }

  return data[0];
}

interface RequestData {
  prompt: string;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    console.log({ request });
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const data = (await request.json()) as RequestData;
    const prompt = data?.prompt;

    validateInputs(prompt);

    console.log("Generating image with Sigmind...");
    const imageBuffer = await generateSegmindImage(prompt);
    console.log("Image generated successfully.");

    console.log("Uploading image to Supabase...");
    const imagePath = await uploadImageToSupabase(imageBuffer);
    console.log("Image uploaded successfully. Path:", imagePath);

    console.log("Generating blog content with OpenAI...");
    const blogContent = await createOpenAICompletion(prompt);
    console.log("Blog content generated successfully.");

    const blogData = await createBlogPostInSupabase(
      prompt,
      blogContent,
      imagePath
    );

    return new Response(JSON.stringify({ blogId: blogData.id }), {
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
