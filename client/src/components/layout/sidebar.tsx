import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: contentIdeas = [] } = useQuery({
    queryKey: ["/api/content-ideas"]
  });

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block">
      <div className="p-6">
        <button className="w-full gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 flex items-center justify-center space-x-2">
          <i className="fas fa-plus"></i>
          <span>Generate Ideas</span>
        </button>
      </div>

      <nav className="px-6 pb-6">
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 font-medium bg-slate-100">
            <i className="fas fa-chart-line text-primary"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
            <i className="fas fa-lightbulb text-slate-400"></i>
            <span>Ideas</span>
            <span className="ml-auto bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
              {contentIdeas.length}
            </span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
            <i className="fas fa-calendar text-slate-400"></i>
            <span>Calendar</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
            <i className="fas fa-cog text-slate-400"></i>
            <span>Workflows</span>
          </a>
        </div>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Content Types</h3>
          <div className="space-y-1">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
              <i className="fab fa-instagram text-pink-500"></i>
              <span>Social Media</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
              <i className="fas fa-blog text-slate-400"></i>
              <span>Blog Posts</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
              <i className="fas fa-video text-slate-400"></i>
              <span>Videos</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
              <i className="fas fa-envelope text-slate-400"></i>
              <span>Email</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}
