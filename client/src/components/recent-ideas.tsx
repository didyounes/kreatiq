import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export default function RecentIdeas() {
  const { data: contentIdeas = [], isLoading } = useQuery({
    queryKey: ["/api/content-ideas"]
  });

  const getPlatformClass = (contentType: string, platform?: string) => {
    if (platform === 'instagram' || contentType === 'social') return 'platform-instagram';
    if (contentType === 'blog') return 'platform-blog';
    if (contentType === 'video') return 'platform-video';
    if (contentType === 'email') return 'platform-email';
    return 'platform-instagram';
  };

  const getDisplayType = (contentType: string, platform?: string) => {
    if (platform) return platform.charAt(0).toUpperCase() + platform.slice(1);
    return contentType.charAt(0).toUpperCase() + contentType.slice(1);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Recent Ideas</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recentIdeas = contentIdeas.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900">Recent Ideas</h3>
      </div>
      <div className="p-6 space-y-4">
        {recentIdeas.length === 0 ? (
          <div className="text-center py-8">
            <i className="fas fa-lightbulb text-4xl text-slate-300 mb-4"></i>
            <p className="text-slate-500">No ideas yet. Generate some content to get started!</p>
          </div>
        ) : (
          recentIdeas.map((idea: any) => (
            <div key={idea.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPlatformClass(idea.contentType, idea.platform)}`}>
                  {getDisplayType(idea.contentType, idea.platform)}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
                </span>
              </div>
              <h4 className="font-medium text-slate-900 text-sm mb-1">{idea.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{idea.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
