import { motion } from "framer-motion";
import { MapPin, GraduationCap, Award } from "lucide-react";
import { personal, education, certifications } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="about" className="section-pad relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent dark:via-violet-700/30" />
      <div className="site-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 mb-3">
            01 / About
          </p>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            {/* Left – bio */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Professional{" "}
                <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  summary
                </span>
              </h2>
              {personal.bio.map((paragraph, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mt-4">
                <MapPin size={14} className="text-violet-500" />
                <span>{personal.location}</span>
              </div>
            </div>

            {/* Right – education + certifications */}
            <div className="flex flex-col gap-5">
              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={15} className="text-violet-500" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">Education</span>
                </div>
                <div className="flex flex-col gap-3">
                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.15 * i + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {edu.degree}
                        </p>
                        <span className="shrink-0 px-2 py-0.5 rounded-lg text-xs font-bold bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20">
                          {edu.score}
                        </span>
                      </div>
                      {edu.honours && (
                        <p className="text-xs text-violet-600 dark:text-violet-400 mb-1">
                          {edu.honours}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {edu.institution}{edu.location && `, ${edu.location}`} · {edu.year}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={15} className="text-violet-500" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">Certifications</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5"
                >
                  <ul className="space-y-2">
                    {certifications.map((w, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 dark:bg-violet-500 mt-1.5 shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
