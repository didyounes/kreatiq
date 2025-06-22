import { 
  ContentIdea, 
  InsertContentIdea, 
  ChatMessage, 
  InsertChatMessage,
  WorkflowTemplate,
  InsertWorkflowTemplate 
} from "@shared/schema";

export interface IStorage {
  // Content Ideas
  getContentIdeas(): Promise<ContentIdea[]>;
  getContentIdea(id: number): Promise<ContentIdea | undefined>;
  createContentIdea(idea: InsertContentIdea): Promise<ContentIdea>;
  updateContentIdea(id: number, updates: Partial<InsertContentIdea>): Promise<ContentIdea | undefined>;
  deleteContentIdea(id: number): Promise<boolean>;

  // Chat Messages
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Workflow Templates
  getWorkflowTemplates(): Promise<WorkflowTemplate[]>;
  createWorkflowTemplate(template: InsertWorkflowTemplate): Promise<WorkflowTemplate>;
}

export class MemStorage implements IStorage {
  private contentIdeas: Map<number, ContentIdea>;
  private chatMessages: Map<number, ChatMessage>;
  private workflowTemplates: Map<number, WorkflowTemplate>;
  private currentContentIdeaId: number;
  private currentChatMessageId: number;
  private currentWorkflowTemplateId: number;

  constructor() {
    this.contentIdeas = new Map();
    this.chatMessages = new Map();
    this.workflowTemplates = new Map();
    this.currentContentIdeaId = 1;
    this.currentChatMessageId = 1;
    this.currentWorkflowTemplateId = 1;

    // Initialize default workflow templates
    this.initializeWorkflowTemplates();
  }

  private initializeWorkflowTemplates() {
    const templates: InsertWorkflowTemplate[] = [
      {
        name: "Social Media Series",
        description: "Automatically generate a week's worth of social media posts based on a single topic",
        icon: "fas fa-share-alt",
        gradient: "from-blue-500 to-purple-500",
        steps: [
          { name: "Topic Input", description: "Provide main topic or theme" },
          { name: "Platform Selection", description: "Choose target platforms" },
          { name: "Content Generation", description: "AI generates varied posts" },
          { name: "Schedule Planning", description: "Optimize posting times" }
        ]
      },
      {
        name: "Blog to Social",
        description: "Transform your blog posts into multiple social media posts and email content",
        icon: "fas fa-blog",
        gradient: "from-green-500 to-teal-500",
        steps: [
          { name: "Blog Analysis", description: "Extract key points from blog" },
          { name: "Content Adaptation", description: "Adapt for different platforms" },
          { name: "Visual Suggestions", description: "Recommend images and graphics" },
          { name: "Distribution Plan", description: "Create posting schedule" }
        ]
      },
      {
        name: "Video Content Hub",
        description: "Create video scripts, thumbnails, descriptions, and promotional posts in one go",
        icon: "fas fa-video",
        gradient: "from-red-500 to-pink-500",
        steps: [
          { name: "Video Concept", description: "Define video topic and goals" },
          { name: "Script Writing", description: "Generate detailed script" },
          { name: "Thumbnail Design", description: "Create eye-catching thumbnails" },
          { name: "Promotion Strategy", description: "Plan cross-platform promotion" }
        ]
      }
    ];

    templates.forEach(template => {
      const id = this.currentWorkflowTemplateId++;
      this.workflowTemplates.set(id, {
        ...template,
        id,
        createdAt: new Date()
      });
    });
  }

  // Content Ideas
  async getContentIdeas(): Promise<ContentIdea[]> {
    return Array.from(this.contentIdeas.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getContentIdea(id: number): Promise<ContentIdea | undefined> {
    return this.contentIdeas.get(id);
  }

  async createContentIdea(insertIdea: InsertContentIdea): Promise<ContentIdea> {
    const id = this.currentContentIdeaId++;
    const idea: ContentIdea = {
      ...insertIdea,
      id,
      platform: insertIdea.platform || null,
      status: insertIdea.status || "draft",
      tags: insertIdea.tags || [],
      createdAt: new Date()
    };
    this.contentIdeas.set(id, idea);
    return idea;
  }

  async updateContentIdea(id: number, updates: Partial<InsertContentIdea>): Promise<ContentIdea | undefined> {
    const existing = this.contentIdeas.get(id);
    if (!existing) return undefined;

    const updated: ContentIdea = { ...existing, ...updates };
    this.contentIdeas.set(id, updated);
    return updated;
  }

  async deleteContentIdea(id: number): Promise<boolean> {
    return this.contentIdeas.delete(id);
  }

  // Chat Messages
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Workflow Templates
  async getWorkflowTemplates(): Promise<WorkflowTemplate[]> {
    return Array.from(this.workflowTemplates.values());
  }

  async createWorkflowTemplate(insertTemplate: InsertWorkflowTemplate): Promise<WorkflowTemplate> {
    const id = this.currentWorkflowTemplateId++;
    const template: WorkflowTemplate = {
      ...insertTemplate,
      id,
      createdAt: new Date()
    };
    this.workflowTemplates.set(id, template);
    return template;
  }
}

export const storage = new MemStorage();
