import Link from "next/link"
import { getEntries, getWeeklyLog } from "@/lib/data"
import { TrendingDown, TrendingUp, Minus, Dumbbell, Scale, Activity, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function TrackerPage() {
    const [log, entries] = await Promise.all([getWeeklyLog(), getEntries()])

    const weights = entries.map(e => e.body_metrics?.bodyweight_kg).filter(Boolean) as number[]
    const latest = entries[entries.length - 1]
    const prev = entries[entries.length - 2]
    const weightDiff = latest && prev ? latest.body_metrics.bodyweight_kg - prev.body_metrics.bodyweight_kg : 0

    return (
        <main className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase">Weekly Tracker</h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                        {log?.athlete?.name} • <span className="font-bold">{entries.length}</span> weeks logged
                    </p>
                </div>
                <Link
                    href="/tracker/add"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    <Plus className="h-4 w-4" /> Add Entry
                </Link>
            </div>

            {latest && (
                <section className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Latest Summary</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        <div className="p-4 rounded-2xl border bg-card/50">
                            <div className="flex items-center gap-2 text-blue-500 mb-3">
                                <Scale className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Weight</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{latest.body_metrics.bodyweight_kg}</span>
                                <span className="text-sm font-bold text-muted-foreground">KG</span>
                            </div>
                            {weightDiff !== 0 && (
                                <div className={cn(
                                    "flex items-center gap-1 mt-1.5 text-xs font-bold",
                                    weightDiff < 0 ? "text-emerald-500" : "text-rose-500"
                                )}>
                                    {weightDiff < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                    {weightDiff.toFixed(1)} kg
                                </div>
                            )}
                        </div>

                        <div className="p-4 rounded-2xl border bg-card/50">
                            <div className="flex items-center gap-2 text-purple-500 mb-3">
                                <Activity className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Body Fat</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{latest.body_metrics.estimated_bodyfat_percent}</span>
                                <span className="text-sm font-bold text-muted-foreground">%</span>
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground mt-2 uppercase">
                                {latest.body_metrics.lean_mass_kg} KG LEAN
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl border bg-card/50">
                            <div className="flex items-center gap-2 text-amber-600 mb-3">
                                <Dumbbell className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Bench Press</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{latest.strength_metrics?.bench_press?.estimated_1rm_kg ?? "—"}</span>
                                <span className="text-sm font-bold text-muted-foreground">KG</span>
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground mt-2 uppercase">
                                {latest.strength_metrics?.bench_press?.top_set ?? "EST. 1RM"}
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl border bg-card/50">
                            <div className="flex items-center gap-2 text-emerald-600 mb-3">
                                <Dumbbell className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Deadlift</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{latest.strength_metrics?.deadlift?.estimated_1rm_kg ?? "—"}</span>
                                <span className="text-sm font-bold text-muted-foreground">KG</span>
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground mt-2 uppercase">
                                {latest.strength_metrics?.deadlift?.top_set ?? "EST. 1RM"}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {weights.length > 1 && (
                <section className="p-6 md:p-8 rounded-2xl border bg-card">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Weight Trend</h3>
                    <div className="relative h-24 md:h-32 w-full">
                        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#chartGradient)"
                                d={`M0,100 ${weights.map((w, i) => {
                                    const x = (i / (weights.length - 1)) * 400
                                    const min = Math.min(...weights) - 1
                                    const max = Math.max(...weights) + 1
                                    const y = 100 - ((w - min) / (max - min)) * 90
                                    return `L${x},${y}`
                                }).join(" ")} L400,100 Z`}
                            />
                            <polyline
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={weights.map((w, i) => {
                                    const x = (i / (weights.length - 1)) * 400
                                    const min = Math.min(...weights) - 1
                                    const max = Math.max(...weights) + 1
                                    const y = 100 - ((w - min) / (max - min)) * 90
                                    return `${x},${y}`
                                }).join(" ")}
                            />
                        </svg>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-4">
                        <span>Week {entries[0]?.week_number}</span>
                        <span>Week {entries[entries.length - 1]?.week_number}</span>
                    </div>
                </section>
            )}

            <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Historical Logs</h2>
                <div className="space-y-3">
                    {entries.slice().reverse().map((entry, i) => (
                        <div key={i} className="p-5 md:p-6 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl md:text-2xl font-black tracking-tight">Week {entry.week_number}</span>
                                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                                            {entry.phase}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{entry.date_range}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl md:text-2xl font-black tracking-tight">{entry.body_metrics.bodyweight_kg} KG</p>
                                    <p className="text-xs font-bold text-muted-foreground uppercase">{entry.body_metrics.estimated_bodyfat_percent}% Body Fat</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {Object.entries(entry.strength_metrics).map(([lift, data]) => (
                                    <div key={lift} className="p-3 rounded-xl bg-muted/30">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                                            {lift.replace(/_/g, " ")}
                                        </p>
                                        <p className="text-sm font-black">{data.top_set}</p>
                                        {data.estimated_1rm_kg && (
                                            <p className="text-[10px] font-bold text-primary mt-0.5 uppercase">
                                                ~{data.estimated_1rm_kg} KG MAX
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {entry.notes && (
                                <div className="mt-6 pt-6 border-t">
                                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                                        "{entry.notes}"
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
