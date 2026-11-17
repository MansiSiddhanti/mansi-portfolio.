import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personal, stats } from "../data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function Hero() {
  return (
    <section className="hero-section relative flex flex-col justify-center overflow-hidden">
      {/* Hero accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-violet-500/15 dark:bg-violet-500/10 blur-[80px]" />
      </div>

      <div className="site-container relative z-10">
        <div className="flex flex-col">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Current role — seniority signal */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium bg-white/70 dark:bg-white/[0.04] text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-white/10 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              <span className="text-gray-800 dark:text-white font-semibold">{personal.availability}</span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="hero-title font-display font-bold text-gray-900 dark:text-white tracking-tight mb-4"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {personal.name.split(" ")[0]}
            </span>
            .
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            className="hero-subtitle font-display font-medium text-gray-400 dark:text-gray-500 mb-6"
          >
            {personal.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl xl:max-w-3xl mb-10"
          >
            {personal.tagline}
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#projects"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              See My Work
              <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              Get in Touch →
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-400 dark:text-gray-600 tracking-widest uppercase font-medium">Find me</span>
            <div className="h-px w-6 bg-gray-200 dark:bg-white/10" />
            {[
              { href: personal.github, Icon: GithubIcon, label: "GitHub" },
              { href: personal.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
              { href: `mailto:${personal.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: easeOut }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 pt-10 border-t border-gray-200/70 dark:border-white/10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="block text-5xl xl:text-6xl font-bold font-display bg-gradient-to-br from-violet-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent leading-[1.15] pb-1 pr-1">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-snug max-w-[120px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-200"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
