import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personal } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

const phoneHref = `tel:${personal.phone.replace(/\s/g, "")}`;

const links = [
  { href: `mailto:${personal.email}`, Icon: Mail, label: "Email", handle: personal.email },
  { href: phoneHref, Icon: Phone, label: "Phone", handle: personal.phone },
  { href: personal.github, Icon: GithubIcon, label: "GitHub", handle: personal.githubHandle },
  { href: personal.linkedin, Icon: LinkedinIcon, label: "LinkedIn", handle: personal.linkedinHandle },
];

export default function Contact() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="contact" className="section-pad relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent dark:via-violet-700/30" />
      <div className="site-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 mb-3">
            05 / Contact
          </p>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            {/* Left */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                Let's{" "}
                <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  work together
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Hiring for a data, ML or AI role, or want to talk about a project? I’d love to hear from you. Drop a line by email or call.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Mail size={16} />
                  Say Hello
                </a>
              </div>
            </div>

            {/* Right – links */}
            <div className="flex flex-col gap-3">
              {links.map(({ href, Icon, label, handle }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 hover:border-violet-200 dark:hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-x-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/15 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-all duration-300 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{handle}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-300 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
