import { useEffect, useRef, useState } from "react";
import { Bot, User2 } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

type Msg = { role: "user" | "ai"; text: string; t: string };

export function TranscriptPanel() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [isLive, setIsLive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/active-calls`);
        const active = await res.json();
        if (active.length > 0) {
          setIsLive(true);
          const history = active[0].history || [];
          const mapped: Msg[] = history.map((m: any) => ({
            role: m.role === "user" ? "user" : "ai",
            text: m.content,
            t: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          }));
          setMsgs(mapped);
        } else {
          setIsLive(false);
          // Show last ended call transcript
          const recentRes = await fetch(`${SERVER_URL}/api/calls`);
          const recent = await recentRes.json();
          if (recent.length > 0) {
            const history = recent[0].history || [];
            const mapped: Msg[] = history.map((m: any) => ({
              role: m.role === "user" ? "user" : "ai",
              text: m.content,
              t: new Date(recent[0].endedAt).toLocaleTimeString("en-IN"),
            }));
            setMsgs(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to fetch transcript:", err);
      }
    };

    fetchTranscript();
    const interval = setInterval(fetchTranscript, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  return (
    <div className="glass flex h-[480px] flex-col rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold">Live Conversation</h3>
          <p className="text-xs text-muted-foreground">Real-time transcript · auto-scroll</p>
        </div>
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
          isLive ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "animate-pulse bg-primary" : "bg-muted-foreground"}`} />
          {isLive ? "Live" : "Last Call"}
        </span>
      </div>
      <div ref={ref} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {msgs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No transcript yet. Make a call to see live conversation here.
          </div>
        ) : (
          msgs.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "" : "flex-row-reverse"}`}>
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                m.role === "user" ? "bg-secondary text-foreground" : "bg-[var(--gradient-primary)] text-primary-foreground"
              }`}>
                {m.role === "user" ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[78%] ${m.role === "user" ? "" : "text-right"}`}>
                <div className="mb-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{m.role === "user" ? "Caller" : "AI Agent"}</span>
                  <span>·</span>
                  <span>{m.t}</span>
                </div>
                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-tl-sm bg-secondary"
                    : "rounded-tr-sm bg-primary/15 text-foreground ring-1 ring-primary/20"
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))
        )}
        {isLive && (
          <div className="flex gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary">
              <User2 className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  style={{ animation: `bar-bounce 1s ease-in-out ${i * 0.15}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
