import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, User, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'relative' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!role || !user) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);

      if (error) throw error;

      if (role === 'relative') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-black/5 text-center"
      >
        <div className="inline-flex bg-brand-black text-white p-3 rounded-2xl mb-6">
          <HeartHandshake size={32} />
        </div>
        <h2 className="text-3xl font-medium text-brand-text mb-2">Willkommen bei CareMatch</h2>
        <p className="text-gray-600 mb-8">Wie möchten Sie CareMatch nutzen?</p>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setRole('student')}
            className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${role === 'student' ? 'border-brand-black bg-brand-bg' : 'border-gray-100 hover:border-gray-300'}`}
          >
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <User size={24} />
            </div>
            <div className="text-left">
              <div className="font-medium text-brand-text">Als Student</div>
              <div className="text-sm text-gray-500">Ich möchte helfen.</div>
            </div>
          </button>

          <button
            onClick={() => setRole('relative')}
            className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${role === 'relative' ? 'border-brand-black bg-brand-bg' : 'border-gray-100 hover:border-gray-300'}`}
          >
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <HeartHandshake size={24} />
            </div>
            <div className="text-left">
              <div className="font-medium text-brand-text">Als Angehöriger</div>
              <div className="text-sm text-gray-500">Ich suche Unterstützung.</div>
            </div>
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={!role || isLoading}
          className="w-full bg-brand-black text-white py-4 rounded-xl font-medium hover:bg-brand-black-dark transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Weiter'}
        </button>
      </motion.div>
    </div>
  );
}
