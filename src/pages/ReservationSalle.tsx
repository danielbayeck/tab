import React from 'react';
import { Calendar, Clock, Users, MapPin, User } from 'lucide-react';

interface ReservationInfo {
  id: number;
  nomSalle: string;
  descriptionSalle: string;
  nombrePlacesSalle: number;
  emplacementSalle: string;
  imageUrlSalle: string;
  displayName?: string;
  mail?: string;
  jobTitle?: string;
  dateReservation?: string;
  heureDebut?: string;
  heureFin?: string;
  etat: string;
}

const ReservationSalle: React.FC = () => {
  // Données de test
  const salles: ReservationInfo[] = [
    {
      id: 1,
      nomSalle: "Salle de réunion A",
      descriptionSalle: "Salle équipée d'un vidéoprojecteur et d'un tableau blanc",
      nombrePlacesSalle: 10,
      emplacementSalle: "Étage 1",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      etat: "LIBRE"
    },
    {
      id: 2,
      nomSalle: "Salle de réunion B",
      descriptionSalle: "Salle de réunion avec vue panoramique",
      nombrePlacesSalle: 15,
      emplacementSalle: "Étage 2",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      displayName: "Jean Dupont",
      mail: "jean.dupont@example.com",
      jobTitle: "Chef de projet",
      dateReservation: "2024-03-20",
      heureDebut: "14:00",
      heureFin: "15:30",
      etat: "OCCUPEE"
    },
    {
      id: 3,
      nomSalle: "Salle de réunion C",
      descriptionSalle: "Salle de réunion avec équipement audiovisuel",
      nombrePlacesSalle: 8,
      emplacementSalle: "Étage 3",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      etat: "LIBRE"
    },
    {
      id: 4,
      nomSalle: "Salle de réunion D",
      descriptionSalle: "Salle de réunion avec téléconférence",
      nombrePlacesSalle: 12,
      emplacementSalle: "Étage 1",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      displayName: "Marie Martin",
      mail: "marie.martin@example.com",
      jobTitle: "Directrice Marketing",
      dateReservation: "2024-03-20",
      heureDebut: "10:00",
      heureFin: "11:30",
      etat: "OCCUPEE"
    },
    {
      id: 5,
      nomSalle: "Salle de réunion E",
      descriptionSalle: "Salle de réunion avec écran tactile",
      nombrePlacesSalle: 6,
      emplacementSalle: "Étage 2",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      etat: "LIBRE"
    },
    {
      id: 6,
      nomSalle: "Salle de réunion F",
      descriptionSalle: "Salle de réunion avec système de visioconférence",
      nombrePlacesSalle: 20,
      emplacementSalle: "Étage 3",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      displayName: "Pierre Durand",
      mail: "pierre.durand@example.com",
      jobTitle: "Responsable IT",
      dateReservation: "2024-03-20",
      heureDebut: "16:00",
      heureFin: "17:00",
      etat: "OCCUPEE"
    },
    {
      id: 7,
      nomSalle: "Salle de réunion G",
      descriptionSalle: "Salle de réunion avec tableau interactif",
      nombrePlacesSalle: 8,
      emplacementSalle: "Étage 1",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      etat: "LIBRE"
    },
    {
      id: 8,
      nomSalle: "Salle de réunion H",
      descriptionSalle: "Salle de réunion avec équipement de présentation",
      nombrePlacesSalle: 10,
      emplacementSalle: "Étage 2",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      displayName: "Sophie Lambert",
      mail: "sophie.lambert@example.com",
      jobTitle: "Chef de produit",
      dateReservation: "2024-03-20",
      heureDebut: "09:00",
      heureFin: "10:30",
      etat: "OCCUPEE"
    },
    {
      id: 9,
      nomSalle: "Salle de réunion I",
      descriptionSalle: "Salle de réunion avec système de son",
      nombrePlacesSalle: 15,
      emplacementSalle: "Étage 3",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      etat: "LIBRE"
    },
    {
      id: 10,
      nomSalle: "Salle de réunion J",
      descriptionSalle: "Salle de réunion avec équipement de conférence",
      nombrePlacesSalle: 12,
      emplacementSalle: "Étage 1",
      imageUrlSalle: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      displayName: "Thomas Moreau",
      mail: "thomas.moreau@example.com",
      jobTitle: "Directeur Financier",
      dateReservation: "2024-03-20",
      heureDebut: "11:00",
      heureFin: "12:30",
      etat: "OCCUPEE"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {salles.map((salle) => (
            <div key={salle.id} className="w-80 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <img 
                  src={salle.imageUrlSalle} 
                  alt={salle.nomSalle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    salle.etat === "LIBRE" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {salle.etat}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{salle.nomSalle}</h2>
                <p className="text-gray-600 text-sm mb-2">{salle.descriptionSalle}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Users className="mr-1" size={16} />
                  <span>{salle.nombrePlacesSalle} places</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="mr-1" size={16} />
                  <span>{salle.emplacementSalle}</span>
                </div>

                {salle.etat !== "LIBRE" && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center mb-2">
                      <User className="mr-2 text-red-600" size={16} />
                      <div>
                        <p className="font-medium">{salle.displayName}</p>
                        <p className="text-sm text-gray-500">{salle.jobTitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="mr-1" size={16} />
                      <span>{salle.dateReservation}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1" size={16} />
                      <span>{salle.heureDebut} - {salle.heureFin}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire de réservation */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Nouvelle réservation</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" size={20} />
              <input type="date" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-500" size={20} />
              <input type="time" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" size={20} />
              <select className="w-full p-2 border rounded-md">
                {salles.map(salle => (
                  <option key={salle.id} value={salle.id}>{salle.nomSalle}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de participants</label>
            <div className="flex items-center space-x-2">
              <Users className="text-gray-500" size={20} />
              <input type="number" min="1" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
            Réserver
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationSalle; 