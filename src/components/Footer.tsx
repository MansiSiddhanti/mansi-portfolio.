import { personal } from "../data/portfolio";

const footerLinks = ["About", "Experience", "Skills", "Projects", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 border-t border-gray-100 dark:border-white/5">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400 dark:text-gray-600">
            © {year} {personal.name}
          </p>

          <nav className="flex items-center gap-6">
            {footerLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="text-xs text-gray-400 dark:text-gray-600 hover:text-violet-500 dark:hover:text-violet-400 flex items-center gap-1.5 transition-colors duration-200"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
