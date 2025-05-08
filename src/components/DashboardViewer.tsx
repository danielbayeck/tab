import React from 'react';
import { Dashboard } from '../types';

interface DashboardViewerProps {
  dashboard: Dashboard;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const DashboardViewer: React.FC<DashboardViewerProps> = ({ dashboard, isFullscreen, onToggleFullscreen }) => {
  return (
    <div className="w-full h-full">
      <iframe
        src={dashboard.url}
        title={dashboard.name}
        className="w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default DashboardViewer;