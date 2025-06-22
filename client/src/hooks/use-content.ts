import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useContentIdeas() {
  return useQuery({
    queryKey: ["/api/content-ideas"]
  });
}

export function useGenerateContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/generate-content", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Content Generated!",
        description: "Your AI-powered content ideas have been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content-ideas"] });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content ideas. Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useChatMessages(sessionId: string) {
  return useQuery({
    queryKey: [`/api/chat/${sessionId}`]
  });
}

export function useSendMessage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { message: string; sessionId: string }) => {
      const response = await apiRequest("POST", "/api/chat", data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/chat/${variables.sessionId}`] });
    },
    onError: (error: any) => {
      toast({
        title: "Chat Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });
}

export function useWorkflowTemplates() {
  return useQuery({
    queryKey: ["/api/workflow-templates"]
  });
}
