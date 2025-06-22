import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function WorkflowTemplates() {
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["/api/workflow-templates"]
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Workflow Templates</h2>
          <p className="text-slate-600">Pre-built automation workflows to streamline your content creation</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-6">
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-4"></div>
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Workflow Templates</h2>
        <p className="text-slate-600">Pre-built automation workflows to streamline your content creation</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template: any) => (
            <div key={template.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-12 h-12 ${template.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <i className={`${template.icon} text-white text-xl`}></i>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{template.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{template.description}</p>
              <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium text-sm p-0">
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
