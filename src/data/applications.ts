import { Application } from '../types';

export const applications: Application[] = [
  // Default Applications
  {
    id: 'knowledge-base',
    name: 'Base de Connaissances',
    description: 'Procédures et manuels d\'utilisation',
    url: '/knowledge-base',
    icon: 'BookOpen',
    category: 'default',
  },
  {
    id: 'reporting-dri',
    name: 'Reporting Activités',
    description: 'Activity declaration portal',
    url: '/reporting-dri',
    icon: 'FileText',
    category: 'default',
  },
  {
    id: 'reservation-salle',
    name: 'Réservation de salle de réunions',
    description: 'Gestion des réservations de salles de réunions',
    url: '/reservation-salle',
    icon: 'Calendar',
    category: 'default'
  },
  // Business Applications
  {
    id: 'intra',
    name: 'Intra',
    description: 'Internal company portal',
    url: 'https://example.com/intra',
    icon: 'LayoutDashboard',
    category: 'business',
  },
  {
    id: 'amplitude',
    name: 'Amplitude UP',
    description: 'Business analytics platform',
    url: 'https://example.com/amplitude',
    icon: 'BarChart',
    category: 'business',
  },
  {
    id: 'bi',
    name: 'BI',
    description: 'Business Intelligence dashboard',
    url: 'https://example.com/bi',
    icon: 'PieChart',
    category: 'business',
  },
  {
    id: 'select-system',
    name: 'Select System',
    description: 'System selection and management',
    url: '',
    icon: 'Layers',
    category: 'business',
  },
  {
    id: 'glpi',
    name: 'GLPI',
    description: 'IT Service Management platform',
    url: 'http://62.169.26.178:89',
    icon: 'LifeBuoy',
    category: 'business',
  },

  // workflow Applications
  {
    id: 'plafonds-transferts-rapides',
    name: 'Plateforme de suivi des plafonds des transferts rapides',
    description: 'Activity declaration portal',
    url: 'https://apps.powerapps.com/play/e/default-2bd82a68-2c7d-4c43-b080-9b064410f6cf/a/a6054698-5cae-4ff7-9c40-516e255b5a32?tenantId=2bd82a68-2c7d-4c43-b080-9b064410f6cf&hint=2b4b3f8b-6ba6-4f9a-bce9-4ffdca72128e&sourcetime=1745446820294',
    icon: 'Clipboard',
    category: 'workflow',
  },
  {
    id: 'suivi-covenant',
    name: 'Suivi Covenant',
    description: 'Covenant tracking application',
    url: 'https://apps.powerapps.com/play/e/default-2bd82a68-2c7d-4c43-b080-9b064410f6cf/a/bd824f0d-eb17-43e2-b4d5-cf0d7e72ba02?tenantId=2bd82a68-2c7d-4c43-b080-9b064410f6cf&hint=4387642b-7707-4cad-b813-17bfc409cda4&sourcetime=1745572867787',
    icon: 'ClipboardCheck',
    category: 'workflow',
  },
  {
    id: 'reporting-commercial',
    name: 'Reporting Activités Commercial',
    description: 'Commercial activity reporting tool',
    url: 'https://apps.powerapps.com/play/e/default-2bd82a68-2c7d-4c43-b080-9b064410f6cf/a/6df221d9-f7f8-47da-a016-a3caaee48467?tenantId=2bd82a68-2c7d-4c43-b080-9b064410f6cf&hint=a74bf496-e802-4d36-913d-c0cb3206e509&sourcetime=1745420091462',
    icon: 'TrendingUp',
    category: 'workflow',
  }
];

export const getApplicationsByCategory = (category: 'business' | 'workflow' | 'default'): Application[] => {
  return applications.filter(app => app.category === category);
};

export const getApplicationById = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};