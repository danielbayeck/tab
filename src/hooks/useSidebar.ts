import { useState } from 'react';

interface UseSidebarReturn {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  closeSidebar: () => void;
}

export const useSidebar = (): UseSidebarReturn => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return {
    isSidebarOpen,
    isSidebarCollapsed,
    toggleSidebar,
    toggleSidebarCollapse,
    closeSidebar
  };
}; 