import React from 'react';
import { Application } from '../types';
import ReportingActivity from '../pages/ReportingActivity';
import KnowledgeBasePage from '../pages/KnowledgeBase';

interface AppViewerProps {
  application: Application;
}

const AppViewer: React.FC<AppViewerProps> = ({ application }) => {

  return (
    <div className="w-full h-full">
      <iframe
        src={application.url}
        title={application.name}
        className="w-full h-[calc(100vh-4rem)] border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      />
    </div>
  );
};

export default AppViewer;