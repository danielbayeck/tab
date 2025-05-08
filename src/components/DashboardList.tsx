import React from 'react';
import { dashboards } from '../data/dashboards';
import { Dashboard } from '../types';
import { BarChart } from 'lucide-react';

interface DashboardListProps {
  onSelectDashboard: (dashboard: Dashboard) => void;
  currentDashboardId: string | null;
  isCollapsed?: boolean;
}

const DashboardList: React.FC<DashboardListProps> = ({ 
  onSelectDashboard, 
  currentDashboardId,
  isCollapsed = false 
}) => {
  return (
    <div 
      className={`space-y-2 ${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 overflow-y-auto`} 
      style={{ maxHeight: 'calc(100vh - 4rem)' }}  // Assure que la liste soit scrollable
    >
      {dashboards.map(dashboard => (
        <button
          key={dashboard.id}
          onClick={() => onSelectDashboard(dashboard)}
          className={`w-full flex items-center p-3 rounded-lg transition-colors ${
            currentDashboardId === dashboard.id
              ? 'bg-gray-100 border-2 border-red-600 text-gray-700' // Bouton sélectionné : fond gris clair, bordure rouge
              : 'bg-white hover:bg-gray-100 text-gray-800' // Bouton non sélectionné : normal
          }`}
          data-dashboard-id={dashboard.id}
        >
          <BarChart className="mr-3 flex-shrink-0" size={20} />
          <div className="text-left">
            <div className="font-medium text-sm">{dashboard.name}</div> {/* Réduction de la taille du texte ici */}
            <div className={`text-xs ${currentDashboardId === dashboard.id ? 'text-red-100' : 'text-gray-500'}`}> {/* Réduction de la taille du texte ici */}
              {dashboard.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DashboardList;

