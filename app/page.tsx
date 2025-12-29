import Link from "next/link"
import { getProgram, getEntries } from "@/lib/data"
import { ArrowRight, TrendingDown, TrendingUp, Dumbbell, Scale, BarChart3, Plus, History, BookOpen, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function Home() {
    const [program, entries] = await Promise.all([getProgram(), getEntries()])
    const latest = entries[entries.length - 1]
    const prev = entries[entries.length - 2]
    const weightDiff = latest && prev ? latest.body_metrics.bodyweight_kg - prev.body_metrics.bodyweight_kg : 0

    return (
        <main className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12">
            <section className="text-center py-4 md:py-12 border-b">
                <h1 className="text-2xl md:text-5xl font-black tracking-tight mb-2 md:mb-4">
                    STAY HUNGRY, SAD, AND BROKEN.
                </h1>

            </section>

            {latest && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Metrics</h2>
                        <Link href="/tracker/add" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                            <Plus className="h-3 w-3" /> ADD LOG
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        <div className="group p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-all">
                            <div className="flex items-center gap-2 text-blue-500 mb-3 md:mb-4">
                                <Scale className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Weight</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{latest.body_metrics.bodyweight_kg}</span>
                                <span className="text-sm font-bold text-muted-foreground">KG</span>
                            </div>
                            {weightDiff !== 0 && (
                                <div className={cn(
                                    "flex items-center gap-1 mt-2 text-xs font-bold",
                                    weightDiff < 0 ? "text-emerald-500" : "text-rose-500"
                                )}>
                                    {weightDiff < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                    {weightDiff > 0 ? "+" : ""}{weightDiff.toFixed(1)}
                                </div>
                            )}
                        </div>

                        <div className="group p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-all">
                            <div className="flex items-center gap-2 text-purple-500 mb-3 md:mb-4">
                                <BarChart3 className="h-4 w-4" />
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

                        <div className="group p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-all">
                            <div className="flex items-center gap-2 text-amber-600 mb-3 md:mb-4">
                                <Dumbbell className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Deadlift</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{latest.strength_metrics?.deadlift?.estimated_1rm_kg ?? "—"}</span>
                                <span className="text-sm font-bold text-muted-foreground">KG</span>
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground mt-2 uppercase">
                                EST. 1RM
                            </div>
                        </div>

                        <div className="group p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-all">
                            <div className="flex items-center gap-2 text-emerald-600 mb-3 md:mb-4">
                                <BarChart3 className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Consistency</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-black">{entries.length}</span>
                                <span className="text-sm font-bold text-muted-foreground">WEEKS</span>
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground mt-2 uppercase">
                                TOTAL LOGS
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Quick Access Links */}
            <section className="grid md:grid-cols-3 gap-4 md:gap-6">
                <Link
                    href="/tracker"
                    className="group relative p-6 rounded-2xl border bg-card hover:border-primary transition-all overflow-hidden"
                >
                    <div className="relative z-10">
                        <History className="h-8 w-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <h3 className="text-lg font-bold">Weekly Tracker</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">Review all your weekly logs and body metrics.</p>
                        <div className="flex items-center text-xs font-black uppercase tracking-widest gap-2">
                            Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform" />
                </Link>

                <Link
                    href="/plans"
                    className="group relative p-6 rounded-2xl border bg-card hover:border-primary transition-all overflow-hidden"
                >
                    <div className="relative z-10">
                        <BookOpen className="h-8 w-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <h3 className="text-lg font-bold">Workout Plans</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">{program?.plans?.length ?? 0} active plans currently available.</p>
                        <div className="flex items-center text-xs font-black uppercase tracking-widest gap-2">
                            View Plans <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform" />
                </Link>

                <Link
                    href="/analytics"
                    className="group relative p-6 rounded-2xl border bg-card hover:border-primary transition-all overflow-hidden"
                >
                    <div className="relative z-10">
                        <BarChart2 className="h-8 w-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <h3 className="text-lg font-bold">Analytics</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">Deep dive into your progression charts.</p>
                        <div className="flex items-center text-xs font-black uppercase tracking-widest gap-2">
                            Analyze <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform" />
                </Link>
            </section>
        </main>
    )
}
