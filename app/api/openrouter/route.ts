// app/api/openrouter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { portfolioKnowledge } from "@/lib/portfolio-knowledge";

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OpenRouter API key not configured");
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    // Get the site URL from the request headers
    const siteUrl = request.headers.get("origin") || "https://muhammad-ali-ai-engineer.vercel.app";
    const siteName = "Muhammad Ali Portfolio";

    // Format conversation history
    const messages = [
      {
        role: "system",
        content: `You are Muhammad Ali's AI assistant for his portfolio website. Use the following information to answer questions about Muhammad Ali, his skills, experience, education, and projects. Be friendly, professional, and concise.

${portfolioKnowledge}

Guidelines:
- Answer questions accurately based only on the provided information
- If asked about something not in the knowledge base, politely say you don't have that information
- Keep responses concise but informative (2-3 sentences usually)
- Be enthusiastic about Muhammad's work in AI/ML
- If someone wants to contact him, provide his email and suggest using the contact section`,
      },
      ...conversationHistory.slice(-10).map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Try multiple models for better reliability
    const models = [
      "mistralai/mistral-7b-instruct", // Fast and free
      "meta-llama/llama-3-8b-instruct", // Good performance
      "gryphe/mythomax-l2-13b", // Alternative
    ];

    let lastError = null;
    
    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": siteUrl,
            "X-Title": siteName,
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Model ${model} failed:`, errorData);
          lastError = errorData;
          continue; // Try next model
        }

        const data = await response.json();
        console.log(`Model ${model} succeeded`);
        
        return NextResponse.json({ 
          response: data.choices[0].message.content,
          model: model // Optional: return which model was used
        });
        
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        lastError = error;
        continue;
      }
    }

    // If all models fail
    throw new Error(lastError?.message || "All models failed");
    
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    
    // Return a user-friendly error message
    return NextResponse.json(
      { 
        error: "I'm having trouble connecting right now. Please try again in a moment.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

