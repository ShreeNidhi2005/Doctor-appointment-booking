
import React from 'react';
import { Link } from 'react-router-dom';
import { Doctor, Appointment } from '../types';
import { MOCK_DOCTORS, FALLBACK_DOCTOR_IMAGE } from '../constants';

interface DashboardProps {
  user: any;
  appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, appointments }) => {
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const favDoctors = MOCK_DOCTORS.filter(d => user?.favorites?.includes(d.id));

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_DOCTOR_IMAGE;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hello, {user?.name}! 👋</h1>
          <p className="text-blue-100 text-lg mb-6">Manage your health journeys seamlessly. Book appointments, track visits, and consult our AI expert.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/doctors" className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Book Appointment
            </Link>
            <Link to="/triage" className="px-6 py-3 bg-blue-500/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
              AI Symptom Triage
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <i className="fas fa-stethoscope text-[200px]"></i>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Upcoming Appointments</h2>
            <Link to="/appointments" className="text-blue-600 text-sm font-semibold hover:underline">View All</Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 3).map(app => {
                const doctor = MOCK_DOCTORS.find(d => d.id === app.doctorId);
                return (
                  <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <img 
                      src={doctor?.imageUrl} 
                      alt={doctor?.name} 
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100" 
                      onError={handleImageError}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{doctor?.name}</h3>
                      <p className="text-sm text-slate-500">{doctor?.specialty}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                        <span><i className="far fa-calendar-alt mr-1"></i> {app.date}</span>
                        <span><i className="far fa-clock mr-1"></i> {app.time}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Confirmed</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center text-slate-500">
              <i className="far fa-calendar-times text-4xl mb-4 block text-slate-300"></i>
              <p>No upcoming appointments found.</p>
              <Link to="/doctors" className="text-blue-600 mt-2 block font-semibold">Book your first one now</Link>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Favorite Doctors</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            {favDoctors.length > 0 ? (
              <div className="space-y-4">
                {favDoctors.slice(0, 5).map(doc => (
                  <Link to={`/doctors?search=${doc.name}`} key={doc.id} className="flex items-center gap-3 group">
                    <img 
                      src={doc.imageUrl} 
                      alt={doc.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                      onError={handleImageError}
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{doc.name}</p>
                      <p className="text-xs text-slate-500 truncate">{doc.specialty}</p>
                    </div>
                    <div className="text-amber-400 text-xs font-bold">
                      <i className="fas fa-star mr-1"></i>{doc.rating}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">You haven't added any favorites yet.</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
            <h3 className="font-bold text-blue-800 mb-2">Need immediate help?</h3>
            <p className="text-sm text-blue-600 mb-4">Our AI assistant can analyze your symptoms and suggest the next steps.</p>
            <Link to="/triage" className="w-full py-2 bg-blue-600 text-white rounded-lg block text-center font-bold text-sm hover:bg-blue-700">
              Start AI Triage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
