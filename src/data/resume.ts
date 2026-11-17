// Auto-detected resume.
// Drop a single PDF into `src/resume/` and it is picked up automatically at build/dev time.
// To swap the resume: delete the old PDF, add the new one — no code changes needed.
const resumeFiles = import.meta.glob("../resume/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

const urls = Object.values(resumeFiles) as string[];

// Fall back to the static public copy if the folder is ever empty.
export const resumeUrl: string = urls[0] ?? "/resume.pdf";
