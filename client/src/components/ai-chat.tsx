import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AiChat() {
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: [`/api/chat/${sessionId}`]
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { message: string; sessionId: string }) => {
      const response = await apiRequest("POST", "/api/chat", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/chat/${sessionId}`] });
      setMessage("");
    },
    onError: (error: any) => {
      toast({
        title: "Chat Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    sendMessageMutation.mutate({
      message: message.trim(),
      sessionId,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">AI Content Assistant</h2>
        <p className="text-slate-600">Describe what you want to create, and I'll help you brainstorm ideas.</p>
      </div>
      
      <div className="p-6 space-y-4 max-h-96 overflow-auto">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 flex-1">
              <p className="text-slate-700">
                Hello! I'm your AI content assistant. What type of content would you like to create today? 
                I can help with social media posts, blog articles, video scripts, and more!
              </p>
            </div>
          </div>
        )}

        {messages.map((msg: any) => (
          <div key={msg.id} className={`flex items-start space-x-3 ${msg.isUser ? 'justify-end' : ''}`}>
            {msg.isUser ? (
              <>
                <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-xs">
                  <p>{msg.message}</p>
                </div>
                <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">You</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-white text-sm"></i>
                </div>
                <div className="bg-slate-100 rounded-lg p-4 flex-1">
                  <p className="text-slate-700 whitespace-pre-wrap">{msg.message}</p>
                </div>
              </>
            )}
          </div>
        ))}

        {sendMessageMutation.isPending && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 flex-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-slate-200">
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="Ask me anything about content creation..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={sendMessageMutation.isPending}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="gradient-primary"
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
