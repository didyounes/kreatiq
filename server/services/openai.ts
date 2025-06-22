import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "sk-test-key-not-configured"
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
  // Check if API key is properly configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-test-key-not-configured") {
    console.log('Using demo content generation - API key not configured');
    return { ideas: generateDemoContent(request) };
  }

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
    console.log('Falling back to demo content due to API error');
    return { ideas: generateDemoContent(request) };
  }
}

function generateDemoContent(request: ContentGenerationRequest) {
  const { topic, contentType, platform } = request;
  
  const demoTemplates = {
    social: [
      {
        title: `${topic} - Quick Tips That Work`,
        description: `Share practical tips about ${topic} that your audience can apply immediately.`,
        content: `Quick ${topic} tips that actually work:\n\n1. Start with the basics\n2. Stay consistent\n3. Track your progress\n4. Celebrate small wins\n\nWhich tip will you try first?\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #tips #motivation`,
        tags: [topic.replace(/\s+/g, '').toLowerCase(), "tips", "motivation", "productivity"]
      },
      {
        title: `The Truth About ${topic}`,
        description: `Debunk common myths and share real insights about ${topic}.`,
        content: `Let's talk about ${topic}\n\nMyth: It's too complicated to start\nReality: Small steps lead to big results\n\nMyth: You need expensive tools\nReality: Start with what you have\n\nWhat other myths have you heard? Share below!`,
        tags: [topic.replace(/\s+/g, '').toLowerCase(), "truth", "myths", "reality"]
      }
    ],
    blog: [
      {
        title: `The Complete Guide to ${topic}: Everything You Need to Know`,
        description: `A comprehensive guide covering all aspects of ${topic} for beginners and experts alike.`,
        content: `# The Complete Guide to ${topic}\n\n## Introduction\nWhy ${topic} matters in today's world...\n\n## Getting Started\n- Essential concepts\n- Common mistakes to avoid\n- Tools and resources\n\n## Advanced Strategies\n- Pro tips and techniques\n- Case studies\n- Best practices\n\n## Conclusion\nKey takeaways and next steps...`,
        tags: [topic.replace(/\s+/g, '').toLowerCase(), "guide", "tutorial", "comprehensive"]
      }
    ],
    video: [
      {
        title: `${topic} in 60 Seconds - Quick Tutorial`,
        description: `A fast-paced video tutorial explaining the key concepts of ${topic}.`,
        content: `VIDEO SCRIPT:\n\nHook (0-3s): "Want to master ${topic}? Here's everything in 60 seconds!"\n\nContent (3-50s):\n- Point 1: Core concept\n- Point 2: Key benefit\n- Point 3: Quick tip\n\nCall to Action (50-60s): "Like for more quick tutorials and follow for daily tips!"\n\nVisuals: Fast cuts, text overlays, engaging graphics`,
        tags: [topic.replace(/\s+/g, '').toLowerCase(), "tutorial", "quick", "howto"]
      }
    ],
    email: [
      {
        title: `Weekly ${topic} Newsletter - Tips & Insights`,
        description: `A newsletter format sharing valuable insights and tips about ${topic}.`,
        content: `Subject: This week's ${topic} insights will surprise you\n\nHi [Name],\n\nThis week in ${topic}:\n\n- Trending insight: [Key point]\n- By the numbers: [Statistic]\n- Quick tip: [Actionable advice]\n- Worth reading: [Resource link]\n\nUntil next week,\n[Your name]\n\nP.S. What ${topic} topic should we cover next? Just reply!`,
        tags: [topic.replace(/\s+/g, '').toLowerCase(), "newsletter", "weekly", "insights"]
      }
    ]
  };

  const contentTemplates = demoTemplates[contentType as keyof typeof demoTemplates] || demoTemplates.social;
  
  // Add platform-specific content if available
  if (platform && contentType === 'social') {
    const platformContent = {
      title: `${topic} Strategy for ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      description: `Platform-specific content strategy for ${topic} on ${platform}.`,
      content: `${platform.toUpperCase()} STRATEGY for ${topic}:\n\n- Optimize for ${platform}'s algorithm\n- Use trending hashtags\n- Post at peak engagement times\n- Engage with your community\n\nReady to grow on ${platform}? Let's do this!`,
      tags: [topic.replace(/\s+/g, '').toLowerCase(), platform, "strategy", "growth"]
    };
    return [...contentTemplates, platformContent];
  }

  return contentTemplates;
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  // Check if API key is properly configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-test-key-not-configured") {
    return generateDemoChatResponse(message);
  }

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

function generateDemoChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your AI content assistant. I'm currently running in demo mode since no API key is configured, but I can still help you understand how Kreatiq works! Try asking me about content creation, social media strategies, or use the 'Generate Ideas' feature to see sample content.";
  }
  
  if (lowerMessage.includes('social media') || lowerMessage.includes('instagram') || lowerMessage.includes('twitter')) {
    return "Great question about social media! Here are some proven strategies:\n\n• Post consistently (3-5 times per week minimum)\n• Use platform-specific hashtags (#trending #content)\n• Engage with your audience within 2 hours of posting\n• Share behind-the-scenes content to build connection\n• Use visual storytelling with high-quality images\n\nWould you like me to help you generate specific social media content ideas? Try the 'Generate Ideas' button!";
  }
  
  if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('writing')) {
    return "Blog content is powerful for building authority! Here's what works:\n\n• Focus on solving specific problems your audience faces\n• Use clear headlines with numbers or questions\n• Include actionable tips readers can implement immediately\n• Optimize for SEO with relevant keywords\n• Add internal links to keep readers engaged\n\nTip: Start with topics your audience frequently asks about. What niche are you writing in?";
  }
  
  if (lowerMessage.includes('video') || lowerMessage.includes('youtube') || lowerMessage.includes('tiktok')) {
    return "Video content performs incredibly well! Here are key tips:\n\n• Hook viewers in the first 3 seconds\n• Keep videos under 60 seconds for social platforms\n• Use captions (80% watch without sound)\n• Include a clear call-to-action\n• Maintain consistent posting schedule\n\nFor longer content: Tell stories, provide tutorials, or share behind-the-scenes content. What type of videos are you planning?";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
    return "I'm here to help with your content creation! I can assist with:\n\n✨ Content idea generation\n📱 Social media strategies\n📝 Blog post planning\n🎥 Video content ideas\n📧 Email marketing\n📅 Content calendar planning\n\nCurrently running in demo mode - to unlock full AI capabilities, add your OpenAI API key in the environment settings. What would you like to work on first?";
  }
  
  return `That's an interesting question about content creation! While I'm in demo mode, I can share that successful content typically:\n\n• Solves a specific problem for your audience\n• Provides clear value or entertainment\n• Uses engaging visuals and compelling headlines\n• Includes a call-to-action\n\nFor personalized AI-powered content suggestions, you'll need to configure an OpenAI API key. In the meantime, try using the 'Generate Ideas' feature to see sample content templates!\n\nWhat type of content are you most interested in creating?`;
}
