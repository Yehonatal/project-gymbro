"use client";
import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
    Check,
    ChevronDown,
    Calendar,
    Weight,
    Ruler,
    TrendingUp,
} from "lucide-react";
import MeasurementField from "./MeasurementField";
import LiftField from "./LiftField";
import { useWeeklyTracker } from "../../app/hooks/useWeeklyTracker";
import { useWeeklyForm } from "../../app/hooks/useWeeklyForm";

export default function WeeklyTrackerForm() {
    const { entries, loading, error, submitEntry } = useWeeklyTracker();
    const { form, updateMeasurement, updateLift, updateField, resetForm } =
        useWeeklyForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await submitEntry(form);
        if (success) {
            resetForm();
        }
    };

    if (error) {
        return (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="card">
                    <h3 className="section-title flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Bodyweight & Measurements
                    </h3>
                    <div className="two-col">
                        <MeasurementField
                            label="Bodyweight (kg)"
                            name="bodyweightKg"
                            value={form.measurements?.bodyweightKg}
                            onChange={updateMeasurement}
                        />
                        <MeasurementField
                            label="Waist @ navel (cm)"
                            name="waistCm"
                            value={form.measurements?.waistCm}
                            onChange={updateMeasurement}
                        />
                        <MeasurementField
                            label="Upper arm (relaxed, cm)"
                            name="upperArmCm"
                            value={form.measurements?.upperArmCm}
                            onChange={updateMeasurement}
                        />
                        <MeasurementField
                            label="Upper thigh (cm)"
                            name="upperThighCm"
                            value={form.measurements?.upperThighCm}
                            onChange={updateMeasurement}
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 className="section-title flex items-center gap-2">
                        <Weight className="h-4 w-4" />
                        Strength Checkpoints (Key Lifts)
                    </h3>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                        <LiftField
                            label="Leg Press"
                            name="legPress"
                            lift={form.lifts?.legPress}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="Squat / Hack Squat"
                            name="squat"
                            lift={form.lifts?.squat}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="Deadlift"
                            name="deadlift"
                            lift={form.lifts?.deadlift}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="RDL / Hip Thrust"
                            name="rdlHip"
                            lift={form.lifts?.rdlHip}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="Bench Press"
                            name="bench"
                            lift={form.lifts?.bench}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="Incline Press"
                            name="incline"
                            lift={form.lifts?.incline}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="Lat Pulldown / Pull-up"
                            name="pulldown"
                            lift={form.lifts?.pulldown}
                            onChange={updateLift}
                        />
                        <LiftField
                            label="Row"
                            name="row"
                            lift={form.lifts?.row}
                            onChange={updateLift}
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 className="section-title">Notes / Adjustments</h3>
                    <textarea
                        className="input min-h-[120px] resize-none"
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                        placeholder="e.g., Leg press up again, bench felt flat"
                    />
                </div>

                <div className="card">
                    <h3 className="section-title flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Decision for next week
                    </h3>

                    <SelectPrimitive.Root
                        value={form.decision}
                        onValueChange={(val) => updateField("decision", val)}
                    >
                        <SelectPrimitive.Trigger className="select-trigger">
                            <SelectPrimitive.Value placeholder="Choose a decision..." />
                            <SelectPrimitive.Icon>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectPrimitive.Icon>
                        </SelectPrimitive.Trigger>
                        <SelectPrimitive.Portal>
                            <SelectPrimitive.Content className="select-content">
                                <SelectPrimitive.Viewport className="p-1">
                                    <SelectItem value="keep">
                                        Keep plan exactly the same
                                    </SelectItem>
                                    <SelectItem value="reduce">
                                        Reduce volume slightly
                                    </SelectItem>
                                    <SelectItem value="increase">
                                        Increase load on main lifts
                                    </SelectItem>
                                    <SelectItem value="deload">
                                        Deload (only if strength drops)
                                    </SelectItem>
                                </SelectPrimitive.Viewport>
                            </SelectPrimitive.Content>
                        </SelectPrimitive.Portal>
                    </SelectPrimitive.Root>

                    <div className="mt-8">
                        <button
                            className="btn w-full sm:w-auto"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Weekly Entry"}
                        </button>
                    </div>
                </div>
            </form>

            <div className="space-y-6">
                <h3 className="section-title flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Recent Entries
                </h3>
                {loading ? (
                    <div className="flex h-24 items-center justify-center rounded-xl border border-dashed">
                        <span className="subtle animate-pulse">
                            Loading entries...
                        </span>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="flex h-24 items-center justify-center rounded-xl border border-dashed">
                        <span className="subtle">No entries yet.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {entries.map((en) => (
                            <div
                                key={en.id}
                                className="card group relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold">
                                                {new Date(
                                                    en.createdAt
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                            {en.weekNumber && (
                                                <span className="rounded-full bg-[var(--muted)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                                    Week {en.weekNumber}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-tight text-[var(--muted-foreground)]">
                                                    Weight
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {en.measurements
                                                        ?.bodyweightKg ??
                                                        "-"}{" "}
                                                    kg
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-tight text-[var(--muted-foreground)]">
                                                    Waist
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {en.measurements?.waistCm ??
                                                        "-"}{" "}
                                                    cm
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-[10px] font-bold uppercase tracking-tight text-[var(--muted-foreground)]">
                                                    Decision
                                                </p>
                                                <p className="text-sm font-medium capitalize">
                                                    {en.decision || "None"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {en.notes && (
                                    <div className="mt-4 border-t pt-4">
                                        <p className="text-[10px] font-bold uppercase tracking-tight text-[var(--muted-foreground)]">
                                            Notes
                                        </p>
                                        <p className="mt-1 text-sm italic text-[var(--muted-foreground)] line-clamp-2">
                                            "{en.notes}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const SelectItem = React.forwardRef(
    ({ children, className, ...props }: any, forwardedRef) => {
        return (
            <SelectPrimitive.Item
                className="select-item"
                {...props}
                ref={forwardedRef}
            >
                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center justify-center">
                    <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
        );
    }
);
SelectItem.displayName = "SelectItem";
