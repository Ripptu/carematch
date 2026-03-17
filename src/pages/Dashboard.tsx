import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Filter, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

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

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mb-10"
      >
        <motion.h1 variants={fadeInUp} className="text-3xl font-medium text-brand-text mb-2">Guten Tag!</motion.h1>
        <motion.p variants={fadeInUp} className="text-gray-600">Finden Sie die passende Unterstützung für Ihre Angehörigen.</motion.p>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row gap-4 mb-10"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="PLZ oder Stadt..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-black focus:ring-2 focus:ring-brand-black/20 transition-all outline-none"
          />
        </div>
        <div className="flex-1 relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-black focus:ring-2 focus:ring-brand-black/20 transition-all outline-none appearance-none">
            <option value="">Alle Leistungen</option>
            <option value="shopping">Einkaufen & Besorgungen</option>
            <option value="company">Gesellschaft & Gespräche</option>
            <option value="walks">Spaziergänge</option>
            <option value="admin">Behördengänge</option>
          </select>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-brand-black text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-black-dark transition-colors"
        >
          Suchen
        </motion.button>
      </motion.div>

      {/* Results Grid (Mockup for now) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-lg transition-all group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={`https://picsum.photos/seed/student${i}/600/400`} 
                alt="Student" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-black flex items-center gap-1">
                <ShieldCheck size={14} />
                Verifiziert
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-brand-text">Anna S., 23</h3>
                  <p className="text-sm text-gray-500">Medizinstudentin</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-brand-text">18€</p>
                  <p className="text-xs text-gray-500">pro Stunde</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>München (Bogenhausen)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span>Verfügbar: Nachmittags</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-brand-peach/50 text-brand-black text-xs px-3 py-1 rounded-full">Gesellschaft</span>
                <span className="bg-brand-peach/50 text-brand-black text-xs px-3 py-1 rounded-full">Einkaufen</span>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl border-2 border-brand-black text-brand-black font-medium hover:bg-brand-black hover:text-white transition-colors"
              >
                Profil ansehen
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
