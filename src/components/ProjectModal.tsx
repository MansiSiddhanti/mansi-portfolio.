import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle, Clock, Zap, Layers, AlertTriangle, TrendingUp } from "lucide-react";
import type { Project } from "../data/portfolio";
import { getProjectMermaid } from "../data/projectArchitecture";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { GithubIcon } from "./Icons";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const statusConfig = {
  Live: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20", dot: "bg-emerald-500" },
  Completed: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20", dot: "bg-blue-500" },
  "In Progress": { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20", dot: "bg-amber-500" },
};

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
          <Icon size={14} />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm tracking-wide uppercase">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Full-screen popup */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-2 sm:inset-4 md:inset-5 lg:inset-6 z-[51] flex flex-col rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0a0a0a] shadow-2xl border border-gray-200/80 dark:border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-5 sm:px-8 lg:px-10 pt-5 sm:pt-7 pb-5 border-b border-gray-100 dark:border-white/5 shrink-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
                    >
                      <GithubIcon size={12} /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
                    >
                      Live Demo <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                <h2
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-3 flex-wrap"
                >
                  {project.title}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig[project.status].bg} ${statusConfig[project.status].color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[project.status].dot} ${project.status === "Live" ? "animate-pulse" : ""}`} />
                    {project.status}
                  </span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.tagline}</p>
                <p className="text-xs text-violet-600 dark:text-violet-400 mt-2 leading-relaxed">
                  <span className="font-semibold">My role: </span>
                  {project.ownership}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all duration-200 shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 lg:px-10 py-6 sm:py-8">
              <div className="max-w-6xl mx-auto space-y-9 lg:space-y-10">

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/8">
                    {t}
                  </span>
                ))}
              </div>

              {/* Problem */}
              <Section icon={AlertTriangle} title="Problem Statement">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-white/[0.03] rounded-xl p-4 border border-gray-100 dark:border-white/5">
                  {project.problemStatement}
                </p>
              </Section>

              {/* Architecture */}
              <Section icon={Layers} title="Architecture">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {project.architecture}
                </p>
                {getProjectMermaid(project.id) && (
                  <div>
                    <ArchitectureDiagram
                      mermaid={getProjectMermaid(project.id)!}
                      projectTitle={project.title}
                      animateKey={project.id}
                    />
                  </div>
                )}
              </Section>

              {/* Features */}
              <Section icon={Zap} title="Key Features">
                <ul className="space-y-2.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={15} className="text-violet-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Challenges */}
              <Section icon={Clock} title="Challenges & Solutions">
                <div className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-gray-100 dark:border-white/5">
                      <div className="px-4 py-3 bg-red-50/70 dark:bg-red-500/5 border-b border-gray-100 dark:border-white/5">
                        <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-1">Challenge</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{c.problem}</p>
                      </div>
                      <div className="px-4 py-3 bg-emerald-50/70 dark:bg-emerald-500/5">
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Solution</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{c.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Impact */}
              <Section icon={TrendingUp} title="Impact & Results">
                <div className="space-y-2.5">
                  {project.impact.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-violet-50/60 dark:bg-violet-500/5 border border-violet-100 dark:border-violet-500/15">
                      <TrendingUp size={14} className="text-violet-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </Section>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
