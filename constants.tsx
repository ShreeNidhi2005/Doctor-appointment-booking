
import { Doctor, Specialty } from './types';

// Curated professional medical portrait IDs from Unsplash known for high availability
const DOCTOR_IMAGE_IDS = [
  'photo-1612349317150-e413f6a5b16d', // Male Doctor
  'photo-1559839734-2b71f1536783', // Female Doctor
  'photo-1537368910025-700350fe46c7', // Male Doctor
  'photo-1594824476967-48c8b964273f', // Female Doctor
  'photo-1622253692010-333f2da6031d', // Doctor
  'photo-1550831107-1553da8c8464', // Doctor
  'photo-1614608682850-e0d6ed316d47', // Doctor
  'photo-1625492943714-260623e1a814', // Doctor
  'photo-1527613426441-4da17471b66d', // Healthcare Professional
  'photo-1582750433449-648ed127bb54', // Doctor
  'photo-1638202993928-7267aad84c31', // New: Female Doctor
  'photo-1591604466107-ec97de577aff', // New: Male Doctor
  'photo-1536064449561-dc58ac4ef74c', // New: Doctor
  'photo-1623854767648-e7bb8c5a24e8', // New: Doctor
  'photo-1551601651-2a8555f1a136', // New: Doctor
  'photo-1591604021695-0c69b7c03381', // New: Doctor
  'photo-1618498082410-b4aa22193b38', // New: Doctor
  'photo-1651008376811-b90baee60c1f', // New: Doctor
  'photo-1637333339316-41764b427dd4', // New: Doctor
  'photo-1576091160550-217359f42f8c'  // New: Doctor
];

const generateDoctors = (): Doctor[] => {
  const specialties = Object.values(Specialty);
  const doctors: Doctor[] = [];
  
  specialties.forEach((spec, specIdx) => {
    for (let i = 1; i <= 10; i++) {
      // Use a unique index to pick from the pool of IDs
      const imgIdx = (specIdx * 10 + (i - 1)) % DOCTOR_IMAGE_IDS.length;
      const imgId = DOCTOR_IMAGE_IDS[imgIdx];
      
      doctors.push({
        id: `doc-${specIdx}-${i}`,
        name: `Dr. ${['James', 'Sarah', 'Michael', 'Elena', 'David', 'Sophia', 'Robert', 'Linda', 'Thomas', 'Emma'][i-1]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][specIdx]}`,
        specialty: spec,
        rating: Math.floor(Math.random() * (50 - 46 + 1) + 46) / 10,
        experience: Math.floor(Math.random() * 20) + 8,
        reviews: Math.floor(Math.random() * 800) + 120,
        imageUrl: `https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=400&q=80`,
        about: `Board-certified ${spec} specialist with a focus on patient-centered care and the latest diagnostic technologies. Expert in managing complex cases and providing long-term wellness plans.`,
        availability: ['08:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
      });
    }
  });
  return doctors;
};

export const MOCK_DOCTORS = generateDoctors();

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const FALLBACK_DOCTOR_IMAGE = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80";
