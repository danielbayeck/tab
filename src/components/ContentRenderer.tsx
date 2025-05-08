import React from 'react';
import { Application } from '../types';
import AppViewer from './AppViewer';
import Home from '../pages/Home';
import Backoffice from "../pages/Backoffice";
import Dashboard from "../pages/Dashboard";
import ReservationSalle from "../pages/ReservationSalle";
import ReportingActivity from "../pages/ReportingActivity";
import KnowledgeBase from "../pages/KnowledgeBase";

interface ContentRendererProps {
  currentRoute: string;
  currentApp: Application | null;
  onSelectApplication: (app: Application) => void;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  currentRoute,
  currentApp,
  onSelectApplication
}) => {
  // Si nous avons une application externe, on utilise AppViewer
  if (currentApp && currentApp.url && currentApp.url.startsWith('http')) {
    return <AppViewer application={currentApp} />;
  }

  // Sinon, on utilise le système de routage interne
  switch (currentRoute) {
    case '/':
      return <Home onSelectApplication={onSelectApplication} />;
    case '/backoffice':
      return <Backoffice />;
    case '/dashboards':
      return <Dashboard />;
    case '/reservation-salle':
      return <ReservationSalle />;
    case '/reporting-dri':
      return <ReportingActivity />;
    case '/knowledge-base':
      return <KnowledgeBase />;
    default:
      return <Home onSelectApplication={onSelectApplication} />;
  }
};

export default ContentRenderer; 