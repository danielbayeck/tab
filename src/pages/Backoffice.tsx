import React from 'react';
import { Users, UserPlus, Settings, Shield } from 'lucide-react';

const Backoffice: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Statistiques */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-50 p-3 rounded-full">
              <Users className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Utilisateurs actifs</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-50 p-3 rounded-full">
              <Shield className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Administrateurs</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-50 p-3 rounded-full">
              <Settings className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gestion des utilisateurs</h2>
          <button className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
            <UserPlus size={20} />
            <span>Ajouter un utilisateur</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Nom</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Rôle</th>
                <th className="text-left py-3 px-4">Dernière connexion</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Jean Dupont</td>
                <td className="py-3 px-4">jean.dupont@example.com</td>
                <td className="py-3 px-4">
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-sm">Admin</span>
                </td>
                <td className="py-3 px-4">Aujourd'hui, 10:30</td>
                <td className="py-3 px-4">
                  <button className="text-red-600 hover:text-red-700">Modifier</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Marie Martin</td>
                <td className="py-3 px-4">marie.martin@example.com</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">Utilisateur</span>
                </td>
                <td className="py-3 px-4">Hier, 15:45</td>
                <td className="py-3 px-4">
                  <button className="text-red-600 hover:text-red-700">Modifier</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Backoffice; 