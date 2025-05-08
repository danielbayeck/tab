export interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: 'business' | 'workflow' | 'default';
}

export interface ApplicationCategory {
  id: string;
  name: string;
  applications: Application[];
}

export interface Dashboard {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface Procedure {
  id: string;
  name: string;
  reference: string;
  regulatoryReference: string;
  publicationDate: string;
  implementationDate: string;
  author: string;
  fileUrl: string;
  fileName: string;
}

export interface Manual {
  id: string;
  name: string;
  reference: string;
  regulatoryReference: string;
  publicationDate: string;
  implementationDate: string;
  author: string;
  fileUrl: string;
  fileName: string;
}

export type TaskType =
  | 'Administratif'
  | 'Étude'
  | 'Campagne'
  | 'Déploiement'
  | 'Amélioration de processus'
  | 'Animation/Formation/Coaching'
  | 'Suivi et évaluation de projet'
  | 'Conception produit/canal de service/schéma de financement'
  | 'Projets/programmes/financements'
  | 'Enquette/Sensibilisation'
  | 'Prototypage';

export type TaskStage = 'Démarrage' | 'En continuation' | 'Finalisation';

export interface Activity {
  id: string;
  date: string;
  taskTitle: string;
  taskType: TaskType;
  taskStages: TaskStage[];
  estimatedDuration: number;
  description: string;
  createdAt: string;
}