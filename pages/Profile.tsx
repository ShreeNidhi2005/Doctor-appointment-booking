
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOOD_GROUPS, MOCK_DOCTORS, FALLBACK_DOCTOR_IMAGE } from '../constants';
import { User, Appointment } from '../types';

interface ProfileProps {
  user: User;
  appointments: Appointment[];
  onUpdate: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, appointments, onUpdate }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'favorites' | 'history'>('info');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const favoriteDoctors = MOCK_DOCTORS.filter(doc => user.favorites.includes(doc.id));
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_DOCTOR_IMAGE;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 h-40 relative">
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 rounded-3xl bg-blue-100 border-4 border-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-xl overflow-hidden">
              <span className="relative z-10">{formData.name.charAt(0)}</span>
              <div className="absolute inset-0 bg-blue-600/5"></div>
            </div>
          </div>
          <div className="absolute bottom-4 right-8">
            {activeTab === 'info' && !isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-lg"
              >
                <i className="fas fa-edit mr-2"></i> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="mt-16 px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">{formData.name}</h1>
            <p className="text-slate-500 font-medium">{formData.email}</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 mb-8 gap-8">
            <button 
              onClick={() => { setActiveTab('info'); setIsEditing(false); }}
              className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Personal Details
            </button>
            <button 
              onClick={() => { setActiveTab('favorites'); setIsEditing(false); }}
              className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'favorites' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Favorite Doctors ({favoriteDoctors.length})
            </button>
            <button 
              onClick={() => { setActiveTab('history'); setIsEditing(false); }}
              className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Booking History ({appointments.length})
            </button>
          </div>

          {/* Tab Content: Personal Info */}
          {activeTab === 'info' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email ID</label>
                  <input 
                    type="email" 
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date of Birth</label>
                  <input 
                    type="date" 
                    disabled={!isEditing}
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age</label>
                  <input 
                    type="number" 
                    disabled={!isEditing}
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blood Group</label>
                  <select 
                    disabled={!isEditing}
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 font-medium"
                  >
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-6">
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setFormData({...user}); setIsEditing(false); }}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Tab Content: Favorite Doctors */}
          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
              {favoriteDoctors.length > 0 ? (
                favoriteDoctors.map(doc => (
                  <Link to={`/doctors?search=${doc.name}`} key={doc.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 transition-all group">
                    <img src={doc.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt={doc.name} onError={handleImageError} />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{doc.name}</h4>
                      <p className="text-xs text-blue-600 font-semibold mb-1">{doc.specialty}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="flex items-center"><i className="fas fa-star text-amber-400 mr-1"></i> {doc.rating}</span>
                        <span>•</span>
                        <span>{doc.experience} Yrs Exp.</span>
                      </div>
                    </div>
                    <i className="fas fa-chevron-right text-slate-300"></i>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400">
                  <i className="far fa-heart text-4xl mb-4 block text-slate-200"></i>
                  <p>You haven't added any favorite doctors yet.</p>
                  <Link to="/doctors" className="text-blue-600 font-bold mt-2 inline-block">Explore Doctors</Link>
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Booking History */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {sortedAppointments.length > 0 ? (
                sortedAppointments.map(app => {
                  const doctor = MOCK_DOCTORS.find(d => d.id === app.doctorId);
                  return (
                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                        app.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                        app.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        <i className={`fas ${app.status === 'scheduled' ? 'fa-clock' : app.status === 'cancelled' ? 'fa-times-circle' : 'fa-check-circle'}`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-800">{doctor?.name}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{app.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-1">{doctor?.specialty} • {app.time}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          app.status === 'scheduled' ? 'bg-blue-50 text-blue-700' :
                          app.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                        }`}>
                          {app.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <i className="far fa-calendar-alt text-4xl mb-4 block text-slate-200"></i>
                  <p>No previous appointments found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
