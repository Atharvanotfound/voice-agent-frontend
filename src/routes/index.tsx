import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/dashboard/TopNav";
import { VoiceOrb } from "@/components/dashboard/VoiceOrb";
import { LiveCallCards } from "@/components/dashboard/LiveCallCards";
import { TranscriptPanel } from "@/components/dashboard/TranscriptPanel";
import { AgentActivity } from "@/components/dashboard/AgentActivity";
import { Analytics } from "@/components/dashboard/Analytics";
import { VoiceConfig } from "@/components/dashboard/VoiceConfig";
import { Architecture } from "@/components/dashboard/Architecture";
import { RecentCalls } from "@/components/dashboard/RecentCalls";
import { Footer } from "@/components/dashboard/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adaptive AI Voice Agent — Multilingual Voice Support Platform" },
      {
        name: "description",
        content:
          "Enterprise-grade AI voice agent dashboard with real-time multilingual transcription, analytics, and live call orchestration.",
      },
      { property: "og:title", content: "Adaptive AI Voice Agent" },
      {
        property: "og:description",
        content: "Multilingual AI voice support — live transcripts, agent reasoning, and analytics.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-[1600px] space-y-12 px-6 py-10">
        {/* Hero */}
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary glow-sm" />
              Live agent · 3 calls in queue
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Multilingual voice support, <span className="text-gradient">handled by AI</span>.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Adaptive AI Voice Agent picks up calls in English, Hindi, Marathi and Tamil — converts speech,
              reasons in real time, and replies with a natural human-like voice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-xl border bg-secondary/40 px-4 py-2.5 text-sm font-medium text-white hover:bg-secondary hover:glow-sm transition">
                Launch Test Call
              </button>
              <button className="rounded-xl border bg-secondary/40 px-4 py-2.5 text-sm font-medium text-white hover:bg-secondary hover:glow-sm transition"
              onClick={() => document.getElementById("transcript-section")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                View Live Transcripts
              </button>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {[
                { l: "Languages", v: "4" },
                { l: "Avg Latency", v: "612ms" },
                { l: "Uptime", v: "99.98%" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-xl p-3 text-center">
                  <div className="text-lg font-semibold">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <VoiceOrb />
          </div>
        </section>

        {/* Live call dashboard */}
        <LiveCallCards />

        {/* Transcript + Agent activity */}
        <div id="transcript-section" className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          <TranscriptPanel />
          <AgentActivity />
        </div>

        {/* Analytics */}
        <Analytics />

        {/* Voice config */}
        <VoiceConfig />

        {/* Architecture */}
        <Architecture />

        {/* Recent calls */}
        <RecentCalls />
      </main>
      <Footer />
    </div>
  );
}
