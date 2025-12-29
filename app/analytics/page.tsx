import { getEntries, getWeeklyLog } from "@/lib/data"
import { TrendingDown, TrendingUp, Dumbbell, Scale, BarChart3, Target, Zap } from "lucide-react"

export default async function AnalyticsPage() {
    const [log, entries] = await Promise.all([getWeeklyLog(), getEntries()])

    const weights = entries.map(e => e.body_metrics?.bodyweight_kg).filter(Boolean) as number[]

    const latest = entries[entries.length - 1]
    const first = entries[0]

    const totalWeightLoss = first && latest ? first.body_metrics.bodyweight_kg - latest.body_metrics.bodyweight_kg : 0
    const totalBfDrop = first && latest ? first.body_metrics.estimated_bodyfat_percent - latest.body_metrics.estimated_bodyfat_percent : 0

    return (
        <main className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12">
            <div className="space-y-2 border-b pb-6">
                <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase">Performance Analytics</h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                    Tracking data for <span className="font-bold text-foreground">{log?.athlete?.name}</span> • Progress over <span className="font-bold text-foreground">{entries.length}</span> weeks
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Long-Term Impact</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    <div className="p-5 rounded-2xl border bg-emerald-500/5 border-emerald-500/10">
                        <TrendingDown className="h-5 w-5 text-emerald-500 mb-4" />
                        <p className="text-2xl md:text-3xl font-black text-emerald-500">-{totalWeightLoss.toFixed(1)} KG</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">TOTAL LOSS</p>
                    </div>

                    <div className="p-5 rounded-2xl border bg-purple-500/5 border-purple-500/10">
                        <BarChart3 className="h-5 w-5 text-purple-500 mb-4" />
                        <p className="text-2xl md:text-3xl font-black text-purple-500">-{totalBfDrop.toFixed(1)}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">FAT REDUCTION</p>
                    </div>

                    <div className="p-5 rounded-2xl border bg-blue-500/5 border-blue-500/10">
                        <Scale className="h-5 w-5 text-blue-500 mb-4" />
                        <p className="text-2xl md:text-3xl font-black">{latest?.body_metrics?.lean_mass_kg ?? "—"} KG</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">LEAN MASS</p>
                    </div>

                    <div className="p-5 rounded-2xl border bg-amber-500/5 border-amber-500/10">
                        <Dumbbell className="h-5 w-5 text-amber-500 mb-4" />
                        <p className="text-2xl md:text-3xl font-black">{latest?.strength_metrics?.leg_press?.estimated_1rm_kg ?? "—"} KG</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">LEG PRESS MAX</p>
                    </div>
                </div>
            </section>

            {weights.length > 1 && (
                <section className="p-6 md:p-10 rounded-3xl border bg-card">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Bodyweight Progression</h3>
                    <div className="relative h-48 md:h-64 w-full">
                        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="analytGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#analytGrad)"
                                d={`M0,100 ${weights.map((w, i) => {
                                    const x = (i / (weights.length - 1)) * 400
                                    const min = Math.min(...weights) - 1
                                    const max = Math.max(...weights) + 1
                                    const y = 90 - ((w - min) / (max - min)) * 80
                                    return `L${x},${y}`
                                }).join(" ")} L400,100 Z`}
                            />
                            <polyline
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={weights.map((w, i) => {
                                    const x = (i / (weights.length - 1)) * 400
                                    const min = Math.min(...weights) - 1
                                    const max = Math.max(...weights) + 1
                                    const y = 90 - ((w - min) / (max - min)) * 30
                                    return `${x},${y}`
                                }).join(" ")}
                            />
                            {weights.map((w, i) => {
                                const x = (i / (weights.length - 1)) * 400
                                const min = Math.min(...weights) - 1
                                const max = Math.max(...weights) + 1
                                const y = 90 - ((w - min) / (max - min)) * 80
                                return (
                                    <circle key={i} cx={x} cy={y} r="2" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                                )
                            })}
                        </svg>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-8">
                        <div className="flex flex-col">
                            <span>Start</span>
                            <span className="text-sm text-foreground">{first?.body_metrics?.bodyweight_kg} KG</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span>Current</span>
                            <span className="text-sm text-foreground">{latest?.body_metrics?.bodyweight_kg} KG</span>
                        </div>
                    </div>
                </section>
            )}

            <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strength Evolution</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {["bench_press", "squat", "deadlift", "leg_press"].map(lift => {
                        const firstVal = first?.strength_metrics?.[lift]?.estimated_1rm_kg
                        const latestVal = latest?.strength_metrics?.[lift]?.estimated_1rm_kg
                        const diff = firstVal && latestVal ? latestVal - firstVal : 0

                        return (
                            <div key={lift} className="flex items-center justify-between p-6 rounded-2xl border bg-muted/20">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                                        {lift.replace(/_/g, " ")}
                                    </p>
                                    <p className="text-2xl font-black">{latestVal ?? "—"} KG</p>
                                </div>
                                {diff !== 0 && (
                                    <div className={`flex flex-col items-end ${diff > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                                        <div className="flex items-center gap-1 font-black">
                                            {diff > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                            {diff > 0 ? "+" : ""}{diff}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest opacity-60">PROG.</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}
