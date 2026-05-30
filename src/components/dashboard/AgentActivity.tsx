import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const steps = [
  "Call Received",
  "Speech Converted to Text",
  "Language Detected",
  "AI Response Generated",
  "Voice Response Created",
  "Sent Back to Caller",
];

export function AgentActivity() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % (steps.length + 1));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass flex h-[480px] flex-col rounded-2xl">
      <div className="border-b border-white/5 px-5 py-4">
        <h3 className="text-sm font-semibold">Agent Activity</h3>
        <p className="text-xs text-muted-foreground">Reasoning pipeline · per-turn</p>
      </div>
      <div className="relative flex-1 overflow-hidden px-5 py-5">
        <div className="absolute left-[2.05rem] top-7 h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />
        <ul className="space-y-3">
          {steps.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <li key={s} className="relative flex items-center gap-3">
                <div
                  className={`grid h-7 w-7 place-items-center rounded-full border ${
                    done
                      ? "border-primary/40 bg-primary/20 text-primary glow-sm"
                      : current
                      ? "border-primary/60 bg-primary/30 text-primary"
                      : "border-border bg-secondary/40 text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : current ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span className="text-[10px]">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${done || current ? "text-foreground" : "text-muted-foreground"}`}>
                    {s}
                  </div>
                  {current && (
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary/60">
                      <div className="h-full w-1/2 rounded-full bg-[var(--gradient-primary)] shimmer" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {done ? `${(80 + i * 20)}ms` : current ? "…" : "—"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-xl border bg-secondary/30 p-3 text-xs text-muted-foreground">
          End-to-end latency target: <span className="text-foreground">&lt; 800ms</span>. Current avg:{" "}
          <span className="text-foreground">612ms</span>.
        </div>
      </div>
    </div>
  );
}
