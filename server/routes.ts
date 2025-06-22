import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentIdeaSchema, insertChatMessageSchema } from "@shared/schema";
import { generateContentIdeas, generateChatResponse } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Content Ideas routes
  app.get("/api/content-ideas", async (req, res) => {
    try {
      const ideas = await storage.getContentIdeas();
      res.json(ideas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch content ideas" });
    }
  });

  app.post("/api/content-ideas", async (req, res) => {
    try {
      const validatedData = insertContentIdeaSchema.parse(req.body);
      const idea = await storage.createContentIdea(validatedData);
      res.json(idea);
    } catch (error) {
      res.status(400).json({ message: "Invalid content idea data" });
    }
  });

  app.put("/api/content-ideas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updatedIdea = await storage.updateContentIdea(id, updates);
      
      if (!updatedIdea) {
        return res.status(404).json({ message: "Content idea not found" });
      }
      
      res.json(updatedIdea);
    } catch (error) {
      res.status(400).json({ message: "Failed to update content idea" });
    }
  });

  app.delete("/api/content-ideas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContentIdea(id);
      
      if (!success) {
        return res.status(404).json({ message: "Content idea not found" });
      }
      
      res.json({ message: "Content idea deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete content idea" });
    }
  });

  // AI Content Generation
  app.post("/api/generate-content", async (req, res) => {
    try {
      const { topic, contentType, platform, tone, targetAudience, additionalContext } = req.body;
      
      if (!topic || !contentType) {
        return res.status(400).json({ message: "Topic and content type are required" });
      }

      const generationResult = await generateContentIdeas({
        topic,
        contentType,
        platform,
        tone,
        targetAudience,
        additionalContext
      });

      // Save generated ideas to storage
      const savedIdeas = [];
      for (const idea of generationResult.ideas) {
        const savedIdea = await storage.createContentIdea({
          title: idea.title,
          description: idea.description,
          content: idea.content,
          contentType,
          platform: platform || null,
          status: "draft",
          tags: idea.tags
        });
        savedIdeas.push(savedIdea);
      }

      res.json({ ideas: savedIdeas });
    } catch (error) {
      console.error('Content generation error:', error);
      res.status(500).json({ 
        message: "Failed to generate content", 
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Chat routes
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ message: "Message and session ID are required" });
      }

      // Save user message
      const userMessage = await storage.createChatMessage({
        message,
        isUser: 1,
        sessionId
      });

      // Generate AI response
      const aiResponse = await generateChatResponse(message);

      // Save AI response
      const aiMessage = await storage.createChatMessage({
        message: aiResponse,
        isUser: 0,
        sessionId
      });

      res.json({ userMessage, aiMessage });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        message: "Failed to process chat message",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Workflow Templates
  app.get("/api/workflow-templates", async (req, res) => {
    try {
      const templates = await storage.getWorkflowTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workflow templates" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
