import { useEffect, useState } from "react";
import { SectionHeader } from "./Analytics";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const langLabel: Record<string, string> = { en: "English", hi: "Hindi", ta: "Tamil" };

const statusStyle: Record<string, string> = {
  completed: "bg-secondary text-muted-foreground",
  active: "bg-success/15 text-[color:var(--success)]",
  "in-progress": "bg-success/15 text-[color:var(--success)]",
};

export function RecentCalls() {
  const [calls, setCalls] = useState<any[]>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const [recentRes, activeRes] = await Promise.all([
          fetch(`${SERVER_URL}/api/calls`),
          fetch(`${SERVER_URL}/api/active-calls`),
        ]);
        const recent = await recentRes.json();
        const active = await activeRes.json();
        const activeMapped = active.map((a: any) => ({ ...a, status: "active", endedAt: new Date().toISOString() }));
        setCalls([...activeMapped, ...recent]);
      } catch (err) {
        console.error("Failed to fetch calls:", err);
      }
    };
    fetchCalls();
    const interval = setInterval(fetchCalls, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="space-y-5">
      <SectionHeader title="Recent Calls" subtitle="Live + last 50 calls" />
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Caller</th>
                <th className="px-5 py-3 font-medium">Language</th>
                <th className="px-5 py-3 font-medium">Turns</th>
                <th className="px-5 py-3 font-medium">Transcript Preview</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {calls.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">
                    No calls yet. Make a call to see data here.
                  </td>
                </tr>
              ) : (
                calls.map((r, i) => {
                  const firstMsg = r.history?.[0]?.content || "—";
                  const preview = firstMsg.length > 60 ? firstMsg.slice(0, 60) + "…" : firstMsg;
                  const status = r.status === "active" ? "active" : "completed";
                  return (
                    <tr key={i} className="border-b border-white/5 transition hover:bg-secondary/30">
                      <td className="px-5 py-3.5">
                        <div className="font-medium font-mono text-xs">{r.callSid?.slice(-8) || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">{r.from ? r.from.slice(0, -4).replace(/\d/g, "X") + r.from.slice(-4) : "Unknown"}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-full border bg-secondary/40 px-2.5 py-1 text-xs">
                          {langLabel[r.language] || r.language}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs">{r.turns ?? "—"}</td>
                      <td className="px-5 py-3.5 max-w-[360px] truncate text-muted-foreground">{preview}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyle[status] || statusStyle.completed}`}>
                          {status === "active" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--success)]" />}
                          {status === "active" ? "Active" : "Ended"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
