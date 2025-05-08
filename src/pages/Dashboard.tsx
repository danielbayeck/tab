import React, { useState } from 'react';
import DashboardList from '../components/DashboardList';
import DashboardViewer from '../components/DashboardViewer';
import { Dashboard } from '../types';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [currentDashboard, setCurrentDashboard] = useState<Dashboard | null>(null);
  const [isDashboardSidebarCollapsed, setIsDashboardSidebarCollapsed] = useState(false);
  const [isDashboardFullscreen, setIsDashboardFullscreen] = useState(false);

  const toggleDashboardSidebar = () => {
    setIsDashboardSidebarCollapsed(!isDashboardSidebarCollapsed);
  };

  const toggleDashboardFullscreen = () => {
    setIsDashboardFullscreen(!isDashboardFullscreen);
    if (!isDashboardFullscreen) {
      setIsDashboardSidebarCollapsed(true);
    }
  };

  return (
    <div className="flex h-full">
      <div className={`bg-gray-100 border-r border-gray-200 overflow-hidden transition-all duration-300 ${
        isDashboardSidebarCollapsed ? 'w-0' : 'w-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-semibold text-gray-900 transition-opacity duration-200 ${
              isDashboardSidebarCollapsed ? 'opacity-0' : 'opacity-100'
            }`}>
              Tableaux de Bord
            </h2>
            <button
              onClick={toggleDashboardSidebar}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
              aria-label={isDashboardSidebarCollapsed ? "Afficher la liste" : "Masquer la liste"}
            >
              {isDashboardSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          <DashboardList 
            onSelectDashboard={setCurrentDashboard}
            currentDashboardId={currentDashboard?.id || null}
            isCollapsed={isDashboardSidebarCollapsed}
          />
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {isDashboardSidebarCollapsed && currentDashboard && (
            <button
              onClick={toggleDashboardSidebar}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Afficher la liste"
            >
              <ChevronRight size={20} />
            </button>
          )}
          {currentDashboard && (
            <button
              onClick={toggleDashboardFullscreen}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              aria-label={isDashboardFullscreen ? "Réduire" : "Agrandir"}
            >
              {isDashboardFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          )}
        </div>
        {currentDashboard ? (
          <div className={`h-full transition-all duration-300 ${isDashboardFullscreen ? 'pt-0' : 'pt-16'}`}>
            <DashboardViewer
              dashboard={currentDashboard}
              isFullscreen={isDashboardFullscreen}
              onToggleFullscreen={toggleDashboardFullscreen}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Sélectionnez un tableau de bord
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 