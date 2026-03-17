import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Users, Star } from 'lucide-react';

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

export function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-medium leading-[1.1] text-brand-text mb-6">
              Unsere Mission: <br />
              <span className="font-serif-italic text-brand-black text-6xl lg:text-7xl">Generationen verbinden.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed">
              Wir glauben daran, dass das Alter Würde, Freude und Gesellschaft verdient. CareMatch entstand aus dem eigenen Bedürfnis heraus, unseren Eltern die beste Unterstützung im Alltag zu bieten, wenn wir selbst arbeiten müssen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden shadow-2xl" style={{ borderRadius: '150px 20px 20px 20px' }}>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800" 
                  alt="Zwei Generationen lachen zusammen" 
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-medium text-brand-text mb-6">
                Wie alles <span className="font-serif-italic text-brand-black">begann</span>
              </motion.h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <motion.p variants={fadeInUp}>
                  Als die Mutter unseres Gründers Unterstützung im Alltag brauchte, standen wir vor einem Problem: Pflegedienste waren überlastet und für einfache Aufgaben wie Spaziergänge oder gemeinsames Kochen oft nicht die richtige Wahl.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Gleichzeitig suchten viele engagierte Studenten nach sinnvollen Nebenjobs, die mehr Erfüllung bieten als das Einräumen von Supermarktregalen. Die Idee zu CareMatch war geboren.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Heute bringen wir diese beiden Welten zusammen. Wir schaffen eine Win-Win-Situation: Senioren erhalten liebevolle Gesellschaft und Unterstützung, Angehörige spüren echte Entlastung, und Studenten finanzieren ihr Studium durch eine sinnstiftende Tätigkeit.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-brand-peach/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-medium text-brand-text mb-4">
              Unsere <span className="font-serif-italic text-brand-black">Werte</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600">Das Fundament unserer täglichen Arbeit.</motion.p>
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
                icon: <ShieldCheck size={32} />,
                title: "Kompromisslose Sicherheit",
                desc: "Vertrauen ist gut, Verifizierung ist besser. Wir prüfen jeden Studenten persönlich, verlangen ein erweitertes Führungszeugnis und sichern jeden Einsatz haftpflichtrechtlich ab."
              },
              {
                icon: <Heart size={32} />,
                title: "Echte Empathie",
                desc: "Wir vermitteln keine Dienstleister, sondern Wegbegleiter. Bei unserem Matching achten wir auf gemeinsame Interessen und Sympathie."
              },
              {
                icon: <Star size={32} />,
                title: "Premium Qualität",
                desc: "Unser Service richtet sich an höchste Ansprüche. Von der ersten Anfrage bis zur unkomplizierten Abrechnung mit der privaten Pflegekasse."
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 transition-all"
              >
                <div className="w-14 h-14 bg-brand-peach/50 rounded-2xl flex items-center justify-center text-brand-black mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium text-brand-text mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
