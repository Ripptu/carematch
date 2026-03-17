import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Wallet, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export function ForStudents() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-brand-black text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Wir suchen Verstärkung in deiner Stadt
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-medium leading-[1.1] mb-6">
                Werde Alltagsheld und verdiene <span className="font-serif-italic text-brand-peach">flexibel Geld.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-blue-100 mb-10 leading-relaxed max-w-xl">
                Unterstütze Senioren im Alltag, teile deine Zeit frei ein und sammle wertvolle Erfahrungen. Ein Nebenjob, der wirklich Sinn macht.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/register?role=student"
                    className="bg-brand-peach text-brand-black px-8 py-4 rounded-xl font-medium hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    Jetzt bewerben <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="relative lg:ml-auto"
            >
              <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: '150px 20px 20px 20px' }}>
                <img 
                  src="https://s1.directupload.eu/images/260317/pr8gieoa.webp" 
                  alt="Glücklicher Student" 
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                className="absolute top-12 -left-8 bg-white text-brand-text p-5 rounded-2xl shadow-xl border border-black/5 z-20 flex items-center gap-4"
              >
                <div className="bg-brand-peach p-3 rounded-full text-brand-blue">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold">15€ - 20€ / Stunde</p>
                  <p className="text-xs text-gray-500">Du bestimmst deinen Lohn</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-medium text-brand-text mb-4">
              Warum <span className="font-serif-italic text-brand-black">CareMatch?</span>
            </h2>
            <p className="text-gray-600">Der perfekte Nebenjob für dein Studium.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Clock size={32} />,
                title: "100% Flexibel",
                desc: "Arbeite nur dann, wenn es dein Stundenplan zulässt. Du entscheidest, welche Anfragen du annimmst."
              },
              {
                icon: <Wallet size={32} />,
                title: "Faires Honorar",
                desc: "Verdiene zwischen 15€ und 20€ pro Stunde. Die Abrechnung läuft sicher und transparent über unsere Plattform."
              },
              {
                icon: <Heart size={32} />,
                title: "Sinnvolle Arbeit",
                desc: "Statt Regale einzuräumen, schenkst du älteren Menschen Lebensfreude und sammelst soziale Kompetenzen."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-brand-peach/50 rounded-2xl flex items-center justify-center text-brand-black mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-brand-text mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-medium text-brand-text mb-6">
                In 4 Schritten zum <span className="font-serif-italic text-brand-black">Alltagshelden</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 mb-10 text-lg">
                Sicherheit und Vertrauen stehen bei uns an erster Stelle. Deshalb durchläuft jeder Student einen kurzen, aber gründlichen Verifizierungsprozess.
              </motion.p>

              <div className="space-y-8">
                {[
                  { title: "Profil erstellen", desc: "Registriere dich und erzähle etwas über dich, deine Hobbys und deinen Studiengang." },
                  { title: "Dokumente hochladen", desc: "Lade deine Immatrikulationsbescheinigung und deinen Ausweis hoch." },
                  { title: "Führungszeugnis", desc: "Reiche ein erweitertes Führungszeugnis ein (Kosten können erstattet werden)." },
                  { title: "Kennenlernen", desc: "Ein kurzes Video-Interview mit unserem Team, und schon bist du freigeschaltet!" }
                ].map((step, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex gap-4 group">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center font-medium text-sm group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-brand-text mb-1 group-hover:text-brand-black transition-colors">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="bg-brand-bg p-8 sm:p-12 rounded-[40px] border border-black/5"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <ShieldCheck className="text-brand-black" size={32} />
                  <div>
                    <h3 className="font-medium text-lg">Unser Trust-Versprechen</h3>
                    <p className="text-sm text-gray-500">Sicherheit für beide Seiten</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Du bist während deiner Einsätze über uns haftpflichtversichert.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Garantierte und pünktliche Auszahlung deines Honorars.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Persönlicher Support bei Fragen oder Problemen.</span>
                  </li>
                </ul>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/register?role=student"
                    className="mt-8 w-full bg-brand-black text-white py-4 rounded-xl font-medium hover:bg-brand-black-dark transition-colors flex items-center justify-center shadow-md"
                  >
                    Profil anlegen
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
