import React from 'react';
import { getApplicationsByCategory } from '../data/applications';
import { Application } from '../types';
import { Briefcase, Workflow } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Interface définissant les props du composant AppGrid
interface AppGridProps {
  onSelectApplication: (app: Application) => void;
}

/**
 * Composant AppGrid : Affiche une grille d'applications organisée par catégories
 * @param {AppGridProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant AppGrid
 */
const AppGrid: React.FC<AppGridProps> = ({ onSelectApplication }) => {
  // Récupération des applications par catégorie
  const businessApps = getApplicationsByCategory('business');
  const workflowApps = getApplicationsByCategory('workflow');
  const defaultApps = getApplicationsByCategory('default');
  
  /**
   * Récupère le composant d'icône correspondant au nom fourni
   * @param {string} iconName - Le nom de l'icône à récupérer
   * @returns {JSX.Element | null} Le composant d'icône ou null si non trouvé
   */
  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/*defaultApps.length > 0 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {defaultApps.map(app => (
              <button
                key={app.id}
                onClick={() => onSelectApplication(app)}
                className="bg-gradient-to-br from-red-50 to-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mr-3">
                    {getIcon(app.icon)}
                  </div>
                  <h3 className="font-medium text-gray-900">{app.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{app.description}</p>
              </button>
            ))}
          </div>
        </section>
      )*/}

      {/* Section des workflows */}
      <section>
        <div className="flex items-center mb-4">
          <Workflow className="mr-2 text-red-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-900">Workflows</h2>
        </div>
        {/* Grille responsive pour les workflows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workflowApps.map(app => (
            <button
              key={app.id}
              onClick={() => onSelectApplication(app)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-red-300 transition-all duration-200 text-left"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mr-3">
                  {getIcon(app.icon)}
                </div>
                <h3 className="font-medium text-gray-900">{app.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{app.description}</p>
            </button>
          ))}
        </div>
      </section>

      
      {/*<section>
        <div className="flex items-center mb-4">
          <Briefcase className="mr-2 text-red-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-900">Applications Métier</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {businessApps.map(app => (
            <button
              key={app.id}
              onClick={() => onSelectApplication(app)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-red-300 transition-all duration-200 text-left"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mr-3">
                  {getIcon(app.icon)}
                </div>
                <h3 className="font-medium text-gray-900">{app.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{app.description}</p>
            </button>
          ))}
        </div>
      </section>*/}
    </div>
  );
};

export default AppGrid;