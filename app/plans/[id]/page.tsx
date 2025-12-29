import Link from "next/link"
import { notFound } from "next/navigation"
import { getProgram } from "@/lib/data"
import { ArrowLeft, Clock, Flame, Zap, Target, Gauge, Info, Calendar, Dumbbell } from "lucide-react"

type Props = { params: Promise<{ id: string }> }

const typeStyles = {
    compound: {
        bg: "from-amber-500/10 to-transparent border-amber-500/20",
        text: "text-amber-500",
        icon: Flame
    },
    isolation: {
        bg: "from-blue-500/10 to-transparent border-blue-500/20",
        text: "text-blue-500",
        icon: Target
    },
    neck: {
        bg: "from-purple-500/10 to-transparent border-purple-500/20",
        text: "text-purple-500",
        icon: Zap
    },
    grip: {
        bg: "from-emerald-500/10 to-transparent border-emerald-500/20",
        text: "text-emerald-500",
        icon: Target
    }
}

export default async function PlanDetailsPage({ params }: Props) {
    const { id } = await params
    const program = await getProgram()
    const index = parseInt(id, 10)

    if (!program || isNaN(index) || !program.plans[index]) {
        notFound()
    }

    const plan = program.plans[index]
    const totalExercises = plan.days.reduce((sum, d) => sum + d.exercises.length, 0)
    const totalTime = plan.days.reduce((sum, d) => sum + d.estimated_time_minutes, 0)

    return (
        <main className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12">
            <div className="space-y-6 border-b pb-8">
                <Link href="/plans" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Plans
                </Link>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                            {plan.phase}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none">
                        {plan.plan_name}
                    </h1>
                    <p className="text-sm md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                        {plan.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Volume</span>
                            <span className="text-sm font-bold uppercase">{plan.days.length} DAYS / WK</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Variety</span>
                            <span className="text-sm font-bold uppercase">{totalExercises} EXERCISES</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duration</span>
                            <span className="text-sm font-bold uppercase">~{totalTime} MINS</span>
                        </div>
                    </div>
                </div>
            </div>

            {plan.rules && (
                <section className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Training Rules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {plan.rules.volume_reduction_percent && (
                            <div className="p-4 rounded-2xl border bg-rose-500/5 border-rose-500/10 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                                    <Gauge className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500/60">Volume Drop</p>
                                    <p className="text-lg font-black">{plan.rules.volume_reduction_percent}% REDUCTION</p>
                                </div>
                            </div>
                        )}
                        {plan.rules.load_reduction_percent && (
                            <div className="p-4 rounded-2xl border bg-amber-500/5 border-amber-500/10 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Flame className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/60">Load Drop</p>
                                    <p className="text-lg font-black">{plan.rules.load_reduction_percent}% REDUCTION</p>
                                </div>
                            </div>
                        )}
                        <div className="p-4 rounded-2xl border bg-blue-500/5 border-blue-500/10 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Info className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500/60">Intensity</p>
                                <p className="text-lg font-black">{plan.rules.rir ?? 2} RIR TARGET</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center md:text-left">Workout Protocol</h2>
                <div className="space-y-4 md:space-y-6">
                    {plan.days.map(day => (
                        <div key={day.day} className="rounded-3xl border bg-card overflow-hidden">
                            <div className="bg-muted/30 p-5 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-lg font-black shadow-lg shadow-primary/20">
                                        {day.day}
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{day.title}</h3>
                                        <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
                                            {day.exercises.length} EXERCISES • {day.estimated_time_minutes} MINS
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 md:p-8 grid gap-4 md:grid-cols-2">
                                {day.exercises.map((ex, i) => {
                                    const style = typeStyles[ex.type] || typeStyles.isolation
                                    const Icon = style.icon
                                    return (
                                        <div key={i} className={`group relative p-5 rounded-2xl border bg-gradient-to-br ${style.bg} hover:border-primary/30 transition-all`}>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded-lg bg-background/50 flex items-center justify-center ${style.text}`}>
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm md:text-base font-black uppercase tracking-tight leading-tight max-w-[150px] md:max-w-none line-clamp-2">
                                                        {ex.name}
                                                    </span>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-background/80 ${style.text}`}>
                                                    {ex.type}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Method</span>
                                                    <span className="text-sm font-black">{ex.sets} × {ex.reps}</span>
                                                </div>
                                                <div className="flex flex-col border-l border-r px-4">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Load</span>
                                                    <span className="text-sm font-black truncate">
                                                        {Array.isArray(ex.loads_kg) ? ex.loads_kg.join("/") : ex.loads_kg}KG
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Rest</span>
                                                    <span className="text-sm font-black">{ex.rest}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
