import Link from "next/link"
import { getProgram } from "@/lib/data"
import { deletePlan } from "@/app/actions"
import { Plus, Trash2, Calendar, Dumbbell, Clock, ArrowRight } from "lucide-react"

export default async function PlansPage() {
    const program = await getProgram()

    if (!program) {
        return (
            <main className="container-responsive py-10 text-center">
                <h1 className="text-2xl font-bold">No program found.</h1>
                <Link href="/" className="text-primary hover:underline mt-4 inline-block">Return home</Link>
            </main>
        )
    }

    const handleDelete = async (index: number) => {
        "use server"
        await deletePlan(index)
    }

    return (
        <main className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase">Training Plans</h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                        Current Split: <span className="font-bold text-foreground uppercase">{program.metadata.training_split}</span>
                    </p>
                </div>
                <Link
                    href="/plans/create"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                    <Plus className="h-4 w-4" /> New Plan
                </Link>
            </div>

            {/* Metrics/Goals Tags */}
            <section className="flex flex-wrap gap-2">
                <h2 className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Program Goals</h2>
                {program.metadata.goal.map((g, i) => (
                    <span key={i} className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-primary/5 border text-primary">
                        {g}
                    </span>
                ))}
            </section>

            {/* Plans Grid */}
            <section className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Available Phases</h2>
                <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {program.plans.map((plan, i) => {
                        const totalTime = plan.days.reduce((sum, d) => sum + d.estimated_time_minutes, 0)
                        const totalExercises = plan.days.reduce((sum, d) => sum + d.exercises.length, 0)

                        return (
                            <div key={i} className="group relative rounded-2xl border bg-card hover:border-primary/50 transition-all flex flex-col">
                                <form action={handleDelete.bind(null, i)} className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 rounded-lg bg-background/80 backdrop-blur border hover:bg-rose-500 hover:text-white transition-colors text-muted-foreground">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </form>

                                <Link href={`/plans/${i}`} className="flex-1 p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded bg-primary/10 text-primary">
                                            {plan.phase}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-black mb-2 uppercase tracking-tight line-clamp-1">{plan.plan_name}</h2>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                                        {plan.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-b">
                                        <div className="flex flex-col items-center justify-center">
                                            <Calendar className="h-4 w-4 text-muted-foreground mb-1" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{plan.days.length} DAYS</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center border-l border-r">
                                            <Dumbbell className="h-4 w-4 text-muted-foreground mb-1" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{totalExercises} EXS</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <Clock className="h-4 w-4 text-muted-foreground mb-1" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">~{Math.round(totalTime / Math.max(1, plan.days.length))}M</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                                        START WORKOUT <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}
