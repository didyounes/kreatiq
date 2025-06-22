export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-slate-900">Kreatiq</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Dashboard</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Ideas</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Calendar</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 font-medium">Workflows</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
              <i className="fas fa-bell"></i>
            </button>
            <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
