import React from 'react';
import { getApplicationsByCategory } from '../data/applications';
import { Application } from '../types';
import * as LucideIcons from 'lucide-react';
import { 
  Briefcase,
  Home,
  Workflow
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApplication: (app: Application) => void;
  currentAppId: string | null;
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onSelectApplication,
  currentAppId,
  isCollapsed
}) => {
  const businessApps = getApplicationsByCategory('business');
  const workflowApps = getApplicationsByCategory('workflow');
  const defaultApps = getApplicationsByCategory('default');

  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 h-full bg-gray-200 shadow-lg transform transition-all duration-300 ease-in-out z-30 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isCollapsed ? 'w-16 lg:w-16' : 'w-64'}`}
      >

        <div className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
            <button 
              onClick={() => onSelectApplication({
                id: 'home',
                name: 'Accueil',
                description: 'Page d\'accueil',
                url: '',
                icon: 'Home',
                category: 'business'
              })}
              className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${
                currentAppId === null 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-300 hover:text-black'
              }`}
            >
              <Home size={18} className={isCollapsed ? 'mx-auto' : 'mr-2'} />
              {!isCollapsed && <span>Accueil</span>}
            </button>

          {/*defaultApps.length > 0 && (
              <ul>
                {defaultApps.map(app => (
                  <li key={app.id} className="mb-1">
                    <button 
                      onClick={() => onSelectApplication(app)}
                      className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${
                        currentAppId === app.id 
                          ? 'bg-gradient-to-r from-red-50 to-gray-50 text-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                      }`}
                      title={isCollapsed ? app.name : undefined}
                    >
                      <span className={isCollapsed ? 'mx-auto' : 'mr-2'}>{getIcon(app.icon)}</span>
                      {!isCollapsed && <span className="text-sm text-left">{app.name}</span>}
                    </button>
                  </li>              
                ))}
              </ul>
          )*/}

          
            {/*<div className={`flex items-center mb-2 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
              <Workflow size={16} className={`text-gray-500 ${isCollapsed ? '' : 'mr-2'}`} />
              {!isCollapsed && <h3 className="font-semibold text-red-600 uppercase">Workflows</h3>}
            </div>*/}
            <ul>
              {workflowApps.map(app => (
                <li key={app.id} className="mb-1">
                  <button 
                    onClick={() => onSelectApplication(app)}
                    className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${
                      currentAppId === app.id 
                        ? 'bg-gray-100 border-2 border-red-600 text-gray-700' 
                        : 'text-gray-700 hover:bg-gray-300 hover:text-black'
                    }`}
                    title={isCollapsed ? app.name : undefined}
                  >
                    <span className={isCollapsed ? 'mx-auto' : 'mr-2'}>{getIcon(app.icon)}</span>
                    {!isCollapsed && <span className="text-sm text-left">{app.name}</span>}
                  </button>
                </li>              
              ))}
            </ul>

          
            {/*<div className={`flex items-center mb-2 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
              <Briefcase size={16} className={`text-gray-500 ${isCollapsed ? '' : 'mr-2'}`} />
              {!isCollapsed && <h3 className="font-semibold text-red-600 uppercase">Applications Métier</h3>}
            </div>
            <ul>
              {businessApps.map(app => (
                <li key={app.id} className="mb-1">
                  <button 
                    onClick={() => onSelectApplication(app)}
                    className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${
                      currentAppId === app.id 
                        ? 'bg-gray-100 border-2 border-red-600 text-gray-700' 
                        : 'text-gray-700 hover:bg-gray-300 hover:text-black'
                    }`}
                    title={isCollapsed ? app.name : undefined}
                  >
                    <span className={isCollapsed ? 'mx-auto' : 'mr-2'}>{getIcon(app.icon)}</span>
                    {!isCollapsed && <span className="text-sm text-left">{app.name}</span>}
                  </button>
                </li>              
              ))}
            </ul>*/}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
