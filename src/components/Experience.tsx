import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

function highlightMetrics(bullet: string) {
  return bullet.replace(
    /(~?\$?[\d,]+[%+x]?[\w+]*|\d+[\d,.]*\s?[%+xK$M]?)/g,
    '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>'
  );
}

export default function Experience() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="experience" className="section-pad relative bg-violet-50/20 dark:bg-violet-950/10 border-y border-violet-100/30 dark:border-violet-900/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent dark:via-violet-700/30" />
      <div className="site-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 mb-3">
            02 / Experience
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            Experience &{" "}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              impact
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-12 max-w-3xl">
            Internships where I built data pipelines, dashboards and computer vision systems.
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/20 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-10">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="sm:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-[calc(1.5rem+0.75rem)] w-5 h-5 rounded-full bg-white dark:bg-[#0a0a0a] border-2 border-violet-500 hidden sm:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 group">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase size={13} className="text-violet-500" />
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-gray-400" />
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {exp.location}
                          </span>
                        </span>
                        <span className="text-gray-300 dark:text-gray-700">·</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 dark:bg-violet-500 mt-1.5 shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: highlightMetrics(bullet) }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
