import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

interface StudentProfile {
  first_name: string;
  last_name: string;
  age: number | '';
  study_program: string;
  location_zip: string;
  location_city: string;
  hourly_rate: number | '';
  bio: string;
  verification_status: 'pending' | 'verified' | 'rejected';
}

const AVAILABLE_SERVICES = ['Gesellschaft', 'Einkäufe', 'Spaziergänge', 'Behördengänge', 'Technik-Hilfe'];
const AVAILABLE_TIMES = ['Vormittags', 'Nachmittags', 'Abends', 'Wochenende'];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [services, setServices] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<string[]>([]);
  
  const [profile, setProfile] = useState<StudentProfile>({
    first_name: '',
    last_name: '',
    age: '',
    study_program: '',
    location_zip: '',
    location_city: '',
    hourly_rate: '',
    bio: '',
    verification_status: 'pending'
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          age: data.age || '',
          study_program: data.study_program || '',
          location_zip: data.location_zip || '',
          location_city: data.location_city || '',
          hourly_rate: data.hourly_rate || '',
          bio: data.bio || '',
          verification_status: data.verification_status || 'pending'
        });
        
        setServices(data.services ? data.services.split(',') : []);
        setAvailabilities(data.availability ? data.availability.split(',') : []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  const handleServiceToggle = (service: string) => {
    setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
    setSaveSuccess(false);
  };

  const handleAvailabilityToggle = (time: string) => {
    setAvailabilities(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    setSaveSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const { error } = await supabase
        .from('student_profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          age: profile.age === '' ? null : parseInt(profile.age.toString()),
          study_program: profile.study_program,
          location_zip: profile.location_zip,
          location_city: profile.location_city,
          hourly_rate: profile.hourly_rate === '' ? null : parseFloat(profile.hourly_rate.toString()),
          bio: profile.bio,
          services: services.join(','),
          availability: availabilities.join(',')
        })
        .eq('id', user?.id);

      if (error) throw error;
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Fehler beim Speichern des Profils. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-black" size={32} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
        
        {/* Header & Status */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-medium text-brand-text mb-2">Mein Profil</h1>
            <p className="text-gray-600">Verwalten Sie Ihre Angaben und Verfügbarkeiten.</p>
          </div>
          
          {profile.verification_status === 'verified' ? (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium border border-green-200 shrink-0">
              <CheckCircle2 size={18} />
              Verifiziert & Aktiv
            </div>
          ) : profile.verification_status === 'rejected' ? (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-200 shrink-0">
              <ShieldAlert size={18} />
              Verifizierung abgelehnt
            </div>
          ) : (
            <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium border border-yellow-200 shrink-0">
              <ShieldAlert size={18} />
              Verifizierung ausstehend
            </div>
          )}
        </div>

        {profile.verification_status === 'pending' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-6 bg-brand-bg rounded-2xl border border-blue-100"
          >
            <h3 className="font-medium text-brand-text mb-4">Nächste Schritte für Ihre Freischaltung</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-black text-white flex items-center justify-center text-xs shrink-0">1</div>
                Profil vollständig ausfüllen (siehe unten)
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs shrink-0">2</div>
                Immatrikulationsbescheinigung per E-Mail einreichen
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs shrink-0">3</div>
                Erweitertes Führungszeugnis beantragen
              </li>
            </ul>
          </motion.div>
        )}

        {/* Profile Form */}
        <motion.form 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          
          {/* Persönliche Daten */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-medium text-brand-text mb-4">Persönliche Daten</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vorname *</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  value={profile.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nachname *</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  value={profile.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alter</label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="99"
                  value={profile.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Studiengang</label>
                <input
                  type="text"
                  name="study_program"
                  placeholder="z.B. Medizin, Lehramt..."
                  value={profile.study_program}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Einsatzort & Konditionen */}
          <motion.div variants={fadeInUp} className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-medium text-brand-text mb-4">Einsatzort & Konditionen</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PLZ (Einsatzort) *</label>
                <input
                  type="text"
                  name="location_zip"
                  required
                  placeholder="z.B. 80331"
                  value={profile.location_zip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stadt *</label>
                <input
                  type="text"
                  name="location_city"
                  required
                  placeholder="z.B. München"
                  value={profile.location_city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stundenlohn (€)</label>
                <input
                  type="number"
                  name="hourly_rate"
                  min="15"
                  max="50"
                  placeholder="z.B. 18"
                  value={profile.hourly_rate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Leistungen & Verfügbarkeit */}
          <motion.div variants={fadeInUp} className="pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-brand-text mb-4">Meine Leistungen</h3>
                <div className="space-y-3">
                  {AVAILABLE_SERVICES.map(service => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${services.includes(service) ? 'bg-brand-black border-brand-black' : 'border-gray-300 group-hover:border-brand-black'}`}>
                        {services.includes(service) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-700">{service}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                      />
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-brand-text mb-4">Verfügbarkeit</h3>
                <div className="space-y-3">
                  {AVAILABLE_TIMES.map(time => (
                    <label key={time} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${availabilities.includes(time) ? 'bg-brand-black border-brand-black' : 'border-gray-300 group-hover:border-brand-black'}`}>
                        {availabilities.includes(time) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-700">{time}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={availabilities.includes(time)}
                        onChange={() => handleAvailabilityToggle(time)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={fadeInUp} className="pt-6 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Über mich (Bio)</label>
            <textarea
              name="bio"
              rows={4}
              placeholder="Erzählen Sie etwas über sich, Ihre Motivation und Ihre Hobbys..."
              value={profile.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-black focus:ring-2 focus:ring-brand-black/20 transition-all outline-none resize-none"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-6 border-t border-gray-100 flex items-center justify-between">
            {saveSuccess ? (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-600 font-medium flex items-center gap-2"
              >
                <CheckCircle2 size={20} />
                Erfolgreich gespeichert!
              </motion.span>
            ) : (
              <span />
            )}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSaving}
              className="bg-brand-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-brand-black-dark transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Profil speichern
            </motion.button>
          </motion.div>
        </motion.form>

      </div>
    </motion.div>
  );
}

