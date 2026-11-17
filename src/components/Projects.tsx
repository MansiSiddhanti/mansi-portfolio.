import { useRef, useState } from "react";
import type { ElementType } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  MessageSquareText,
  LayoutDashboard,
  Sprout,
  Leaf,
  Trash2,
  Hand,
  Fish,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { projects } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ProjectModal from "./ProjectModal";

const projectIcons: Record<string, ElementType> = {
  MessageSquareText,
  LayoutDashboard,
  Sprout,
  Leaf,
  Trash2,
  Hand,
  Fish,
  Sparkles,
};

const statusDot: Record<Project["status"], string> = {
  Live: "bg-emerald-500",
  Completed: "bg-blue-500",
  "In Progress": "bg-amber-500",
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Sets pointer-tracked CSS vars for spotlight sheen + optional tilt. */
function usePointerSpotlight(tilt: boolean) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt) {
      el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el || !tilt) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return { ref, onMouseMove, onMouseLeave };
}

function Sheen({ radius = 440 }: { radius?: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-violet-500) 12%, transparent), transparent 60%)`,
      }}
    />
  );
}

function FeaturedCard({
  project,
  index,
  inView,
  onOpen,
}: {
  project: Project;
  index: number;
  inView: boolean;
  onOpen: () => void;
}) {
  const { ref, onMouseMove, onMouseLeave } = usePointerSpotlight(true);
  const Icon = projectIcons[project.icon] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index + 0.2, duration: 0.6, ease }}
      className="[perspective:1000px]"
    >
      <button
        ref={ref}
        onClick={onOpen}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="tilt-card group relative text-left flex flex-col w-full p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer overflow-hidden"
      >
        <Sheen />
        <div className="relative z-10 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-violet-600 dark:text-violet-400" />
            </span>
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot[project.status]} ${project.status === "Live" ? "animate-pulse" : ""}`} />
                {project.status}
              </span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200"
                  aria-label={`${project.title} on GitHub`}
                >
                  <GithubIcon size={15} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200"
                  aria-label="Live demo"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              <ArrowRight
                size={14}
                className="opacity-0 group-hover:opacity-100 text-violet-400 transition-opacity duration-200"
              />
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 italic">{project.tagline}</p>
          <p className="text-xs text-violet-600/90 dark:text-violet-400/90 mb-3 line-clamp-2">
            <span className="font-semibold text-violet-700 dark:text-violet-300">Role: </span>
            {project.ownership}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/8"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium text-violet-500 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20">
                +{project.tech.length - 4} more
              </span>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useScrollReveal();
  const [selected, setSelected] = useState<Project | null>(null);

  const sortedProjects = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ];

  return (
    <>
      <section id="projects" className="section-pad relative bg-violet-50/20 dark:bg-violet-950/10 border-y border-violet-100/30 dark:border-violet-900/20">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent dark:via-violet-700/30" />
        <div className="site-container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 mb-3">
              04 / Projects
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              Selected{" "}
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                work
              </span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-12 max-w-3xl">
              Analytics platforms, machine learning models, generative AI and real-time vision systems. Open any card for the architecture and details.
            </p>

            {/* Projects */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 items-start">
              {sortedProjects.map((project, i) => (
                <FeaturedCard
                  key={project.id}
                  project={project}
                  index={i}
                  inView={inView}
                  onOpen={() => setSelected(project)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
