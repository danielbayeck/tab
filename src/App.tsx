import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentRenderer from './components/ContentRenderer';
import { useNavigation } from './hooks/useNavigation';
import { useSidebar } from './hooks/useSidebar';

function App() {
  const {
    currentRoute,
    currentApp,
    handleNavigate,
    handleSelectApplication
  } = useNavigation();

  const {
    isSidebarOpen,
    isSidebarCollapsed,
    toggleSidebar,
    toggleSidebarCollapse,
    closeSidebar
  } = useSidebar();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header 
        onMenuToggle={toggleSidebar} 
        onSelectApplication={handleSelectApplication}
        currentApp={currentApp}
        isSidebarCollapsed={isSidebarCollapsed}
        onSidebarCollapse={toggleSidebarCollapse}
        onNavigate={handleNavigate}
        currentRoute={currentRoute}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar}
          onSelectApplication={handleSelectApplication}
          currentAppId={currentApp?.id || null}
          isCollapsed={isSidebarCollapsed}
        />
        
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-0 lg:ml-16' : 'ml-0 lg:ml-64'
        }`}>
          <ContentRenderer
            currentRoute={currentRoute}
            currentApp={currentApp}
            onSelectApplication={handleSelectApplication}
          />
        </main>
      </div>
    </div>
  );
}

export default App;