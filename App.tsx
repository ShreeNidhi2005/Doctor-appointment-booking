
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DoctorListing from './pages/DoctorListing';
import Appointments from './pages/Appointments';
import AITriage from './pages/AITriage';
import Profile from './pages/Profile';
import { User, Appointment, Doctor } from './types';

// Simple Auth Components (Mock)
const Login = ({ onLogin }: { onLogin: (u: User) => void }) => {
  const [email, setEmail] = useState('demo@example.com');
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
            <i className="fas fa-heartbeat text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500">Sign in to manage your appointments</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input type="password" value="password" disabled className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50" />
          </div>
          <button 
            onClick={() => onLogin({
              id: 'user-1',
              name: 'John Doe',
              email: email,
              age: 28,
              bloodGroup: 'O+',
              phone: '+1 234 567 8900',
              dob: '1996-05-15',
              favorites: []
            })}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
          >
            Login
          </button>
          <p className="text-center text-sm text-slate-500">Don't have an account? <span className="text-blue-600 font-bold cursor-pointer">Register</span></p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('mediconnect_user');
    const savedApps = localStorage.getItem('mediconnect_appointments');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedApps) setAppointments(JSON.parse(savedApps));
  }, []);

  // Persist state
  useEffect(() => {
    if (user) localStorage.setItem('mediconnect_user', JSON.stringify(user));
    localStorage.setItem('mediconnect_appointments', JSON.stringify(appointments));
  }, [user, appointments]);

  const handleBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const confirmBooking = (time: string) => {
    if (!user || !selectedDoctor) return;
    const newApp: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: selectedDoctor.id,
      userId: user.id,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: time,
      status: 'scheduled'
    };
    setAppointments([...appointments, newApp]);
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
    alert("Appointment booked successfully!");
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: 'cancelled' } : app));
  };

  const toggleFavorite = (id: string) => {
    if (!user) return;
    const isFav = user.favorites.includes(id);
    const newFavs = isFav ? user.favorites.filter(fid => fid !== id) : [...user.favorites, id];
    setUser({ ...user, favorites: newFavs });
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <HashRouter>
      <Layout user={user} onLogout={() => { setUser(null); localStorage.removeItem('mediconnect_user'); }}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} appointments={appointments} />} />
          <Route path="/doctors" element={<DoctorListing user={user} onBook={handleBooking} toggleFavorite={toggleFavorite} />} />
          <Route path="/appointments" element={<Appointments appointments={appointments} onCancel={cancelAppointment} />} />
          <Route path="/triage" element={<AITriage />} />
          <Route path="/profile" element={<Profile user={user} appointments={appointments} onUpdate={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Select Time Slot</h2>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <img src={selectedDoctor.imageUrl} className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-800">{selectedDoctor.name}</h3>
                  <p className="text-sm text-blue-600">{selectedDoctor.specialty}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {selectedDoctor.availability.map(slot => (
                  <button 
                    key={slot}
                    onClick={() => confirmBooking(slot)}
                    className="p-3 border border-slate-200 rounded-xl text-sm font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all text-slate-700"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </HashRouter>
  );
};

export default App;
