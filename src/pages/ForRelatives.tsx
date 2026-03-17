import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ShieldCheck, MapPin, Clock, Filter, ChevronDown, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AVAILABLE_SERVICES = ['Gesellschaft', 'Einkäufe', 'Spaziergänge', 'Behördengänge', 'Technik-Hilfe'];
const AVAILABLE_TIMES = ['Vormittags', 'Nachmittags', 'Abends', 'Wochenende'];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function ForRelatives() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState<number>(10);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('verification_status', 'verified');
        
      if (error) throw error;
      if (data) {
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  const handleAvailabilityToggle = (time: string) => {
    setSelectedAvailabilities(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
  };

  // Filter Logic
  const filteredStudents = students.filter(student => {
    // 1. PLZ & Radius Filter
    // Da wir keine echte Geocoding-API haben, nutzen wir eine Heuristik für Deutschland:
    // Je mehr Ziffern der PLZ übereinstimmen, desto näher sind die Orte.
    if (zipCode.trim().length >= 2) {
      if (!student.location_zip) return false;
      const z1 = String(zipCode).padStart(5, '0');
      const z2 = String(student.location_zip).padStart(5, '0');
      
      let match = false;
      if (radius === 0) match = z1 === z2;
      else if (radius <= 5) match = z1.substring(0, 4) === z2.substring(0, 4);
      else if (radius <= 20) match = z1.substring(0, 3) === z2.substring(0, 3);
      else if (radius <= 50) match = z1.substring(0, 2) === z2.substring(0, 2);
      else match = z1.substring(0, 1) === z2.substring(0, 1);
      
      if (!match) return false;
    }

    // 2. Leistungen Filter (Student muss ALLE gewählten Leistungen anbieten)
    if (selectedServices.length > 0) {
      const studentServices = student.services ? student.services.split(',') : [];
      const hasAll = selectedServices.every(s => studentServices.includes(s));
      if (!hasAll) return false;
    }

    // 3. Verfügbarkeit Filter (Student muss MINDESTENS EINE der gewählten Zeiten anbieten)
    if (selectedAvailabilities.length > 0) {
      const studentAvail = student.availability ? student.availability.split(',') : [];
      const hasAny = selectedAvailabilities.some(a => studentAvail.includes(a));
      if (!hasAny) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-24 overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-brand-black text-white py-16 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-medium mb-4"
            >
              Finden Sie die <span className="font-serif-italic text-brand-peach">passende Unterstützung</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-blue-100 text-lg"
            >
              Durchsuchen Sie unsere verifizierten Studenten-Profile und finden Sie den perfekten Alltagsbegleiter für Ihre Angehörigen.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filter (Left) */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-80 shrink-0"
          >
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 sticky top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter size={20} className="text-brand-black" />
                <h2 className="font-medium text-lg text-brand-text">Filter</h2>
              </div>

              {/* Filter: Ort & Radius */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Einsatzort (PLZ)</label>
                <div className="relative mb-3">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="PLZ eingeben" 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-black focus:ring-2 focus:ring-brand-black/20 transition-all outline-none text-sm"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-600">Umkreis</label>
                  <span className="text-sm font-medium text-brand-black">+{radius} km</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="5"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full accent-brand-black"
                />
              </div>

              {/* Filter: Leistungen */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Gewünschte Leistungen</label>
                <div className="space-y-2.5">
                  {AVAILABLE_SERVICES.map((service) => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedServices.includes(service) ? 'bg-brand-black border-brand-black' : 'border-gray-300 group-hover:border-brand-black'}`}>
                        {selectedServices.includes(service) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{service}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Verfügbarkeit */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Verfügbarkeit</label>
                <div className="space-y-2.5">
                  {AVAILABLE_TIMES.map((time) => (
                    <label key={time} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedAvailabilities.includes(time) ? 'bg-brand-black border-brand-black' : 'border-gray-300 group-hover:border-brand-black'}`}>
                        {selectedAvailabilities.includes(time) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{time}</span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedAvailabilities.includes(time)}
                        onChange={() => handleAvailabilityToggle(time)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(zipCode || selectedServices.length > 0 || selectedAvailabilities.length > 0) && (
                <motion.button 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onClick={() => {
                    setZipCode('');
                    setRadius(10);
                    setSelectedServices([]);
                    setSelectedAvailabilities([]);
                  }}
                  className="w-full text-gray-500 hover:text-brand-black py-2 text-sm font-medium transition-colors"
                >
                  Filter zurücksetzen
                </motion.button>
              )}
            </div>
          </motion.aside>

          {/* Main Content / Grid (Right) */}
          <main className="flex-1">
            {/* Active Filters & Sort */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-6"
            >
              <p className="text-gray-600">
                <strong className="text-brand-text font-medium">{filteredStudents.length} Studenten</strong> in Ihrer Nähe gefunden
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sortieren nach:</span>
                <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-brand-black">
                  <option>Beste Übereinstimmung</option>
                  <option>Entfernung</option>
                  <option>Preis aufsteigend</option>
                </select>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-brand-black" size={32} />
              </div>
            ) : filteredStudents.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-3xl border border-black/5 text-center"
              >
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-brand-text mb-2">Keine passenden Studenten gefunden</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Bitte passen Sie Ihre Filter an (z.B. den Umkreis vergrößern oder weniger Leistungen auswählen), um mehr Ergebnisse zu sehen.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                {filteredStudents.map((student, idx) => {
                  const servicesList = student.services ? student.services.split(',') : [];
                  const availList = student.availability ? student.availability.split(',') : [];
                  // Placeholder image if none provided
                  const imageUrl = `https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&seed=${student.id}`;

                  return (
                    <motion.div 
                      key={student.id}
                      variants={fadeInUp}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-xl transition-shadow duration-300 group flex flex-col"
                    >
                      {/* Card Header / Image */}
                      <div className="h-56 overflow-hidden relative">
                        <img 
                          src={imageUrl} 
                          alt={`${student.first_name} ${student.last_name}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Verified Badge */}
                        {student.verification_status === 'verified' && (
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-green-700 flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck size={14} className="text-green-600" />
                            Verifiziert
                          </div>
                        )}

                        {/* Basic Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-2xl font-medium mb-1">
                            {student.first_name} {student.last_name?.charAt(0)}., {student.age}
                          </h3>
                          <p className="text-white/80 text-sm flex items-center gap-1.5">
                            Studium: {student.study_program}
                          </p>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin size={16} className="text-gray-400 shrink-0" />
                              <span className="truncate">{student.location_zip} {student.location_city}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock size={16} className="text-gray-400 shrink-0" />
                              <span className="truncate" title={availList.join(', ')}>
                                {availList.slice(0, 2).join(', ')}
                                {availList.length > 2 && ' +'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right bg-brand-bg px-3 py-2 rounded-xl shrink-0">
                            <p className="font-medium text-brand-black text-lg">{student.hourly_rate}€</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">pro Stunde</p>
                          </div>
                        </div>

                        {/* Services Tags */}
                        <div className="mb-8 flex-1">
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Bietet an</p>
                          <div className="flex flex-wrap gap-2">
                            {servicesList.slice(0, 3).map(service => (
                              <span key={service} className="bg-brand-peach/40 text-brand-black text-xs font-medium px-3 py-1.5 rounded-full">
                                {service}
                              </span>
                            ))}
                            {servicesList.length > 3 && (
                              <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                                +{servicesList.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link 
                            to={`/register?role=relative`}
                            className="w-full py-3.5 rounded-xl border-2 border-brand-black text-brand-black font-medium hover:bg-brand-black hover:text-white transition-colors text-center block"
                          >
                            Profil ansehen
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
