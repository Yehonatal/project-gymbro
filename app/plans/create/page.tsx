"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addPlan } from "@/app/actions"
import { Plus, Trash2, ArrowLeft, Save, Layout, Dumbbell, Clock, Type, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { WorkoutPlan, WorkoutDay, Exercise } from "@/lib/types"

const emptyExercise = (): Exercise => ({
    name: "",
    sets: 3,
    reps: "8-12",
    loads_kg: "",
    tempo: "3-0-1-0",
    rest: "90s",
    type: "compound"
})

const emptyDay = (): WorkoutDay => ({
    day: 1,
    title: "",
    estimated_time_minutes: 60,
    exercises: [emptyExercise()]
})

export default function CreatePlanPage() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [plan, setPlan] = useState<WorkoutPlan>({
        plan_name: "",
        phase: "",
        description: "",
        days: [emptyDay()]
    })

    const addDay = () => {
        setPlan(p => ({
            ...p,
            days: [...p.days, { ...emptyDay(), day: p.days.length + 1 }]
        }))
    }

    const removeDay = (di: number) => {
        setPlan(p => ({
            ...p,
            days: p.days.filter((_, i) => i !== di).map((d, i) => ({ ...d, day: i + 1 }))
        }))
    }

    const updateDay = (di: number, field: keyof WorkoutDay, value: unknown) => {
        setPlan(p => ({
            ...p,
            days: p.days.map((d, i) => i === di ? { ...d, [field]: value } : d)
        }))
    }

    const addExercise = (di: number) => {
        setPlan(p => ({
            ...p,
            days: p.days.map((d, i) => i === di ? { ...d, exercises: [...d.exercises, emptyExercise()] } : d)
        }))
    }

    const removeExercise = (di: number, ei: number) => {
        setPlan(p => ({
            ...p,
            days: p.days.map((d, i) => i === di ? { ...d, exercises: d.exercises.filter((_, j) => j !== ei) } : d)
        }))
    }

    const updateExercise = (di: number, ei: number, field: keyof Exercise, value: unknown) => {
        setPlan(p => ({
            ...p,
            days: p.days.map((d, i) => i === di ? {
                ...d,
                exercises: d.exercises.map((e, j) => j === ei ? { ...e, [field]: value } : e)
            } : d)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        await addPlan(plan)
        router.push("/plans")
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/plans" className="p-2 md:p-3 hover:bg-muted rounded-2xl border transition-colors group">
                        <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">Create Plan</h1>
                        <p className="text-sm text-muted-foreground mt-1">Design a new training phase for your program.</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity md:w-auto w-full"
                >
                    {saving ? "Creating..." : <><Save className="h-4 w-4" /> Save Plan</>}
                </button>
            </div>

            <section className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                    <Layout className="h-4 w-4" />
                    <h2 className="text-xs font-bold uppercase tracking-widest">Plan Identity</h2>
                </div>
                <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Plan Name</label>
                        <input
                            placeholder="e.g. Hypertrophy Phase 1"
                            className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                            value={plan.plan_name}
                            onChange={e => setPlan(p => ({ ...p, plan_name: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phase Tag</label>
                        <input
                            placeholder="e.g. Strength / Volume"
                            className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold uppercase text-xs"
                            value={plan.phase}
                            onChange={e => setPlan(p => ({ ...p, phase: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">General Description</label>
                        <input
                            placeholder="Primary focus of this plan..."
                            className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                            value={plan.description}
                            onChange={e => setPlan(p => ({ ...p, description: e.target.value }))}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-2 text-amber-600">
                        <Dumbbell className="h-4 w-4" />
                        <h2 className="text-xs font-bold uppercase tracking-widest">Workout Schedule</h2>
                    </div>
                    <button
                        type="button"
                        onClick={addDay}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed hover:border-primary hover:text-primary transition-all text-xs font-black uppercase tracking-widest"
                    >
                        <Plus className="h-3 w-3" /> Add Day
                    </button>
                </div>

                <div className="space-y-8">
                    {plan.days.map((day, di) => (
                        <div key={di} className="group relative rounded-3xl border bg-card overflow-hidden transition-all hover:border-primary/20">
                            <div className="bg-muted/30 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-lg font-black">
                                        {day.day}
                                    </div>
                                    <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Session Title</span>
                                            <input
                                                placeholder="e.g. Chest & Back"
                                                className="bg-transparent border-b border-muted hover:border-primary transition-colors focus:border-primary outline-none px-1 py-0.5 font-black text-lg md:text-xl uppercase tracking-tight placeholder:text-muted-foreground/30"
                                                value={day.title}
                                                onChange={e => updateDay(di, "title", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Duration (Min)</span>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3 w-3 text-muted-foreground" />
                                                <input
                                                    type="number"
                                                    className="bg-transparent border-b border-muted hover:border-primary transition-colors focus:border-primary outline-none px-1 py-0.5 font-bold text-sm w-16"
                                                    value={day.estimated_time_minutes}
                                                    onChange={e => updateDay(di, "estimated_time_minutes", +e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {plan.days.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDay(di)}
                                        className="p-2.5 rounded-xl border bg-background/50 hover:bg-rose-500 hover:text-white transition-colors text-muted-foreground group/del"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <div className="p-4 md:p-8 space-y-4">
                                <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                    <div className="col-span-4">Exercise Name</div>
                                    <div className="col-span-1 text-center">Sets</div>
                                    <div className="col-span-2">Reps</div>
                                    <div className="col-span-2">Load</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-1"></div>
                                </div>

                                <div className="space-y-3">
                                    {day.exercises.map((ex, ei) => (
                                        <div key={ei} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center p-4 rounded-2xl border bg-muted/10 group/ex hover:bg-muted/20 transition-all">
                                            <div className="md:col-span-4 flex flex-col gap-1">
                                                <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-muted-foreground">Exercise Name</span>
                                                <input
                                                    placeholder="Incline Bench..."
                                                    className="w-full bg-transparent font-black md:text-sm text-xs uppercase tracking-tight outline-none"
                                                    value={ex.name}
                                                    onChange={e => updateExercise(di, ei, "name", e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-1 flex flex-col gap-1">
                                                <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-muted-foreground">Sets</span>
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent font-bold text-sm md:text-center outline-none"
                                                    value={ex.sets}
                                                    onChange={e => updateExercise(di, ei, "sets", +e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2 flex flex-col gap-1">
                                                <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-muted-foreground">Reps</span>
                                                <input
                                                    placeholder="8-12"
                                                    className="w-full bg-transparent font-bold text-sm outline-none"
                                                    value={ex.reps}
                                                    onChange={e => updateExercise(di, ei, "reps", e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2 flex flex-col gap-1">
                                                <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-muted-foreground">Initial Load</span>
                                                <input
                                                    placeholder="60kg"
                                                    className="w-full bg-transparent font-bold text-sm outline-none"
                                                    value={String(ex.loads_kg)}
                                                    onChange={e => updateExercise(di, ei, "loads_kg", e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2 flex flex-col gap-1">
                                                <span className="md:hidden text-[9px] font-black uppercase tracking-widest text-muted-foreground">Exercise Type</span>
                                                <select
                                                    className="w-full bg-transparent font-black px-0.5 py-0.5 rounded text-[10px] uppercase tracking-widest outline-none cursor-pointer"
                                                    value={ex.type}
                                                    onChange={e => updateExercise(di, ei, "type", e.target.value)}
                                                >
                                                    <option value="compound">Compound</option>
                                                    <option value="isolation">Isolation</option>
                                                    <option value="neck">Neck</option>
                                                    <option value="grip">Grip</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-1 flex justify-center mt-2 md:mt-0">
                                                <button
                                                    type="button"
                                                    onClick={() => removeExercise(di, ei)}
                                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-100 md:opacity-0 group-hover/ex:opacity-100"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addExercise(di)}
                                    className="flex items-center gap-2 px-4 py-2 mt-4 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-4 transition-all"
                                >
                                    ADD EXERCISE <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </form>
    )
}
