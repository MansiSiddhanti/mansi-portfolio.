
// Deterministic spark particles so the layout is stable across renders.
// op = peak opacity, fl = vertical float (px), dx = horizontal drift (px)
type Spark = {
  top: string;
  left: string;
  size: number;
  delay: string;
  dur: string;
  op: number;
  fl: number;
  dx: number;
};

const sparks: Spark[] = [
  { top: "14%", left: "12%", size: 6, delay: "0s", dur: "4.2s", op: 0.9, fl: 18, dx: 6 },
  { top: "22%", left: "82%", size: 4, delay: "1.1s", dur: "5.1s", op: 0.7, fl: 12, dx: -8 },
  { top: "38%", left: "30%", size: 5, delay: "2.3s", dur: "4.6s", op: 1, fl: 22, dx: 4 },
  { top: "30%", left: "62%", size: 3, delay: "0.6s", dur: "3.8s", op: 0.5, fl: 10, dx: -5 },
  { top: "55%", left: "18%", size: 4, delay: "1.7s", dur: "5.4s", op: 0.8, fl: 16, dx: 9 },
  { top: "48%", left: "88%", size: 5, delay: "2.9s", dur: "4.4s", op: 0.9, fl: 20, dx: -6 },
  { top: "68%", left: "44%", size: 3, delay: "0.9s", dur: "4.9s", op: 0.55, fl: 12, dx: 5 },
  { top: "72%", left: "74%", size: 6, delay: "2.1s", dur: "5.2s", op: 1, fl: 24, dx: -10 },
  { top: "84%", left: "26%", size: 4, delay: "1.4s", dur: "4.1s", op: 0.75, fl: 14, dx: 7 },
  { top: "88%", left: "60%", size: 3, delay: "3.2s", dur: "5.6s", op: 0.5, fl: 10, dx: -4 },
  { top: "10%", left: "50%", size: 4, delay: "2.5s", dur: "4.7s", op: 0.8, fl: 18, dx: 8 },
  { top: "62%", left: "6%", size: 3, delay: "0.3s", dur: "5.0s", op: 0.6, fl: 12, dx: -6 },
  { top: "15%", left: "35%", size: 4, delay: "1.8s", dur: "4.3s", op: 0.85, fl: 16, dx: 5 },
  { top: "25%", left: "65%", size: 5, delay: "0.7s", dur: "5.0s", op: 0.95, fl: 20, dx: -7 },
  { top: "42%", left: "8%", size: 3, delay: "2.0s", dur: "4.5s", op: 0.5, fl: 10, dx: 4 },
  { top: "50%", left: "55%", size: 4, delay: "1.2s", dur: "5.3s", op: 0.8, fl: 18, dx: -9 },
  { top: "65%", left: "78%", size: 5, delay: "3.0s", dur: "4.0s", op: 0.9, fl: 22, dx: 6 },
  { top: "75%", left: "40%", size: 3, delay: "0.4s", dur: "5.5s", op: 0.55, fl: 12, dx: -5 },
  { top: "80%", left: "15%", size: 4, delay: "1.9s", dur: "4.8s", op: 0.75, fl: 16, dx: 8 },
  { top: "92%", left: "50%", size: 5, delay: "2.7s", dur: "4.2s", op: 0.9, fl: 20, dx: -6 },
  { top: "96%", left: "85%", size: 3, delay: "0.8s", dur: "5.1s", op: 0.5, fl: 10, dx: 5 },
  { top: "5%", left: "95%", size: 4, delay: "1.5s", dur: "4.6s", op: 0.8, fl: 16, dx: -7 },
  { top: "33%", left: "95%", size: 3, delay: "2.2s", dur: "5.2s", op: 0.6, fl: 12, dx: 4 },
  { top: "78%", left: "95%", size: 4, delay: "0.5s", dur: "4.9s", op: 0.75, fl: 16, dx: -8 },
  // Fine distant starfield — small, dim, slow
  { top: "8%", left: "22%", size: 2, delay: "1.0s", dur: "6.2s", op: 0.4, fl: 8, dx: 3 },
  { top: "19%", left: "48%", size: 2, delay: "2.6s", dur: "6.8s", op: 0.35, fl: 6, dx: -3 },
  { top: "28%", left: "12%", size: 2, delay: "0.5s", dur: "7.0s", op: 0.45, fl: 9, dx: 4 },
  { top: "44%", left: "72%", size: 2, delay: "3.1s", dur: "6.4s", op: 0.3, fl: 7, dx: -4 },
  { top: "58%", left: "34%", size: 2, delay: "1.6s", dur: "7.2s", op: 0.4, fl: 8, dx: 2 },
  { top: "60%", left: "92%", size: 2, delay: "2.0s", dur: "6.6s", op: 0.35, fl: 6, dx: -2 },
  { top: "70%", left: "58%", size: 2, delay: "0.9s", dur: "7.4s", op: 0.45, fl: 9, dx: 5 },
  { top: "82%", left: "70%", size: 2, delay: "2.8s", dur: "6.0s", op: 0.3, fl: 7, dx: -3 },
  { top: "90%", left: "34%", size: 2, delay: "1.3s", dur: "7.1s", op: 0.4, fl: 8, dx: 4 },
  { top: "12%", left: "70%", size: 2, delay: "3.4s", dur: "6.9s", op: 0.35, fl: 6, dx: -4 },
  { top: "36%", left: "52%", size: 2, delay: "0.2s", dur: "7.3s", op: 0.45, fl: 9, dx: 3 },
  { top: "52%", left: "5%", size: 2, delay: "2.4s", dur: "6.5s", op: 0.3, fl: 7, dx: 2 },
];

/** Site-wide "starfield" background — tinted wash, soft top spotlight, twinkling stars, grain & vignette. */
export default function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-indigo-50 to-sky-100 dark:from-(--bg-d1) dark:via-(--bg-d2) dark:to-(--bg-d3)" />

      {/* Top spotlight cone */}
      <div className="bg-spotlight absolute -top-[30%] left-1/2 w-[min(1100px,130vw)] h-[70vh] rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-violet-500)_34%,transparent),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-violet-600)_55%,transparent),transparent_62%)] blur-2xl" />

      {/* Twinkling sparks — firefly float + fade */}
      <div className="absolute inset-0 opacity-90">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="spark"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}, ${s.delay}`,
              animationDuration: `${s.dur}, ${s.dur}`,
              // @ts-expect-error custom CSS vars consumed by spark keyframes
              "--spark-peak": s.op,
              "--spark-float": `${s.fl}px`,
              "--spark-drift": `${s.dx}px`,
            }}
          />
        ))}
      </div>

      {/* Film grain */}
      <div className="bg-grain absolute inset-0 opacity-[0.05] dark:opacity-[0.07] mix-blend-overlay" />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.35)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
