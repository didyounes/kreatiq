import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function QuickActions() {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateContentMutation = useMutation({
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
      setIsGenerateOpen(false);
      // Reset form
      setTopic("");
      setContentType("");
      setPlatform("");
      setTone("");
      setTargetAudience("");
      setAdditionalContext("");
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content ideas. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!topic || !contentType) {
      toast({
        title: "Missing Information",
        description: "Please provide both a topic and content type.",
        variant: "destructive",
      });
      return;
    }

    generateContentMutation.mutate({
      topic,
      contentType,
      platform,
      tone,
      targetAudience,
      additionalContext,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogTrigger asChild>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-lightbulb text-white text-xl"></i>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Generate Ideas</h3>
            <p className="text-slate-600 text-sm">Get AI-powered content suggestions</p>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Content Ideas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Healthy meal prep for fitness enthusiasts"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="contentType">Content Type *</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social Media Post</SelectItem>
                  <SelectItem value="blog">Blog Article</SelectItem>
                  <SelectItem value="video">Video Script</SelectItem>
                  <SelectItem value="email">Email Campaign</SelectItem>
                  <SelectItem value="podcast">Podcast Topic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="platform">Platform (Optional)</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tone">Tone (Optional)</Label>
              <Input
                id="tone"
                placeholder="e.g., Professional, Casual, Funny, Inspirational"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="audience">Target Audience (Optional)</Label>
              <Input
                id="audience"
                placeholder="e.g., Fitness beginners, Young professionals"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="context">Additional Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="Any additional information or requirements..."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full gradient-primary"
              disabled={generateContentMutation.isPending}
            >
              {generateContentMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-magic mr-2"></i>
                  Generate Ideas
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center mb-4">
          <i className="fas fa-calendar-plus text-white text-xl"></i>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Plan Content</h3>
        <p className="text-slate-600 text-sm">Organize your content calendar</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mb-4">
          <i className="fas fa-robot text-white text-xl"></i>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Automate Workflow</h3>
        <p className="text-slate-600 text-sm">Set up content automation</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-12 h-12 gradient-purple rounded-lg flex items-center justify-center mb-4">
          <i className="fas fa-chart-bar text-white text-xl"></i>
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">View Analytics</h3>
        <p className="text-slate-600 text-sm">Track your content performance</p>
      </div>
    </div>
  );
}
