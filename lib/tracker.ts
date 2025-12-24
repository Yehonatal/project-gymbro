import { WeeklyEntry } from "./types/tracker";

// Epley formula for approximate 1RM
export function e1RM(weightKg: number, reps: number) {
    if (!weightKg || !reps) return null;
    return Math.round(weightKg * (1 + reps / 30));
}

export function computeSimpleTrends(entries: WeeklyEntry[]) {
    // entries assumed sorted by createdAt desc
    if (!entries || entries.length === 0) return null;
    const latest = entries[0];
    const prev = entries[1];
    if (!prev) return { strengthTrend: "n/a", weightChange: 0, waistChange: 0 };
    // compute simple numeric differences for weight and waist
    const latestWeight = latest?.measurements?.bodyweightKg ?? null;
    const prevWeight = prev?.measurements?.bodyweightKg ?? null;
    const weightChange =
        latestWeight && prevWeight ? latestWeight - prevWeight : 0;
    const latestWaist = latest?.measurements?.waistCm ?? null;
    const prevWaist = prev?.measurements?.waistCm ?? null;
    const waistChange = latestWaist && prevWaist ? latestWaist - prevWaist : 0;
    const strengthTrend = latest?.assessment?.strength ?? "maintained";
    return { strengthTrend, weightChange, waistChange };
}
