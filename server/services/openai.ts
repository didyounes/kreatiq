import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface ContentGenerationRequest {
  topic: string;
  contentType: string;
  platform?: string;
  tone?: string;
  targetAudience?: string;
  additionalContext?: string;
}

export interface ContentGenerationResponse {
  ideas: Array<{
    title: string;
    description: string;
    content: string;
    tags: string[];
  }>;
}

export async function generateContentIdeas(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
  try {
    const prompt = `You are an AI content creation assistant. Generate creative and engaging content ideas based on the following request:

Topic: ${request.topic}
Content Type: ${request.contentType}
Platform: ${request.platform || 'General'}
Tone: ${request.tone || 'Professional but engaging'}
Target Audience: ${request.targetAudience || 'General audience'}
Additional Context: ${request.additionalContext || 'None'}

Please generate 3-5 content ideas. For each idea, provide:
1. A catchy title
2. A brief description (1-2 sentences)
3. The actual content (post text, script outline, or article outline depending on content type)
4. Relevant tags/hashtags

Return the response in JSON format with this structure:
{
  "ideas": [
    {
      "title": "Content Title",
      "description": "Brief description of the content",
      "content": "The actual content text, script, or outline",
      "tags": ["tag1", "tag2", "tag3"]
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional content creation assistant specializing in generating engaging, platform-specific content for creators and marketers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || '{"ideas": []}');
    return result as ContentGenerationResponse;
  } catch (error) {
    console.error('Error generating content ideas:', error);
    throw new Error(`Failed to generate content ideas: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `You are Kreatiq's AI content assistant. You help content creators generate ideas, plan content, and automate their workflows. 

You are helpful, creative, and collaborative. You understand various content types including:
- Social media posts (Instagram, Twitter, LinkedIn, TikTok, etc.)
- Blog articles and SEO content
- Video scripts and descriptions
- Email marketing content
- Podcast topics and outlines

When users ask for content ideas, provide specific, actionable suggestions. Always consider:
- Platform-specific best practices
- Audience engagement strategies
- Current trends and topics
- SEO optimization when relevant

Be conversational and encouraging while providing valuable insights.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...(context ? [{ role: "user", content: `Context: ${context}` }] : []),
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error(`Failed to generate chat response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
