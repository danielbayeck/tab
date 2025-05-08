import { useState } from 'react';
import { Application } from '../types';
import { getApplicationById } from '../data/applications';

interface UseNavigationReturn {
  currentRoute: string;
  currentApp: Application | null;
  handleNavigate: (route: string) => void;
  handleSelectApplication: (app: Application) => void;
}

export const useNavigation = (): UseNavigationReturn => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [currentApp, setCurrentApp] = useState<Application | null>(null);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    
    if (route !== '/') {
      const appId = route.substring(1);
      const app = getApplicationById(appId);
      setCurrentApp(app || null);
    } else {
      setCurrentApp(null);
    }
  };

  const handleSelectApplication = (app: Application) => {
    if (app.id === 'home') {
      handleNavigate('/');
    } else {
      handleNavigate(`/${app.id}`);
    }
  };

  return {
    currentRoute,
    currentApp,
    handleNavigate,
    handleSelectApplication
  };
}; 