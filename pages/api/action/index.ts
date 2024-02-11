// import OpenAI from "openai";
import { decode } from "base64-arraybuffer";
import { getServiceSupabase } from "../../../@/lib/supabase";
import { ApplicationError } from "../../../@/lib/error";
import { createOpenAICompletion } from "../../../@/lib/requestToOpenAi/createBlog/createOpenAICompletion";

export const runtime = "edge";

const supabaseClient = getServiceSupabase();
const apiKey = process.env.NEXT_PUBLIC_SIGMIND_API_KEY;
const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL;

function validateInputs(prompt: string): void {
  if (!prompt) {
    throw new Error("Prompt is missing");
  }

  if (!projectId || !apiKey) {
    throw new ApplicationError("One or more environment variables are missing");
  }
}

async function generateSegmindImage(prompt: string) {
  const url = "https://api.segmind.com/v1/ssd-1b";
  const data = {
    prompt: `${prompt},typography, dark fantasy, wildlife photography, vibrant, cinematic and on a black background instagram, 8k, volumetric light, cinematic, octane render, uplight, no blur, 8k`,
    negative_prompt: "scary, cartoon, painting",
    samples: 1,
    scheduler: "UniPC",
    num_inference_steps: 25,
    guidance_scale: 9,
    seed: 36446545871,
    img_width: 1024,
    img_height: 1024,
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
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const imageBlob = (await response.json()) as { image: string };
    return imageBlob.image;
  } catch (error) {
    console.error("Error generating image: 💥", error);
    throw new Error(`Error generating image:${error.message} 💥`);
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
  imagePath: string,
): Promise<{ id: number }> {
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
    throw new Error(`Failed to create blog post: ${error.message}`);
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

    console.log("Generating blog content with OpenAI...");
    const blogContent = await createOpenAICompletion(prompt);
    console.log("Blog content generated successfully.", blogContent);

    console.log("Generating image with Sigmind...");
    const imageBuffer = await generateSegmindImage(
      blogContent.imageTags.join(),
    );
    console.log("Image generated successfully.");

    console.log("Uploading image to Supabase...");
    const imagePath = await uploadImageToSupabase(imageBuffer);
    console.log("Image uploaded successfully. Path:", imagePath);

    const blogData = await createBlogPostInSupabase(
      prompt,
      JSON.stringify(blogContent),
      imagePath,
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
