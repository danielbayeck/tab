import React, { useState } from 'react';
import { Activity, TaskType, TaskStage } from '../types';
import { Plus, Calendar } from 'lucide-react';
import Button from '../components/Button';

const taskTypes: TaskType[] = [
  'Administratif',
  'Étude',
  'Campagne',
  'Déploiement',
  'Amélioration de processus',
  'Animation/Formation/Coaching',
  'Suivi et évaluation de projet',
  'Conception produit/canal de service/schéma de financement',
  'Projets/programmes/financements',
  'Enquette/Sensibilisation',
  'Prototypage'
];

const taskStages: TaskStage[] = [
  'Démarrage',
  'En continuation',
  'Finalisation'
];

const ReportingActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [formData, setFormData] = useState<Partial<Activity>>({
    taskStages: []
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.taskTitle?.trim()) {
      errors.taskTitle = "L'énoncé de la tâche est requis";
    } else if (formData.taskTitle.length > 255) {
      errors.taskTitle = "L'énoncé ne doit pas dépasser 255 caractères";
    }

    if (!formData.taskType) {
      errors.taskType = "Le type de tâche est requis";
    }

    if (!formData.taskStages?.length) {
      errors.taskStages = "Au moins une étape est requise";
    }

    if (!formData.estimatedDuration) {
      errors.estimatedDuration = "La durée estimative est requise";
    } else if (formData.estimatedDuration <= 0) {
      errors.estimatedDuration = "La durée doit être supérieure à 0";
    }

    if (!formData.description?.trim()) {
      errors.description = "La description est requise";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      date: selectedDate,
      taskTitle: formData.taskTitle!,
      taskType: formData.taskType!,
      taskStages: formData.taskStages!,
      estimatedDuration: formData.estimatedDuration!,
      description: formData.description!,
      createdAt: new Date().toISOString()
    };

    setActivities([...activities, newActivity]);
    setShowActivityDialog(false);
    setFormData({ taskStages: [] });
    setFormErrors({});
  };

  const filteredActivities = activities.filter(
    activity => activity.date === selectedDate
  );

  return (
    <div className="container mx-auto px-4 py-2">

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <Button
          onClick={() => setShowActivityDialog(true)}
          icon={Plus}
        >
          Déclarer une activité
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Énoncé</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étapes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée (min)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.taskTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.taskType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.taskStages.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.estimatedDuration}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{activity.description}</td>
              </tr>
            ))}
            {filteredActivities.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Aucune activité déclarée pour cette date
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showActivityDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Déclarer une activité</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Énoncé de la tâche
                </label>
                <input
                  type="text"
                  maxLength={255}
                  value={formData.taskTitle || ''}
                  onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
                {formErrors.taskTitle && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.taskTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de tâche
                </label>
                <select
                  value={formData.taskType || ''}
                  onChange={(e) => setFormData({ ...formData, taskType: e.target.value as TaskType })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="">Sélectionnez un type</option>
                  {taskTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formErrors.taskType && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.taskType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étape(s) de la tâche
                </label>
                <div className="space-y-2">
                  {taskStages.map((stage) => (
                    <label key={stage} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.taskStages?.includes(stage)}
                        onChange={(e) => {
                          const stages = formData.taskStages || [];
                          const newStages = e.target.checked
                            ? [...stages, stage]
                            : stages.filter(s => s !== stage);
                          setFormData({ ...formData, taskStages: newStages });
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{stage}</span>
                    </label>
                  ))}
                </div>
                {formErrors.taskStages && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.taskStages}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée estimative (en minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.estimatedDuration || ''}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: parseInt(e.target.value) })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
                {formErrors.estimatedDuration && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.estimatedDuration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2} // Réduit la hauteur de moitié
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowActivityDialog(false);
                    setFormData({ taskStages: [] });
                    setFormErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Déclarer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingActivity;