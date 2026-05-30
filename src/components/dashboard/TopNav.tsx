import { Bell, Search, Waves } from "lucide-react";

const links = ["Dashboard", "Calls", "Analytics", "Settings"];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] glow-sm">
            <Waves className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Adaptive AI</div>
            <div className="text-[11px] text-muted-foreground">Voice Agent Platform</div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                i === 0
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search calls, agents…</span>
            <kbd className="ml-2 rounded bg-background/60 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-lg border bg-secondary/40 hover:bg-secondary">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary glow-sm" />
          </button>
          <div className="flex items-center gap-2 rounded-lg border bg-secondary/40 px-2 py-1 pr-3">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-[var(--gradient-primary)] text-xs font-semibold text-primary-foreground">
              AR
            </div>
            <div className="hidden text-xs leading-tight sm:block">
              <div className="font-medium">Aarav R.</div>
              <div className="text-muted-foreground">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
