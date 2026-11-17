import { useCallback, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { ArrowDown, Plus, Minus, Maximize2, Move } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Props {
  mermaid: string;
  projectTitle: string;
  /** Forces a fresh render/reset when the project changes */
  animateKey?: number;
}

let mermaidIdCounter = 0;

/** Resolve a CSS colour variable (may be oklch / color-mix) to a hex string Mermaid can parse. */
function cssVarToHex(name: string, fallback: string): string {
  try {
    const probe = document.createElement("span");
    probe.style.color = `var(${name})`;
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx || !resolved) return fallback;
    ctx.fillStyle = resolved;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  } catch {
    return fallback;
  }
}

function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 3;

export default function ArchitectureDiagram({ mermaid: code, projectTitle, animateKey = 0 }: Props) {
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [pendingSvg, setPendingSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Zoom / pan state
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const dark = theme === "dark";

    const c300 = cssVarToHex("--color-violet-300", "#c4b5fd");
    const c400 = cssVarToHex("--color-violet-400", "#a78bfa");
    const c500 = cssVarToHex("--color-violet-500", "#8b5cf6");
    const c600 = cssVarToHex("--color-violet-600", "#7c3aed");
    const c700 = cssVarToHex("--color-violet-700", "#6d28d9");
    const bg = dark ? cssVarToHex("--bg-d2", "#08060f") : cssVarToHex("--bg-l1", "#faf8ff");
    const lineColor = dark ? c400 : c600;
    const labelText = dark ? cssVarToHex("--color-violet-50", "#e9e5ff") : cssVarToHex("--color-violet-900", "#3b246b");
    const clusterBkg = dark ? withAlpha(c500, 0.06) : withAlpha(c500, 0.04);
    const clusterBorder = dark ? withAlpha(c400, 0.35) : withAlpha(c600, 0.3);
    const titleColor = dark ? c300 : c700;
    const nodeFill = dark ? cssVarToHex("--color-indigo-950", "#1e1b3a") : cssVarToHex("--color-indigo-50", "#eef2ff");

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      fontFamily: "inherit",
      flowchart: { htmlLabels: true, curve: "basis", padding: 14, nodeSpacing: 40, rankSpacing: 50 },
      themeVariables: {
        background: "transparent",
        primaryColor: nodeFill,
        primaryBorderColor: lineColor,
        primaryTextColor: cssVarToHex("--color-indigo-950", "#1e1b4b"),
        lineColor,
        fontSize: "13px",
      },
      themeCSS: `
        .edgeLabel, .edgeLabel p, .edgeLabel span {
          background: ${bg} !important;
          color: ${labelText} !important;
          fill: ${labelText} !important;
          font-weight: 600;
        }
        .edgePath path { stroke: ${lineColor}; }
        .flowchart-link { stroke: ${lineColor}; }
        marker path, marker { fill: ${lineColor}; stroke: ${lineColor}; }
        .cluster rect {
          fill: ${clusterBkg} !important;
          stroke: ${clusterBorder} !important;
          rx: 10; ry: 10;
        }
        .cluster .cluster-label, .cluster .cluster-label p, .cluster text {
          fill: ${titleColor} !important;
          color: ${titleColor} !important;
          font-weight: 700;
        }
        .nodeLabel, .nodeLabel p { font-weight: 600; }
      `,
    });

    const renderId = `arch-mermaid-${animateKey}-${mermaidIdCounter++}`;

    setPendingSvg(svg);

    mermaid
      .render(renderId, code)
      .then(({ svg: rendered }) => {
        if (cancelled) return;
        const responsive = rendered
          .replace(/style="max-width:[^"]*"/, 'style="max-width:100%;"')
          .replace(/<svg /, '<svg width="100%" ');
        setSvg(responsive);
        setPendingSvg("");
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error("Mermaid render failed:", err);
        setError(err instanceof Error ? err.message : "Diagram failed to render.");
        setPendingSvg("");
      });

    return () => {
      cancelled = true;
    };
  }, [code, theme, animateKey]);

  // Reset zoom/pan whenever the project changes
  useEffect(() => {
    resetView();
  }, [animateKey, resetView]);

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return; // only zoom with modifier so page scroll still works
    e.preventDefault();
    setZoom((z) => clampZoom(z - e.deltaY * 0.0015));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, baseX: offset.x, baseY: offset.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.baseX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.baseY + (e.clientY - dragRef.current.startY),
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    dragRef.current = null;
    setDragging(false);
  };

  return (
    <figure className="arch-flow relative overflow-hidden rounded-2xl border border-violet-200/50 dark:border-violet-500/20">
      <div className="absolute inset-0 bg-(--bg-l1) dark:bg-(--bg-d2)" />
      <div
        className="absolute inset-0 opacity-50 dark:opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-violet-500) 10%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative px-4 py-4 sm:px-5 sm:py-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">
              Architecture
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-500">{projectTitle}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => clampZoom(z - 0.2))}
              aria-label="Zoom out"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-violet-500 hover:bg-violet-500/10 border border-violet-300/30 dark:border-violet-500/20 transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="text-[10px] tabular-nums text-gray-400 w-9 text-center select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => clampZoom(z + 0.2))}
              aria-label="Zoom in"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-violet-500 hover:bg-violet-500/10 border border-violet-300/30 dark:border-violet-500/20 transition-colors"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              onClick={resetView}
              aria-label="Reset view"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-violet-500 hover:bg-violet-500/10 border border-violet-300/30 dark:border-violet-500/20 transition-colors"
            >
              <Maximize2 size={12} />
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-300/40 bg-rose-500/5 p-4 text-xs text-rose-500">
            <p className="font-semibold mb-2">Could not render diagram.</p>
            <pre className="whitespace-pre-wrap text-[10px] text-gray-500 dark:text-gray-400 overflow-x-auto">
              {code}
            </pre>
          </div>
        ) : (
          <div
            className={`relative h-[clamp(320px,55vh,640px)] overflow-hidden rounded-xl select-none ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <div
              className="origin-center w-full h-full flex items-center justify-center transition-opacity duration-300 will-change-transform [&_svg]:max-w-none"
              style={{ opacity: pendingSvg ? 0.4 : 1, transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
              dangerouslySetInnerHTML={{ __html: svg || pendingSvg }}
            />
          </div>
        )}

        {/* Hint */}
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-gray-400 dark:text-gray-500">
          <Move size={11} />
          <span>Drag to pan · Ctrl/⌘ + scroll to zoom</span>
          <ArrowDown size={11} className="opacity-0" aria-hidden />
        </div>
      </div>
    </figure>
  );
}
