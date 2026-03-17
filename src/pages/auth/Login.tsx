import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { HeartHandshake, Loader2 } from 'lucide-react';

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

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch role to redirect correctly
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (userError) throw userError;

      if (!userData || !userData.role) {
        navigate('/onboarding');
      } else if (userData.role === 'relative') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      console.error("Login Error:", err);
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
          <h2 className="text-3xl font-medium text-brand-text">Willkommen zurück</h2>
          <p className="mt-2 text-gray-600">Melden Sie sich in Ihrem Konto an.</p>
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

        <form onSubmit={handleLogin} className="space-y-6">
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
              placeholder="••••••••"
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
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Anmelden'}
            </motion.button>
          </motion.div>
        </form>

        <motion.p variants={fadeInUp} className="mt-8 text-center text-sm text-gray-600">
          Noch kein Konto?{' '}
          <Link to="/register" className="font-medium text-brand-black hover:underline">
            Jetzt registrieren
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
