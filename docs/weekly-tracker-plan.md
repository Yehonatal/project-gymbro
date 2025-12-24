## Data Model (MVP)

```ts
// lib/types/tracker.ts
interface WeeklyEntry {
  id: string; // timestamp-based id
  weekNumber: number;
  weekStart: string; // ISO date
  measurements: {
    bodyweightKg?: number;
    waistCm?: number;
    upperArmCm?: number;
    upperThighCm?: number;
  };
  lifts: {
    legPress?: { weightKg: number; reps: number };
    squat?: { weightKg: number; reps: number };
    deadlift?: { weightKg: number; reps: number };
    rdlHip?: { weightKg: number; reps: number };
    bench?: { weightKg: number; reps: number };
    incline?: { weightKg: number; reps: number };
    pulldown?: { weightKg: number; reps: number };
    row?: { weightKg: number; reps: number };
  };
  performance: { sleepHours?: number; energy?: 'low'|'medium'|'high'; pump?: 'poor'|'normal'|'good'; joint?: 'good'|'minor'|'pain' };
  nutrition: { omadAdherence?: string; postWorkoutCarbs?: boolean; hydrationL?: number; digestion?: 'good'|'ok'|'poor' };
  assessment: { strength: 'up'|'maintained'|'down'; waist: 'smaller'|'same'|'bigger'; weight: 'down'|'same'|'up'; interpretation?: string };
  notes?: string;
  decision?: string;
  createdAt: string;
}
```
