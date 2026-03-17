import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { HeartHandshake, Loader2, User, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

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

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'relative' | 'student'>('relative');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Insert role into public.users table
        const { error: dbError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            role: role
          });

        if (dbError) throw dbError;

        // 3. If student, create empty profile
        if (role === 'student') {
          await supabase.from('student_profiles').insert({
            id: authData.user.id,
            first_name: '',
            last_name: '',
            verification_status: 'pending'
          });
        }

        // Redirect based on role
        if (role === 'relative') {
          navigate('/dashboard');
        } else {
          navigate('/profile');
        }
      }
    } catch (err: any) {
      console.error("Registration Error:", err);
      if (err.message === 'Failed to fetch') {
        setError('Verbindungsfehler (Failed to fetch). Bitte prüfe, ob dein Supabase-Projekt aktiv ist (nicht pausiert) und deaktiviere ggf. deinen Adblocker.');
      } else {
        setError(err.message || 'Ein Fehler ist aufgetreten.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-brand-peach/20 -z-10" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-black/5"
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <div className="inline-flex bg-brand-black text-white p-3 rounded-2xl mb-4">
            <HeartHandshake size={32} />
          </div>
          <h2 className="text-3xl font-medium text-brand-text">Konto erstellen</h2>
          <p className="mt-2 text-gray-600">Werden Sie Teil von CareMatch.</p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Role Selection */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setRole('relative')}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all flex flex-col items-center gap-2",
                role === 'relative' 
                  ? "border-brand-black bg-brand-black/5 text-brand-black" 
                  : "border-gray-100 hover:border-gray-200 text-gray-500"
              )}
            >
              <Users size={24} />
              <span className="font-medium text-sm text-center">Ich suche Hilfe für Angehörige</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setRole('student')}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all flex flex-col items-center gap-2",
                role === 'student' 
                  ? "border-brand-black bg-brand-black/5 text-brand-black" 
                  : "border-gray-100 hover:border-gray-200 text-gray-500"
              )}
            >
              <User size={24} />
              <span className="font-medium text-sm text-center">Ich möchte Hilfe anbieten</span>
            </motion.button>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail Adresse</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
              placeholder="ihre@email.de"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passwort</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
              placeholder="Mindestens 6 Zeichen"
              minLength={6}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-black text-white py-3.5 rounded-xl font-medium hover:bg-brand-black-dark transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Registrieren'}
            </motion.button>
          </motion.div>
        </form>

        <motion.p variants={fadeInUp} className="mt-8 text-center text-sm text-gray-600">
          Bereits ein Konto?{' '}
          <Link to="/login" className="font-medium text-brand-black hover:underline">
            Hier anmelden
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
