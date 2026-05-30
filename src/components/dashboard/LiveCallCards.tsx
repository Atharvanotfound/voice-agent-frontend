import { useEffect, useState } from "react";
import { Phone, Clock, Globe2, User2 } from "lucide-react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
const langLabel: Record<string, string> = { en: "English", hi: "Hindi", ta: "Tamil" };

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-5 ${className}`}>{children}</div>;
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function LiveCallCards() {
  const [activeCalls, setActiveCalls] = useState<any[]>([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activeRes, recentRes] = await Promise.all([
          fetch(`${SERVER_URL}/api/active-calls`),
          fetch(`${SERVER_URL}/api/calls`),
        ]);
        const active = await activeRes.json();
        const recent = await recentRes.json();
        setActiveCalls(active);
        setTotalCalls(recent.length);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeCalls.length > 0) {
      const timer = setInterval(() => setElapsed(e => e + 1), 1000);
      return () => clearInterval(timer);
    } else {
      setElapsed(0);
    }
  }, [activeCalls.length]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const currentCall = activeCalls[0];
  const supportedLangs = ["English", "Hindi", "Marathi", "Tamil"];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Call</div>
          <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            currentCall ? "bg-success/15 text-[color:var(--success)]" : "bg-secondary text-muted-foreground"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${currentCall ? "animate-pulse bg-[color:var(--success)]" : "bg-muted-foreground"}`} />
            {currentCall ? "Active" : "Idle"}
          </span>
        </div>
        <div className="mt-4 flex items-end gap-2">
          <div className="text-3xl font-semibold tracking-tight">
            {currentCall ? formatTime(elapsed) : "—"}
          </div>
          <div className="pb-1 text-xs text-muted-foreground">
            {currentCall ? "in progress" : "no active call"}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md border bg-secondary/40 px-2 py-1">{activeCalls.length} active</span>
          <span className="rounded-md border bg-secondary/40 px-2 py-1">{totalCalls} ended today</span>
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Caller Information</div>
        <div className="mt-4 space-y-3">
          <Row icon={<User2 className="h-4 w-4" />} label="Caller" value={currentCall?.from ? currentCall.from.slice(0, -4).replace(/\d/g, "X") + currentCall.from.slice(-4) : "—"} />
          <Row icon={<Phone className="h-4 w-4" />} label="Call SID" value={currentCall?.callSid?.slice(-8) || "—"} />
          <Row icon={<Clock className="h-4 w-4" />} label="Duration" value={currentCall ? formatTime(elapsed) : "—"} />
          <Row icon={<Globe2 className="h-4 w-4" />} label="Language" value={currentCall ? langLabel[currentCall.language] || currentCall.language : "—"} />
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Supported Languages</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {supportedLangs.map((l) => (
            <span
              key={l}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                currentCall && langLabel[currentCall.language] === l
                  ? "border-primary/40 bg-primary/15 text-foreground glow-sm"
                  : "bg-secondary/40 text-muted-foreground"
              }`}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-xl border bg-secondary/30 p-3 text-xs text-muted-foreground">
          {currentCall
            ? `Active call in ${langLabel[currentCall.language] || currentCall.language}. ${currentCall.turns} turn(s) completed.`
            : "No active call. System ready."}
        </div>
      </Card>
    </div>
  );
}
