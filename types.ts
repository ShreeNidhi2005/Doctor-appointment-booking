
export enum Specialty {
  CARDIOLOGY = 'Cardiology',
  PEDIATRICS = 'Pediatrics',
  NEUROLOGY = 'Neurology',
  DERMATOLOGY = 'Dermatology',
  GENERAL = 'General Medicine',
  ORTHOPEDICS = 'Orthopedics',
  PSYCHIATRY = 'Psychiatry'
}

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  rating: number;
  experience: number;
  reviews: number;
  imageUrl: string;
  about: string;
  availability: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  bloodGroup: string;
  phone: string;
  dob: string;
  favorites: string[]; // IDs of doctors
}

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'cancelled' | 'completed';
}

export interface TriageResult {
  summary: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  possibleCauses: string[];
}
