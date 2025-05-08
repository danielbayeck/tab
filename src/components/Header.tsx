import React, { useState } from 'react';
import { Menu, Search, X, ChevronLeft, ChevronRight, LayoutDashboard, BarChart, Home, Users, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Application, Dashboard } from '../types';
import { applications } from '../data/applications';
import { dashboards } from '../data/dashboards';

interface HeaderProps {
  onMenuToggle: () => void;
  onSelectApplication: (app: Application) => void;
  currentApp: Application | null;
  isSidebarCollapsed: boolean;
  onSidebarCollapse: () => void;
  onNavigate: (route: string) => void;
  currentRoute: string;
}

interface SearchResult {
  type: 'application' | 'dashboard';
  item: Application | Dashboard;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  onSelectApplication, 
  currentApp,
  isSidebarCollapsed,
  onSidebarCollapse,
  onNavigate,
  currentRoute
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showNavigationMenu, setShowNavigationMenu] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const appResults = applications
      .filter(app => 
        app.name.toLowerCase().includes(lowerQuery) ||
        app.description.toLowerCase().includes(lowerQuery)
      )
      .map(app => ({ type: 'application' as const, item: app }));

    const dashboardResults = dashboards
      .filter(dashboard =>
        dashboard.name.toLowerCase().includes(lowerQuery) ||
        dashboard.description.toLowerCase().includes(lowerQuery)
      )
      .map(dashboard => ({ type: 'dashboard' as const, item: dashboard }));

    setSearchResults([...appResults, ...dashboardResults]);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'application') {
      onSelectApplication(result.item as Application);
    } else {
      // Add a small delay to ensure the dashboard view is mounted
      setTimeout(() => {
        const dashboardElement = document.querySelector(`[data-dashboard-id="${(result.item as Dashboard).id}"]`);
        dashboardElement?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    toggleSearch();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const toggleNavigationMenu = () => {
    setShowNavigationMenu(!showNavigationMenu);
  };

  const handleNavigation = (route: string) => {
    onNavigate(route);
    setShowNavigationMenu(false);
  };

  const getCurrentPageName = () => {
    switch (currentRoute) {
      case '/':
        return 'Accueil';
      case '/dashboards':
        return 'Tableaux de Bord';
      case '/backoffice':
        return 'Backoffice';
      default:
        return 'Navigation';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button 
            onClick={onMenuToggle}
            className="lg:hidden mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
          <Logo />
          <button
            onClick={onSidebarCollapse}
            className={`hidden lg:flex ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
              isSidebarCollapsed 
                ? 'bg-gray-100 border-2 border-red-600 text-gray-700' 
                : 'text-gray-700 hover:bg-gray-300 hover:text-black'
            }`}
            aria-label="Toggle sidebar"
          > 
            {isSidebarCollapsed ? (
              <ChevronRight size={20} className="text-gray-700" />
            ) : (
              <ChevronLeft size={20} className="text-gray-700" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {currentApp && (
            <div className="text-lg font-semibold text-gray-800">{currentApp.name}</div>
          )}
          
          <div className="relative">
            <button
              onClick={toggleNavigationMenu}
              className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700">{getCurrentPageName()}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {showNavigationMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => handleNavigation('/')}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center ${
                    currentRoute === '/' ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <Home size={16} className="mr-2" />
                  Accueil
                </button>
                <button
                  onClick={() => handleNavigation('/dashboards')}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center ${
                    currentRoute === '/dashboards' ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <LayoutDashboard size={16} className="mr-2" />
                  Tableaux de Bord
                </button>
                <button
                  onClick={() => handleNavigation('/backoffice')}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center ${
                    currentRoute === '/backoffice' ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <Users size={16} className="mr-2" />
                  Backoffice
                </button>
              </div>
            )}
          </div>
          
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Rechercher applications et tableaux de bord..."
                  className="bg-transparent border-none outline-none w-80"
                  autoFocus
                />
                <button 
                  onClick={toggleSearch}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-700" />
              </button>
            )}

            {searchResults.length > 0 && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md w-96 max-h-[calc(100vh-200px)] overflow-y-auto z-50">
                <div className="divide-y divide-gray-100">
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${(result.type === 'application' ? (result.item as Application).id : (result.item as Dashboard).id)}-${index}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start space-x-3"
                    >
                      <div className={`mt-1 p-2 rounded-lg ${
                        result.type === 'application' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {result.type === 'application' ? (
                          <LayoutDashboard size={16} />
                        ) : (
                          <BarChart size={16} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {result.item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.item.description}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {result.type === 'application' ? 'Application' : 'Tableau de bord'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
