import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import type { SkillTier } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

const tierStyle: Record<SkillTier, string> = {
  core: "bg-violet-100 dark:bg-violet-500/20 text-violet-800 dark:text-violet-200 border border-violet-200 dark:border-violet-500/30 font-semibold",
  proficient: "bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-white/8",
  familiar: "bg-transparent text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-white/10",
};

export default function Skills() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="skills" className="section-pad relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent dark:via-violet-700/30" />
      <div className="site-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 mb-3">
            03 / Skills
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            Technical{" "}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              stack
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-12 max-w-3xl">
            From querying and analysing data to training models and deploying them behind an API.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-500/20 transition-all duration-300"
              >
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 rounded-xl text-sm transition-all duration-200 cursor-default ${tierStyle[skill.tier]}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-8 text-xs text-gray-400 dark:text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-violet-100 dark:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30" />
              Core strength
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8" />
              Proficient
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border border-dashed border-gray-300 dark:border-white/10" />
              Familiar
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
