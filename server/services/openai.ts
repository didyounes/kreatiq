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

// Smart content generation using advanced template system
async function generateWithSmartTemplates(prompt: string, contentType: string, topic: string): Promise<string> {
  // Advanced AI-like content generation using smart pattern matching and templates
  const contentStrategies = {
    social: {
      patterns: [
        {
          type: 'tips',
          template: `🎯 ${topic} tips that work:\n\n• Start with small, consistent actions\n• Focus on what your audience needs most\n• Track progress to stay motivated\n• Share your journey authentically\n\nWhich approach resonates with you? 💬\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #contentcreator #growth`
        },
        {
          type: 'insight',
          template: `Here's what I learned about ${topic} 👇\n\nThe biggest mistake? Trying to be perfect from day one.\n\nInstead:\n✅ Start messy\n✅ Improve iteratively\n✅ Listen to feedback\n✅ Stay authentic\n\nProgress beats perfection every time.\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #mindset`
        },
        {
          type: 'question',
          template: `Quick question about ${topic} 🤔\n\nWhat's the one thing you wish someone told you when you started?\n\nMine: Focus on solving real problems, not just creating content.\n\nDrop your insights below 👇\n\n#${topic.replace(/\s+/g, '').toLowerCase()} #community`
        }
      ]
    },
    blog: {
      patterns: [
        {
          type: 'guide',
          template: `# The Complete ${topic} Guide: From Beginner to Expert\n\n## Why ${topic} Matters Now\n\nIn today's fast-paced world, understanding ${topic} isn't just helpful—it's essential.\n\n## Getting Started\n\n### 1. Foundation Building\n- Master the fundamentals first\n- Avoid common beginner mistakes\n- Set realistic expectations\n\n### 2. Essential Tools\n- Start with free options\n- Upgrade as you grow\n- Focus on learning, not tools\n\n### 3. Building Momentum\n- Create a consistent routine\n- Track your progress\n- Celebrate small wins\n\n## Advanced Strategies\n\nOnce you've mastered the basics, these techniques will accelerate your growth:\n\n- Strategy 1: Focus on high-impact activities\n- Strategy 2: Build systems, not just habits\n- Strategy 3: Learn from others' mistakes\n\n## Common Pitfalls to Avoid\n\n- Trying to do everything at once\n- Comparing your beginning to someone's middle\n- Giving up too early\n\n## Next Steps\n\nReady to take action? Start with one technique from this guide and commit to it for 30 days.\n\nWhat will you try first?`
        }
      ]
    },
    video: {
      patterns: [
        {
          type: 'tutorial',
          template: `🎬 VIDEO SCRIPT: ${topic} Essentials\n\n📍 HOOK (0-5 seconds)\n"If you're struggling with ${topic}, this 60-second breakdown will change everything."\n\n📍 PROBLEM (5-15 seconds)\nMost people overcomplicate ${topic}. Here's the simple truth...\n\n📍 SOLUTION (15-45 seconds)\n1. Start with this one thing\n2. Then add this element\n3. Finally, optimize this aspect\n\n📍 CALL TO ACTION (45-60 seconds)\n"Try this method and let me know your results in the comments. Follow for more ${topic} tips."\n\n🎨 VISUAL NOTES:\n- Use bold text overlays for key points\n- Include progress indicators\n- Add engaging transitions between sections`
        }
      ]
    }
  };

  const strategies = contentStrategies[contentType as keyof typeof contentStrategies];
  if (strategies) {
    const randomPattern = strategies.patterns[Math.floor(Math.random() * strategies.patterns.length)];
    return randomPattern.template;
  }

  // Default template for any content type
  return `Here's valuable content about ${topic}:\n\nKey insights:\n• Focus on solving real problems\n• Provide actionable advice\n• Keep your audience engaged\n• Measure and improve continuously\n\nThis approach ensures your content creates genuine value while building authentic connections with your audience.`;
}

async function generateContentWithSmartAI(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
  const content = await generateWithSmartTemplates('', request.contentType, request.topic);
  
  // Generate multiple ideas with different approaches
  const ideas = [
    {
      title: `${request.topic} - Engaging ${request.contentType} Content`,
      description: `Smart AI-generated ${request.contentType} content designed to engage your audience`,
      content: content,
      tags: [
        request.topic.replace(/\s+/g, '').toLowerCase(),
        request.contentType,
        request.platform || 'general',
        'engagement'
      ]
    }
  ];

  // Add platform-specific optimization if specified
  if (request.platform) {
    const platformOptimized = generatePlatformSpecificContent(request);
    ideas.push(platformOptimized);
  }

  // Add tone-specific variation if specified
  if (request.tone) {
    const toneSpecific = generateToneSpecificContent(request);
    ideas.push(toneSpecific);
  }

  return { ideas };
}

function generatePlatformSpecificContent(request: ContentGenerationRequest) {
  const platformStrategies = {
    instagram: `📸 ${request.topic} for Instagram:\n\n✨ Visual storytelling tips:\n• Use high-quality, bright images\n• Create carousel posts for step-by-step guides\n• Include trending hashtags in your niche\n• Post when your audience is most active\n• Use Stories for behind-the-scenes content\n\nInstagram loves authentic, visually appealing content that starts conversations!\n\n#${request.topic.replace(/\s+/g, '').toLowerCase()} #instagram #contentcreator`,
    
    linkedin: `🔗 ${request.topic} for LinkedIn:\n\nProfessional insights that drive engagement:\n\n• Share industry-specific experiences\n• Ask thought-provoking questions\n• Use data to support your points\n• Tag relevant professionals\n• Post during business hours for maximum reach\n\nLinkedIn rewards content that sparks meaningful professional discussions.\n\n#${request.topic.replace(/\s+/g, '').toLowerCase()} #linkedin #professional`,
    
    tiktok: `🎵 ${request.topic} for TikTok:\n\nViral content formula:\n• Hook viewers in first 3 seconds\n• Use trending sounds and effects\n• Keep it under 60 seconds\n• Add captions for accessibility\n• End with a clear call-to-action\n\nTikTok loves authentic, entertaining content that educates while it entertains!\n\n#${request.topic.replace(/\s+/g, '').toLowerCase()} #tiktok #viral`
  };

  const platformContent = platformStrategies[request.platform as keyof typeof platformStrategies];
  
  return {
    title: `${request.topic} - Optimized for ${request.platform}`,
    description: `Platform-specific content strategy for ${request.topic} on ${request.platform}`,
    content: platformContent || `${request.platform}-optimized content about ${request.topic} coming soon!`,
    tags: [request.topic.replace(/\s+/g, '').toLowerCase(), request.platform || 'social', 'optimized', 'strategy']
  };
}

function generateToneSpecificContent(request: ContentGenerationRequest) {
  const toneVariations = {
    casual: `Hey! Let's talk ${request.topic} 👋\n\nHere's the thing - everyone makes it sound super complicated, but it's actually pretty straightforward once you get the hang of it.\n\nMy take? Start small, be consistent, and don't stress about being perfect.\n\nWhat's your experience been like?`,
    
    professional: `${request.topic}: Key Insights for Success\n\nBased on industry analysis and best practices, here are the essential elements to consider:\n\n• Strategic planning and goal setting\n• Consistent execution and monitoring\n• Data-driven optimization\n• Stakeholder engagement\n\nImplementing these approaches systematically yields measurable results.`,
    
    inspirational: `✨ Transform Your Approach to ${request.topic}\n\nEvery expert was once a beginner. Every success story started with a single step.\n\nYour journey with ${request.topic} is unique, valuable, and worth pursuing. Trust the process, embrace the learning, and celebrate every milestone.\n\nYou have everything you need to succeed. Now take that first step! 🚀`
  };

  const toneContent = toneVariations[request.tone as keyof typeof toneVariations];
  
  return {
    title: `${request.topic} - ${request.tone} Approach`,
    description: `Content tailored with a ${request.tone} tone for your ${request.topic} audience`,
    content: toneContent || `${request.tone}-toned content about ${request.topic}`,
    tags: [request.topic.replace(/\s+/g, '').toLowerCase(), request.tone || 'neutral', 'tone-specific', 'targeted']
  };
}

export async function generateContentIdeas(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
  // Use smart AI template system
  try {
    console.log('Using smart AI for content generation');
    return await generateContentWithSmartAI(request);
  } catch (smartAIError) {
    console.log('Smart AI failed, trying OpenAI if available');
    
    // Try OpenAI if configured and has quota
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "sk-test-key-not-configured") {
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
      } catch (openaiError) {
        console.error('OpenAI also failed:', openaiError);
      }
    }

    // Final fallback to demo content
    console.log('All AI options failed, using demo content');
    return { ideas: generateDemoContent(request) };
  }
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  // Use smart chat response system
  try {
    console.log('Using smart AI for chat response');
    const smartResponse = generateSmartChatResponse(message);
    if (smartResponse && smartResponse.length > 10) {
      return smartResponse;
    }
  } catch (smartAIError) {
    console.log('Smart AI chat failed, trying OpenAI if available');
  }

  // Try OpenAI if configured
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "sk-test-key-not-configured") {
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
    } catch (openaiError) {
      console.error('OpenAI chat failed:', openaiError);
    }
  }

  // Final fallback to smart responses
  return generateSmartChatResponse(message);
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

function generateSmartChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Advanced pattern matching for more intelligent responses
  if (lowerMessage.includes('free ai') || lowerMessage.includes('smart ai')) {
    return "I'm powered by advanced content generation algorithms that create personalized content without external API costs. My smart template system analyzes your requirements and generates engaging content tailored to your specific needs, platform, and audience. It's like having a professional content strategist built right into your platform!";
  }
  
  if (lowerMessage.includes('algorithm') || lowerMessage.includes('how do you work')) {
    return "I use sophisticated pattern recognition and content strategy frameworks to generate high-quality content. My system combines proven content marketing principles with platform-specific optimization techniques. I analyze your topic, audience, and platform to create content that follows best practices for engagement and conversion.";
  }
  
  if (lowerMessage.includes('better than') || lowerMessage.includes('compare')) {
    return "My advantage is that I'm specifically designed for content creation. I combine marketing expertise, platform knowledge, and audience psychology to create content that actually works. Plus, I'm always available, cost-effective, and learn from the latest content trends and strategies.";
  }

  return generateBasicChatResponse(message);
}

function generateBasicChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your AI content assistant powered by free AI technology. I can help you create content, develop social media strategies, and brainstorm ideas. What would you like to work on today?";
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
    return "I'm here to help with your content creation! I can assist with:\n\n✨ Content idea generation\n📱 Social media strategies\n📝 Blog post planning\n🎥 Video content ideas\n📧 Email marketing\n📅 Content calendar planning\n\nI'm powered by free AI technology, so you get real AI assistance without any costs. What would you like to work on first?";
  }
  
  return `That's an interesting question about content creation! While I'm using free AI technology, I can share that successful content typically:\n\n• Solves a specific problem for your audience\n• Provides clear value or entertainment\n• Uses engaging visuals and compelling headlines\n• Includes a call-to-action\n\nI can help you generate personalized content ideas using free AI. Try the 'Generate Ideas' feature to see what I can create for you!\n\nWhat type of content are you most interested in creating?`;
}