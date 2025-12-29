"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Scale, Dumbbell, Activity, Calendar, FileText, CheckCircle2 } from "lucide-react"
import { addEntry } from "@/app/actions"
import type { WeekEntry, StrengthMetric } from "@/lib/types"
import { cn } from "@/lib/utils"

const defaultLifts = ["bench_press", "squat", "deadlift", "leg_press"]

export default function AddEntryPage() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)

    const today = new Date()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const formatDate = (d: Date) => d.toISOString().split("T")[0]

    const [entry, setEntry] = useState<WeekEntry>({
        week_number: 1,
        date_range: `${formatDate(weekStart)} to ${formatDate(weekEnd)}`,
        phase: "Training",
        program_phase: "Main Program",
        notes: "",
        body_metrics: {
            bodyweight_kg: 0,
            estimated_bodyfat_percent: 0,
            fat_mass_kg: 0,
            lean_mass_kg: 0,
        },
        strength_metrics: Object.fromEntries(
            defaultLifts.map(l => [l, { top_set: "", estimated_1rm_kg: 0 }])
        ),
        weekly_training_summary: {
            sessions_planned: 6,
            sessions_completed: 6,
            training_quality_rating_1_to_10: 7,
        },
    })

    const updateField = <K extends keyof WeekEntry>(key: K, value: WeekEntry[K]) => {
        setEntry(e => ({ ...e, [key]: value }))
    }

    const updateBodyMetric = (key: string, value: number) => {
        setEntry(e => ({
            ...e,
            body_metrics: { ...e.body_metrics, [key]: value }
        }))
    }

    const updateStrength = (lift: string, field: keyof StrengthMetric, value: string | number) => {
        setEntry(e => ({
            ...e,
            strength_metrics: {
                ...e.strength_metrics,
                [lift]: { ...e.strength_metrics[lift], [field]: value }
            }
        }))
    }

    const updateTraining = (key: string, value: number) => {
        setEntry(e => ({
            ...e,
            weekly_training_summary: { ...e.weekly_training_summary!, [key]: value }
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const bw = entry.body_metrics.bodyweight_kg
        const bf = entry.body_metrics.estimated_bodyfat_percent
        const fatMass = +(bw * bf / 100).toFixed(1)
        const leanMass = +(bw - fatMass).toFixed(1)

        const finalEntry = {
            ...entry,
            body_metrics: { ...entry.body_metrics, fat_mass_kg: fatMass, lean_mass_kg: leanMass }
        }

        await addEntry(finalEntry)
        router.push("/tracker")
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} className="container-responsive py-6 md:py-10 space-y-8 md:space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/tracker" className="p-2 md:p-3 hover:bg-muted rounded-2xl border transition-colors group">
                        <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Add Weekly Log</h1>
                        <p className="text-sm text-muted-foreground mt-1">Record your stats and progress for the week.</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-widest hover:opacity-90 transition-opacity md:w-auto w-full"
                >
                    {saving ? "Saving..." : <><Save className="h-4 w-4" /> Save Entry</>}
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-8 md:space-y-10">
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-primary">
                            <Calendar className="h-4 w-4" />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Temporal Metadata</h2>
                        </div>
                        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Week Number</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
                                    value={entry.week_number}
                                    onChange={e => updateField("week_number", +e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Date Range</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    value={entry.date_range}
                                    onChange={e => updateField("date_range", e.target.value)}
                                    placeholder="2023-01-01 to 2023-01-07"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Phase</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    value={entry.phase}
                                    onChange={e => updateField("phase", e.target.value)}
                                    placeholder="Training / Deload"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Program Label</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-2xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    value={entry.program_phase}
                                    onChange={e => updateField("program_phase", e.target.value)}
                                    placeholder="Main Muscle / Power"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-blue-500">
                            <Scale className="h-4 w-4" />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Body Composition</h2>
                        </div>
                        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                            <div className="space-y-2 group p-6 rounded-3xl border bg-card/50 hover:bg-card transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bodyweight</label>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">KG</span>
                                </div>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full bg-transparent text-3xl font-black outline-none placeholder:text-muted/30"
                                    placeholder="0.0"
                                    value={entry.body_metrics.bodyweight_kg || ""}
                                    onChange={e => updateBodyMetric("bodyweight_kg", +e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2 group p-6 rounded-3xl border bg-card/50 hover:bg-card transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Est. Body Fat</label>
                                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">%</span>
                                </div>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full bg-transparent text-3xl font-black outline-none placeholder:text-muted/30"
                                    placeholder="0.0"
                                    value={entry.body_metrics.estimated_bodyfat_percent || ""}
                                    onChange={e => updateBodyMetric("estimated_bodyfat_percent", +e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <CheckCircle2 className="h-4 w-4" />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Weekly Consistency</h2>
                        </div>
                        <div className="grid gap-3 grid-cols-3">
                            <div className="p-4 rounded-2xl border bg-card/50 space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Planned</label>
                                <input
                                    type="number"
                                    className="w-full bg-transparent font-black text-lg outline-none"
                                    value={entry.weekly_training_summary?.sessions_planned || ""}
                                    onChange={e => updateTraining("sessions_planned", +e.target.value)}
                                />
                            </div>
                            <div className="p-4 rounded-2xl border bg-card/50 space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Done</label>
                                <input
                                    type="number"
                                    className="w-full bg-transparent font-black text-lg outline-none"
                                    value={entry.weekly_training_summary?.sessions_completed || ""}
                                    onChange={e => updateTraining("sessions_completed", +e.target.value)}
                                />
                            </div>
                            <div className="p-4 rounded-2xl border bg-card/50 space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Quality</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="w-full bg-transparent font-black text-lg outline-none"
                                    value={entry.weekly_training_summary?.training_quality_rating_1_to_10 || ""}
                                    onChange={e => updateTraining("training_quality_rating_1_to_10", +e.target.value)}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8 md:space-y-10">
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-amber-600">
                            <Dumbbell className="h-4 w-4" />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Strength Thresholds</h2>
                        </div>
                        <div className="space-y-4">
                            {Object.entries(entry.strength_metrics).map(([lift, data]) => (
                                <div key={lift} className="p-5 md:p-6 rounded-3xl border bg-card hover:border-amber-500/30 transition-all space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black uppercase tracking-widest">{lift.replace(/_/g, " ")}</h3>
                                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Top Set Data</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Load × Reps</p>
                                            <input
                                                type="text"
                                                placeholder="90 x 5"
                                                className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm font-bold focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                                value={data.top_set}
                                                onChange={e => updateStrength(lift, "top_set", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Est. 1RM (KG)</p>
                                            <input
                                                type="number"
                                                placeholder="105"
                                                className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm font-bold focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                                value={data.estimated_1rm_kg || ""}
                                                onChange={e => updateStrength(lift, "estimated_1rm_kg", +e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <h2 className="text-xs font-bold uppercase tracking-widest">Subjective Notes</h2>
                        </div>
                        <div className="relative">
                            <textarea
                                rows={4}
                                className="w-full px-6 py-4 rounded-3xl border bg-card focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm leading-relaxed"
                                placeholder="How did you feel this week? Any aches or pain? Any major wins?"
                                value={entry.notes}
                                onChange={e => updateField("notes", e.target.value)}
                            />
                            <div className="absolute top-4 right-4 text-primary/10">
                                <FileText className="h-12 w-12" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
