
import React from 'react';
import { Appointment } from '../types';
import { MOCK_DOCTORS, FALLBACK_DOCTOR_IMAGE } from '../constants';

interface AppointmentsProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments, onCancel }) => {
  const sorted = [...appointments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_DOCTOR_IMAGE;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Appointments</h1>
        <p className="text-slate-500">Track and manage your medical consultations</p>
      </div>

      <div className="space-y-4">
        {sorted.length > 0 ? (
          sorted.map(app => {
            const doctor = MOCK_DOCTORS.find(d => d.id === app.doctorId);
            return (
              <div key={app.id} className={`bg-white p-6 rounded-2xl border ${app.status === 'cancelled' ? 'border-red-100 bg-red-50/20' : 'border-slate-200'} transition-all hover:shadow-md flex flex-col md:flex-row md:items-center gap-6`}>
                <img 
                  src={doctor?.imageUrl} 
                  alt={doctor?.name} 
                  className={`w-20 h-20 rounded-2xl object-cover bg-slate-100 ${app.status === 'cancelled' ? 'grayscale' : ''}`} 
                  onError={handleImageError}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-xl text-slate-800">{doctor?.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      app.status === 'scheduled' ? 'bg-green-100 text-green-700' : 
                      app.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-blue-600 font-semibold text-sm mb-3">{doctor?.specialty}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-2"><i className="far fa-calendar-alt text-blue-400"></i> {app.date}</span>
                    <span className="flex items-center gap-2"><i className="far fa-clock text-blue-400"></i> {app.time}</span>
                    <span className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-blue-400"></i> General Hospital, Wing B</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {app.status === 'scheduled' && (
                    <button 
                      onClick={() => { if(confirm("Are you sure you want to cancel?")) onCancel(app.id); }}
                      className="px-6 py-2 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  {app.status === 'completed' && (
                    <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                      View Summary
                    </button>
                  )}
                  {app.status === 'cancelled' && (
                    <button className="px-6 py-2 bg-slate-100 text-slate-500 font-bold rounded-xl cursor-not-allowed">
                      Cancelled
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <i className="fas fa-calendar-check text-6xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-500 text-lg">You have no appointment history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
