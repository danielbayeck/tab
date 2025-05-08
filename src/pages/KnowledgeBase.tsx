import React, { useState } from 'react';
import { Procedure, Manual } from '../types';
import Button from '../components/Button';

import { FileText, Plus, Download, ChevronLeft, ChevronRight} from 'lucide-react';

const KnowledgeBasePage: React.FC = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [showProcedureDialog, setShowProcedureDialog] = useState(false);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Pagination states
  const [procedurePage, setProcedurePage] = useState(1);
  const [manualPage, setManualPage] = useState(1);
  const itemsPerPage = 10;

  // Filter states
  const [procedureDateFilter, setProcedureDateFilter] = useState({
    startDate: '',
    endDate: ''
  });
  const [manualDateFilter, setManualDateFilter] = useState({
    startDate: '',
    endDate: ''
  });

  const filterByDate = (items: (Procedure | Manual)[], filter: { startDate: string; endDate: string }) => {
    return items.filter(item => {
      if (!filter.startDate && !filter.endDate) return true;
      
      const publicationDate = new Date(item.publicationDate);
      const startDate = filter.startDate ? new Date(filter.startDate) : null;
      const endDate = filter.endDate ? new Date(filter.endDate) : null;

      if (startDate && endDate) {
        return publicationDate >= startDate && publicationDate <= endDate;
      } else if (startDate) {
        return publicationDate >= startDate;
      } else if (endDate) {
        return publicationDate <= endDate;
      }
      return true;
    });
  };

  const getPaginatedData = (items: (Procedure | Manual)[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredProcedures = filterByDate(procedures, procedureDateFilter);
  const filteredManuals = filterByDate(manuals, manualDateFilter);

  const paginatedProcedures = getPaginatedData(filteredProcedures, procedurePage);
  const paginatedManuals = getPaginatedData(filteredManuals, manualPage);

  const handleAddProcedure = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newProcedure: Procedure = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      reference: formData.get('reference') as string,
      regulatoryReference: formData.get('regulatoryReference') as string,
      publicationDate: formData.get('publicationDate') as string,
      implementationDate: formData.get('implementationDate') as string,
      author: formData.get('author') as string,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
      fileName: selectedFile ? selectedFile.name : ''
    };

    setProcedures([...procedures, newProcedure]);
    setShowProcedureDialog(false);
    setSelectedFile(null);
    form.reset();
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newManual: Manual = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      reference: formData.get('reference') as string,
      regulatoryReference: formData.get('regulatoryReference') as string,
      publicationDate: formData.get('publicationDate') as string,
      implementationDate: formData.get('implementationDate') as string,
      author: formData.get('author') as string,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
      fileName: selectedFile ? selectedFile.name : ''
    };

    setManuals([...manuals, newManual]);
    setShowManualDialog(false);
    setSelectedFile(null);
    form.reset();
  };

  const Pagination: React.FC<{
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  }> = ({ currentPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Affichage de{' '}
              <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
              {' '}à{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>
              {' '}sur{' '}
              <span className="font-medium">{totalItems}</span>
              {' '}résultats
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Précédent</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => onPageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === index + 1
                      ? 'z-10 bg-red-50 border-red-500 text-red-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                <span className="sr-only">Suivant</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  const DateFilter: React.FC<{
    filter: { startDate: string; endDate: string };
    onFilterChange: (filter: { startDate: string; endDate: string }) => void;
  }> = ({ filter, onFilterChange }) => (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Du:</label>
        <input
          type="date"
          value={filter.startDate}
          onChange={(e) => onFilterChange({ ...filter, startDate: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Au:</label>
        <input
          type="date"
          value={filter.endDate}
          onChange={(e) => onFilterChange({ ...filter, endDate: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <button
        onClick={() => onFilterChange({ startDate: '', endDate: '' })}
        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  );

  const DocumentDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title: string;
  }> = ({ isOpen, onClose, onSubmit, title }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
  
          {/* Conteneur avec défilement vertical */}
          <div className="overflow-y-auto max-h-[80vh]"> {/* 80% de la hauteur de l'écran */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Référence</label>
                <input
                  type="text"
                  name="reference"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Référence réglementaire</label>
                <input
                  type="text"
                  name="regulatoryReference"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de publication</label>
                <input
                  type="date"
                  name="publicationDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de mise en application</label>
                <input
                  type="date"
                  name="implementationDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Auteur</label>
                <input
                  type="text"
                  name="author"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Document</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  required
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };  

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="space-y-8">
        {/* Procédures */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Liste des Procédures</h2>

            <Button
              onClick={() => setShowProcedureDialog(true)}
              icon={Plus}
            >
            Ajouter une procédure
            </Button>
          </div>
          
          <DateFilter
            filter={procedureDateFilter}
            onFilterChange={setProcedureDateFilter}
          />

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réf. Réglementaire</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Publication</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Application</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProcedures.map((procedure) => (
                    <tr key={procedure.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{procedure.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{procedure.reference}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{procedure.regulatoryReference}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{procedure.publicationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{procedure.implementationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{procedure.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          href={procedure.fileUrl}
                          download={procedure.fileName}
                          className="flex items-center text-red-600 hover:text-red-800"
                        >
                          <FileText size={16} className="mr-1" />
                          <Download size={16} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={procedurePage}
              totalItems={filteredProcedures.length}
              onPageChange={setProcedurePage}
            />
          </div>
        </div>

        {/* Manuels */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Liste des Guides et Manuels</h2>
            <Button
              onClick={() => setShowManualDialog(true)}
              icon={Plus}
            >
            Ajouter un manuel
            </Button>
          </div>

          <DateFilter
            filter={manualDateFilter}
            onFilterChange={setManualDateFilter}
          />

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réf. Réglementaire</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Publication</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Application</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedManuals.map((manual) => (
                    <tr key={manual.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{manual.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manual.reference}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manual.regulatoryReference}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manual.publicationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manual.implementationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{manual.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          href={manual.fileUrl}
                          download={manual.fileName}
                          className="flex items-center text-red-600 hover:text-red-800"
                        >
                          <FileText size={16} className="mr-1" />
                          <Download size={16} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={manualPage}
              totalItems={filteredManuals.length}
              onPageChange={setManualPage}
            />
          </div>
        </div>
      </div>

      <DocumentDialog
        isOpen={showProcedureDialog}
        onClose={() => setShowProcedureDialog(false)}
        onSubmit={handleAddProcedure}
        title="Ajouter une procédure"
      />

      <DocumentDialog
        isOpen={showManualDialog}
        onClose={() => setShowManualDialog(false)}
        onSubmit={handleAddManual}
        title="Ajouter un manuel"
      />
    </div>
  );
};

export default KnowledgeBasePage;