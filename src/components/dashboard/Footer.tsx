const stack = ["Twilio", "Groq", "Whisper", "ElevenLabs", "Node.js", "Vercel"];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="text-xs text-muted-foreground">
          © 2026 Adaptive AI Voice Agent · Built for enterprise voice support
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Built using</span>
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border bg-secondary/40 px-2.5 py-1 text-[11px] text-foreground/80"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
