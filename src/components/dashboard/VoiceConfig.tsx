import { useState, useEffect } from "react";
import { Mic2, Sparkles } from "lucide-react";
import { SectionHeader } from "./Analytics";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const voices = [
  { id: "en", label: "English Voice", sub: "Shreya · Neutral" },
  { id: "hi", label: "Hindi Voice", sub: "Rajiv · Warm" },
  { id: "mr", label: "Marathi Voice", sub: "Vinayak · Clear" },
  { id: "ta", label: "Tamil Voice", sub: "Srivi · Bright" },
];

const personas = ["Professional", "Friendly", "Formal", "Customer Support Executive"];

export function VoiceConfig() {
  const [voice, setVoice] = useState("en");
  const [persona, setPersona] = useState("Customer Support Executive");

  useEffect(() => {
    const fetchActiveLanguage = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/active-calls`);
        const active = await res.json();
        if (active.length > 0) setVoice(active[0].language);
      } catch {}
    };
    fetchActiveLanguage();
    const interval = setInterval(fetchActiveLanguage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="space-y-5">
      <SectionHeader title="Voice Configuration" subtitle="Tune voice model and agent personality" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Mic2 className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Voice Model</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {voices.map((v) => {
              const active = voice === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setVoice(v.id)}
                  className={`group relative rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-primary/50 bg-primary/10 glow-sm"
                      : "border-border bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{v.label}</div>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        active ? "bg-primary glow-sm" : "bg-muted-foreground/40"
                      }`}
                    />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{v.sub}</div>
                  <div className="mt-3 flex items-end gap-[2px] h-6">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-[2px] rounded-full ${active ? "bg-primary" : "bg-muted-foreground/40"}`}
                        style={{
                          height: `${20 + Math.abs(Math.sin(i * 0.7 + (active ? 0 : 1))) * 80}%`,
                          opacity: active ? 0.9 : 0.5,
                        }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Agent Personality</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {personas.map((p) => {
              const active = persona === p;
              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-primary/50 bg-primary/15 text-foreground glow-sm"
                      : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border bg-secondary/30 p-4 text-sm leading-relaxed">
            <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Preview</div>
            <p className="text-foreground/90">
              "Thank you for calling. I'm your AI assistant — how may I help you today? I'll keep things{" "}
              <span className="text-primary">{persona.toLowerCase()}</span> and concise."
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { l: "Pitch", v: 0.6 },
              { l: "Pace", v: 0.5 },
              { l: "Warmth", v: 0.75 },
            ].map((s) => (
              <div key={s.l}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.l}</span>
                  <span>{Math.round(s.v * 100)}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-[var(--gradient-primary)]" style={{ width: `${s.v * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
