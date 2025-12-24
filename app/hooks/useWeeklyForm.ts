import { useState } from "react";
import { WeeklyEntry } from "../../lib/types/tracker";

export function useWeeklyForm() {
    const [form, setForm] = useState<Omit<WeeklyEntry, "id" | "createdAt">>({
        weekNumber: undefined,
        weekStart: undefined,
        measurements: {},
        lifts: {},
        performance: {},
        nutrition: {},
        assessment: {},
        notes: "",
        decision: "",
    });

    const updateMeasurement = (name: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            measurements: {
                ...prev.measurements,
                [name]: value ? Number(value) : undefined,
            },
        }));
    };

    const updateLift = (name: string, field: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            lifts: {
                ...prev.lifts,
                [name]: {
                    ...(prev.lifts?.[name] ?? {}),
                    [field]: value ? Number(value) : undefined,
                },
            },
        }));
    };

    const updateField = (
        field: keyof Omit<WeeklyEntry, "id" | "createdAt">,
        value: any
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setForm({
            weekNumber: undefined,
            weekStart: undefined,
            measurements: {},
            lifts: {},
            performance: {},
            nutrition: {},
            assessment: {},
            notes: "",
            decision: "",
        });
    };

    return {
        form,
        updateMeasurement,
        updateLift,
        updateField,
        resetForm,
    };
}
