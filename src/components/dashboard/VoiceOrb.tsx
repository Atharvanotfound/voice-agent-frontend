import { useEffect, useRef, useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export type OrbStatus = "Listening" | "Processing" | "Speaking" | "Idle";

const statusColors: Record<OrbStatus, string> = {
  Listening: "var(--success)",
  Processing: "var(--warning)",
  Speaking: "var(--primary)",
  Idle: "var(--muted-foreground)",
};

export function VoiceOrb() {
  const [status, setStatus] = useState<OrbStatus>("Speaking");
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 28 }, () => Math.random()));
  const [isLive, setIsLive] = useState(false);
  const [prevTurns, setPrevTurns] = useState(0);
  const demoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const liveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Poll server for active calls ────────────────────────────────────────
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/active-calls`);
        const active = await res.json();

        if (active.length > 0) {
          const call = active[0];
          const currentTurns = call.turns || 0;
          setIsLive(true);

          // Determine state based on turn change
          if (currentTurns > prevTurns) {
            setStatus("Processing");
            setPrevTurns(currentTurns);
            setTimeout(() => setStatus("Speaking"), 1500);
            setTimeout(() => setStatus("Listening"), 5000);
          } else if (status === "Listening") {
            // Still listening
            setStatus("Listening");
          } else if (status !== "Speaking") {
            setStatus("Listening");
          }
        } else {
          setIsLive(false);
          setPrevTurns(0);
        }
      } catch {
        setIsLive(false);
      }
    };

    const interval = setInterval(poll, 2000);
    poll();
    return () => clearInterval(interval);
  }, [prevTurns, status]);

  // ─── Demo cycle when no live call ─────────────────────────────────────────
  useEffect(() => {
    if (isLive) {
      if (demoTimerRef.current) clearInterval(demoTimerRef.current);
      return;
    }
    const cycle: OrbStatus[] = ["Listening", "Processing", "Speaking", "Speaking", "Idle"];
    let i = 0;
    demoTimerRef.current = setInterval(() => {
      i = (i + 1) % cycle.length;
      setStatus(cycle[i]);
    }, 3800);
    return () => {
      if (demoTimerRef.current) clearInterval(demoTimerRef.current);
    };
  }, [isLive]);

  // ─── Waveform animation ───────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((_, idx) => {
          if (status === "Idle") return 0.15;
          if (status === "Listening") return 0.2 + Math.random() * 0.25;
          if (status === "Processing") return 0.3 + Math.sin((Date.now() / 200) + idx) * 0.25 + 0.25;
          return 0.3 + Math.random() * 0.7;
        }),
      );
    }, 110);
    return () => clearInterval(id);
  }, [status]);

  const orbAnim =
    status === "Speaking"
      ? "animate-orb-pulse"
      : status === "Listening"
      ? "animate-orb-listen"
      : "";

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative grid h-72 w-72 place-items-center sm:h-80 sm:w-80">
        {/* Ambient rings */}
        {status !== "Idle" && (
          <>
            <span className="absolute inset-0 rounded-full border border-primary/30 animate-ring" />
            <span
              className="absolute inset-0 rounded-full border border-primary/20 animate-ring"
              style={{ animationDelay: "0.8s" }}
            />
          </>
        )}

        {/* Orb */}
        <div
          className={`relative h-56 w-56 rounded-full ${orbAnim}`}
          style={{
            background: "var(--gradient-orb)",
            boxShadow:
              "0 0 80px oklch(0.7 0.16 215 / 45%), inset 0 -20px 60px oklch(0 0 0 / 35%), inset 0 20px 40px oklch(1 0 0 / 10%)",
          }}
        >
          {/* gloss */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
          {/* mesh */}
          <div
            className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
            style={{
              background:
                "conic-gradient(from 90deg, transparent, oklch(1 0 0 / 25%), transparent 40%, oklch(1 0 0 / 15%), transparent 80%)",
            }}
          />
          {/* waveform inside orb */}
          <div className="absolute inset-0 flex items-center justify-center gap-[3px] px-10">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-white/90"
                style={{
                  height: `${10 + h * 70}px`,
                  transition: "height 110ms ease-out",
                  opacity: 0.6 + h * 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 flex items-center gap-2 rounded-full border glass px-4 py-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: statusColors[status], boxShadow: `0 0 12px ${statusColors[status]}` }}
        />
        <span className="text-sm font-medium tracking-wide">
          {isLive ? `Live · ${status}` : status}
        </span>
      </div>
      <p className="mt-3 max-w-md text-center text-xs text-muted-foreground">
        {isLive
          ? "Live call in progress — orb reflecting real agent state."
          : "Live agent orb — pulses while speaking, contracts while listening, ripples while processing."}
      </p>
    </div>
  );
}