
import React, { useState, useMemo } from 'react';
import { Specialty, Doctor } from '../types';
import { MOCK_DOCTORS, FALLBACK_DOCTOR_IMAGE } from '../constants';

interface DoctorListingProps {
  onBook: (doctor: Doctor) => void;
  user: any;
  toggleFavorite: (id: string) => void;
}

const DoctorListing: React.FC<DoctorListingProps> = ({ onBook, user, toggleFavorite }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter(doc => {
      const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecialty && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery]);

  const specialties = ['All', ...Object.values(Specialty)];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_DOCTOR_IMAGE;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Find Your Doctor</h1>
          <p className="text-slate-500">Over 70+ specialized doctors available for booking</p>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {specialties.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedSpecialty === spec 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              <div className="relative">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-full h-48 object-cover" 
                  onError={handleImageError}
                />
                <button 
                  onClick={() => toggleFavorite(doctor.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-colors ${
                    user.favorites.includes(doctor.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600 hover:text-red-500'
                  }`}
                >
                  <i className={`fa-heart ${user.favorites.includes(doctor.id) ? 'fas' : 'far'}`}></i>
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-blue-600 flex items-center">
                   <i className="fas fa-certificate mr-1.5"></i> {doctor.experience} Yrs Exp.
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{doctor.name}</h3>
                    <p className="text-blue-600 text-sm font-semibold">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-lg text-xs">
                    <i className="fas fa-star mr-1"></i> {doctor.rating}
                  </div>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                  {doctor.about}
                </p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                     <span><i className="fas fa-user-friends mr-1"></i> {doctor.reviews}+ Reviews</span>
                     <span><i className="fas fa-map-marker-alt mr-1"></i> Medical Plaza</span>
                  </div>
                  <button 
                    onClick={() => onBook(doctor)}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
             <i className="fas fa-user-md text-6xl text-slate-200 mb-4 block"></i>
             <p className="text-slate-500 text-lg">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;
