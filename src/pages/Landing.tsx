import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, ShieldCheck, Heart, Star, ShoppingBag, Users, FileText, Smartphone, CheckCircle2, Quote } from 'lucide-react';
import { cn } from '../lib/utils';

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

export function Landing() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      
      {/* SEKTION 1: Premium Hero & Search */}
      <section className="relative py-32 overflow-hidden bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-brand-black text-sm font-medium mb-6 shadow-sm border border-black/5">
                <ShieldCheck size={16} />
                <span>Exklusiv für Privatversicherte</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-medium leading-[1.1] text-brand-text mb-8">
                Premium-Alltagshilfe für Ihre Eltern. <br />
                <span className="font-serif-italic text-brand-black text-6xl lg:text-7xl">Mit Herz & Verstand.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-12 leading-relaxed max-w-xl">
                Wir vermitteln handverlesene, engagierte Studenten an Senioren für Einkäufe, Spaziergänge und Gesellschaft. Entlastung für Sie, Lebensfreude für Ihre Liebsten.
              </motion.p>

              {/* Search Widget */}
              <motion.div variants={fadeInUp} className="bg-white p-4 rounded-2xl shadow-xl border border-black/5 flex flex-col sm:flex-row gap-3 relative z-20">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="PLZ oder Stadt..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-black focus:ring-2 focus:ring-brand-black/20 transition-all outline-none"
                  />
                </div>
                <div className="flex-1 relative">
                  <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-brand-black focus:ring-2 focus:ring-brand-black/20 transition-all outline-none appearance-none text-gray-700">
                    <option value="">Art der Hilfe</option>
                    <option value="shopping">Einkäufe</option>
                    <option value="company">Gesellschaft</option>
                    <option value="walks">Spaziergänge</option>
                  </select>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:w-auto w-full">
                  <Link 
                    to="/register"
                    className="w-full bg-brand-black text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-black-dark transition-colors flex items-center justify-center whitespace-nowrap h-full shadow-md"
                  >
                    Hilfe finden
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="relative lg:ml-auto"
            >
              <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: '20px 20px 20px 150px' }}>
                <img 
                  src="https://s1.directupload.eu/images/260317/m9yuuk3m.webp" 
                  alt="Studentin hilft Seniorin" 
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SEKTION 2: Trust & Social Proof Bar */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="border-b border-gray-100 bg-white py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-gray-500">
            <div className="flex items-center gap-2 hover:text-brand-black transition-colors">
              <ShieldCheck className="text-brand-black" size={24} />
              <span className="font-medium text-gray-700">100% Verifizierte Studenten</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium uppercase tracking-wider">Bekannt aus</span>
              {/* Placeholder Logos */}
              <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="font-serif-italic text-xl font-bold">Handelsblatt</span>
                <span className="font-serif-italic text-xl font-bold">FAZ</span>
                <span className="font-serif-italic text-xl font-bold">WirtschaftsWoche</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SEKTION 3: Wie es funktioniert (Der 3-Schritte-Plan) - VERTICAL ROADMAP */}
      <section className="py-24 bg-brand-peach/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl lg:text-4xl font-medium text-brand-text mb-4">
              In 3 Schritten zur <span className="font-serif-italic text-brand-black">perfekten Unterstützung</span>
            </h2>
            <p className="text-gray-600">Einfach, sicher und transparent.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative" ref={roadmapRef}>
            {/* Animated Line Container with Fade Mask */}
            <div 
              className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
            >
              {/* Background Line (Paler) */}
              <div className="absolute inset-0 bg-gray-200/40 rounded-full" />
              {/* Active Line */}
              <motion.div 
                className="absolute top-0 w-full bg-gradient-to-b from-brand-blue via-brand-blue to-transparent rounded-full origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-16">
              {[
                {
                  step: "01",
                  icon: <Search size={24} />,
                  title: "Bedarf eingeben",
                  desc: "Teilen Sie uns mit, wo und welche Art von Unterstützung Ihre Angehörigen benötigen.",
                  align: "right"
                },
                {
                  step: "02",
                  icon: <Users size={24} />,
                  title: "Profil wählen",
                  desc: "Lernen Sie verifizierte Studenten aus Ihrer Nähe kennen und wählen Sie den passenden Begleiter.",
                  align: "left"
                },
                {
                  step: "03",
                  icon: <Heart size={24} />,
                  title: "Entlastung spüren",
                  desc: "Lehnen Sie sich zurück. Ihr Angehöriger ist in besten Händen und genießt wertvolle Gesellschaft.",
                  align: "right"
                }
              ].map((item, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    className="absolute left-0 md:left-1/2 w-14 h-14 bg-white border-4 border-brand-peach rounded-full flex items-center justify-center text-brand-black z-10 -translate-x-1/2 shadow-sm"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${item.align === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <motion.div 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        hidden: { opacity: 0, x: item.align === 'left' ? -50 : 50 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                      }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 relative hover:shadow-xl transition-all duration-300"
                    >
                      <div className="text-5xl font-serif-italic text-brand-peach/30 absolute top-4 right-6 select-none">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-medium text-brand-text mb-3 relative z-10">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 4: Unsere Leistungen + Image */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-medium text-brand-text mb-6">
                Unsere <span className="font-serif-italic text-brand-black">Leistungen</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed mb-8">
                Vielfältige Alltagshilfen, die Freude bereiten und den Tag erleichtern. Wir passen uns individuell an die Bedürfnisse Ihrer Angehörigen an.
              </motion.p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Heart size={24} />, title: "Spaziergänge", desc: "Sichere Begleitung an der frischen Luft." },
                  { icon: <ShoppingBag size={24} />, title: "Einkäufe", desc: "Besorgungen des täglichen Bedarfs." },
                  { icon: <FileText size={24} />, title: "Behördengänge", desc: "Unterstützung bei Formularen." },
                  { icon: <Smartphone size={24} />, title: "Technik-Hilfe", desc: "Geduldige Erklärung von Smartphone & Co." }
                ].map((service, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-black shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-text mb-1">{service.title}</h4>
                      <p className="text-sm text-gray-500">{service.desc}</p>
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
              className="relative"
            >
              <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: '150px 20px 20px 20px' }}>
                <img 
                  src="https://s1.directupload.eu/images/260317/574kjnmw.webp" 
                  alt="Gemeinsames Kochen" 
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-start gap-4 max-w-4xl mx-auto hover:shadow-md transition-shadow"
          >
            <ShieldCheck className="text-gray-400 shrink-0 mt-1" size={24} />
            <p className="text-sm text-gray-500 leading-relaxed">
              <strong className="text-gray-700">Wichtiger Hinweis:</strong> CareMatch vermittelt engagierte Alltagsbegleiter für Betreuung, Haushaltshilfe und Gesellschaft. Es handelt sich ausdrücklich <span className="underline decoration-gray-300 underline-offset-2">nicht</span> um medizinische oder pflegerische Leistungen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEKTION 5: Das Premium-Versprechen (Fokus PKV) */}
      <section className="py-24 bg-brand-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: '20px 150px 20px 20px' }}>
                <img 
                  src="https://s1.directupload.eu/images/260317/jh2q7f95.webp" 
                  alt="Vertrauensvolle Begleitung" 
                  className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-medium mb-6 leading-tight">
                Das Premium-Versprechen für <span className="font-serif-italic text-brand-peach">Privatversicherte</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-blue-100 text-lg mb-8 leading-relaxed">
                Wir wissen, dass Ihre Zeit kostbar ist. Deshalb haben wir einen Service entwickelt, der höchste Ansprüche an Qualität und Zuverlässigkeit erfüllt.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-4 mb-10">
                {[
                  "Unkomplizierte Abrechnung über den Entlastungsbetrag",
                  "Persönlicher Concierge-Support bei Fragen",
                  "Geprüfte Profile mit erweitertem Führungszeugnis",
                  "Ersatz-Garantie bei Krankheit des Studenten"
                ].map((item, idx) => (
                  <motion.li key={idx} variants={fadeInUp} className="flex items-center gap-3 text-blue-50">
                    <CheckCircle2 className="text-brand-peach shrink-0" size={20} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-[20px_100px_20px_20px] border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-blue font-bold text-xl shadow-inner shrink-0">
                    €125
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Monatlicher Entlastungsbetrag</h4>
                    <p className="text-blue-200 text-sm">Ab Pflegegrad 1 verfügbar</p>
                  </div>
                </div>
                <p className="text-blue-50 text-sm leading-relaxed">
                  Private Pflegekassen erstatten in der Regel die Kosten für unsere Alltagsbegleiter im Rahmen des gesetzlichen Entlastungsbetrags völlig unbürokratisch.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEKTION 6: Testimonials (Redesigned) */}
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brand-peach/20 rounded-full mix-blend-multiply filter blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[20%] right-[-5%] w-96 h-96 bg-brand-black/10 rounded-full mix-blend-multiply filter blur-3xl" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-medium text-brand-text mb-6">
              Was <span className="font-serif-italic text-brand-black">Angehörige</span> sagen
            </h2>
            <p className="text-lg text-gray-600">Echte Erfahrungen von Familien, die CareMatch bereits vertrauen.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                quote: "Eine unglaubliche Erleichterung für unseren Alltag. Anna ist wie eine Enkelin für meine Mutter geworden. Ich kann beruhigt arbeiten gehen, weil ich weiß, dass sie in besten Händen ist.",
                name: "Sabine M.",
                role: "Tochter (52)",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
              },
              {
                quote: "Die Abrechnung mit der privaten Kasse lief absolut reibungslos. Aber viel wichtiger: Mein Vater blüht durch die wöchentlichen Spaziergänge und Gespräche richtig auf.",
                name: "Dr. Thomas K.",
                role: "Sohn (48)",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
              }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-10 rounded-[40px] shadow-lg border border-black/5 relative hover:shadow-xl transition-shadow"
              >
                <Quote className="absolute top-8 right-8 text-brand-peach/20 w-16 h-16 rotate-180" />
                
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-peach text-brand-peach" />
                  ))}
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed mb-10 relative z-10">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-medium text-brand-text text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEKTION 7: Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Heart className="text-brand-black" size={24} />
              <span className="font-semibold text-xl tracking-tight">CareMatch</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CareMatch GmbH. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>

    </div>
  );
}


