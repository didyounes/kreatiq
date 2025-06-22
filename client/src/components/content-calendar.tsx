import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

export default function ContentCalendar() {
  const { data: contentIdeas = [], isLoading } = useQuery({
    queryKey: ["/api/content-ideas"]
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ready': return 'status-ready';
      case 'draft': return 'status-draft';
      default: return 'status-planned';
    }
  };

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

  const upcomingContent = contentIdeas.slice(0, 6);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Content Calendar</h2>
          <p className="text-slate-600">Your upcoming content schedule</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Content Calendar</h2>
          <p className="text-slate-600">Your upcoming content schedule</p>
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium">
          View Full Calendar
        </Button>
      </div>
      
      <div className="p-6">
        {upcomingContent.length === 0 ? (
          <div className="text-center py-8">
            <i className="fas fa-calendar-alt text-4xl text-slate-300 mb-4"></i>
            <p className="text-slate-500">No scheduled content yet. Generate some ideas to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingContent.map((content: any, index: number) => {
              const timeLabels = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat'];
              const timeLabel = timeLabels[index % timeLabels.length] || formatDistanceToNow(new Date(content.createdAt));
              
              return (
                <div key={content.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-900">{timeLabel}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPlatformClass(content.contentType, content.platform)}`}>
                      {getDisplayType(content.contentType, content.platform)}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-900 mb-2">{content.title}</h4>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{content.description}</p>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className={`text-xs px-2 py-1 ${getStatusClass(content.status)}`}
                    >
                      {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs text-slate-500 hover:text-slate-700">
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
