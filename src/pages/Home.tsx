import React from 'react';
import AppGrid from '../components/AppGrid';
import { Application } from '../types';
import Logo from '../components/Logo';

interface HomeProps {
  onSelectApplication: (app: Application) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectApplication }) => {
  return (
    <div className="container mx-auto px-4 py-1">
      <div className="text-center mb-1 mt-2">
        {/* Logo centré */}
        <div className="flex justify-center mb-6">
          <Logo size={48} showText={false} className="text-red-600" />
        </div>
        
        {/* Titre et description */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">FirstCopilote</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Votre portail centralisé pour accéder à toutes vos applications métier et workflows internes. Trouvez facilement les outils dont vous avez besoin pour être plus productif.
        </p>
      </div>

      {/* Application Grid */}
      <div className="flex justify-center">
        <AppGrid onSelectApplication={onSelectApplication} />
      </div>
    </div>
  );
};

export default Home;