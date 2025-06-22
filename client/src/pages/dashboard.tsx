import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import QuickActions from "@/components/quick-actions";
import AiChat from "@/components/ai-chat";
import RecentIdeas from "@/components/recent-ideas";
import ContentCalendar from "@/components/content-calendar";
import WorkflowTemplates from "@/components/workflow-templates";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <div className="flex h-screen pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, <span>John</span>!
              </h1>
              <p className="text-slate-600">
                Let's create something amazing today. Here's your content dashboard.
              </p>
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* AI Chat Interface and Recent Ideas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <AiChat />
              </div>
              <RecentIdeas />
            </div>

            {/* Content Calendar */}
            <ContentCalendar />

            {/* Workflow Templates */}
            <WorkflowTemplates />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-50">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 px-3 text-primary">
            <i className="fas fa-chart-line text-lg mb-1"></i>
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-slate-400">
            <i className="fas fa-lightbulb text-lg mb-1"></i>
            <span className="text-xs">Ideas</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-slate-400">
            <i className="fas fa-calendar text-lg mb-1"></i>
            <span className="text-xs">Calendar</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-slate-400">
            <i className="fas fa-cog text-lg mb-1"></i>
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
