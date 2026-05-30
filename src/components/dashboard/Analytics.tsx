import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Phone, Timer, Languages, CheckCircle2, TrendingUp } from "lucide-react";

const trend = [
  { d: "Mon", c: 142 }, { d: "Tue", c: 168 }, { d: "Wed", c: 201 },
  { d: "Thu", c: 189 }, { d: "Fri", c: 232 }, { d: "Sat", c: 178 }, { d: "Sun", c: 156 },
];
const lang = [
  { name: "English", value: 48, color: "var(--chart-1)" },
  { name: "Hindi", value: 31, color: "var(--chart-2)" },
  { name: "Marathi", value: 13, color: "var(--chart-3)" },
  { name: "Tamil", value: 8, color: "var(--chart-4)" },
];
const dur = [
  { d: "Mon", m: 2.4 }, { d: "Tue", m: 2.8 }, { d: "Wed", m: 3.1 },
  { d: "Thu", m: 2.6 }, { d: "Fri", m: 3.4 }, { d: "Sat", m: 2.9 }, { d: "Sun", m: 2.5 },
];

const kpis = [
  { label: "Total Calls", value: "1,266", delta: "+12.4%", icon: Phone },
  { label: "Avg Response", value: "612ms", delta: "-8.1%", icon: Timer },
  { label: "Languages Used", value: "4", delta: "live", icon: Languages },
  { label: "Successful", value: "94.2%", delta: "+1.3%", icon: CheckCircle2 },
];

export function Analytics() {
  return (
    <section className="space-y-5">
      <SectionHeader title="Call Analytics" subtitle="Last 7 days · auto-refreshing" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <k.icon className="h-4 w-4" />
              </div>
              <span className="flex items-center gap-1 text-[11px] text-[color:var(--success)]">
                <TrendingUp className="h-3 w-3" />
                {k.delta}
              </span>
            </div>
            <div className="mt-4 text-2xl font-semibold tracking-tight">{k.value}</div>
            <div className="text-xs text-muted-foreground">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">Daily Calls Trend</h4>
              <p className="text-xs text-muted-foreground">Volume across all languages</p>
            </div>
            <span className="text-xs text-muted-foreground">7d</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="c" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="mb-4">
            <h4 className="text-sm font-semibold">Language Distribution</h4>
            <p className="text-xs text-muted-foreground">Calls handled per language</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={lang} dataKey="value" innerRadius={42} outerRadius={68} paddingAngle={3} stroke="none">
                    {lang.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2 text-xs">
              {lang.map((l) => (
                <li key={l.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                    {l.name}
                  </span>
                  <span className="text-muted-foreground">{l.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold">Average Call Duration</h4>
            <p className="text-xs text-muted-foreground">Minutes per conversation</p>
          </div>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dur}>
              <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
              <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="m" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
