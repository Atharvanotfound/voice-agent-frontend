import { Phone, FileAudio, BrainCircuit, Waves, Speaker } from "lucide-react";
import { SectionHeader } from "./Analytics";

const nodes = [
  { label: "Twilio", sub: "Inbound PSTN", icon: Phone },
  { label: "Speech to Text", sub: "Whisper · Groq", icon: FileAudio },
  { label: "AI Model", sub: "Reasoning · LLM", icon: BrainCircuit },
  { label: "ElevenLabs", sub: "Voice synthesis", icon: Waves },
  { label: "Voice Response", sub: "Back to caller", icon: Speaker },
];

export function Architecture() {
  return (
    <section className="space-y-5">
      <SectionHeader title="System Architecture" subtitle="Real-time voice pipeline" />
      <div className="glass rounded-2xl p-6">
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-5">
          {nodes.map((n, i) => (
            <div key={n.label} className="relative">
              <div className="glass rounded-2xl p-4 text-center transition hover:translate-y-[-2px]">
                <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-primary)] text-primary-foreground glow-sm">
                  <n.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold">{n.label}</div>
                <div className="text-[11px] text-muted-foreground">{n.sub}</div>
              </div>
              {i < nodes.length - 1 && (
                <svg
                  className="absolute right-[-22px] top-1/2 hidden -translate-y-1/2 md:block"
                  width="44"
                  height="20"
                  viewBox="0 0 44 20"
                  fill="none"
                >
                  <path d="M2 10 H42" stroke="var(--primary)" strokeWidth="1.5" className="animate-flow" />
                  <path d="M36 4 L42 10 L36 16" stroke="var(--primary)" strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-full border bg-secondary/40 px-2 py-1">~ 240ms STT</span>
          <span className="rounded-full border bg-secondary/40 px-2 py-1">~ 180ms LLM</span>
          <span className="rounded-full border bg-secondary/40 px-2 py-1">~ 190ms TTS</span>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-primary">
            612ms end-to-end
          </span>
        </div>
      </div>
    </section>
  );
}
