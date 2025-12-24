export type Energy = "low" | "medium" | "high";
export type Pump = "poor" | "normal" | "good";
export type JointHealth = "good" | "minor" | "pain";
export type Digestion = "good" | "ok" | "poor";
export type StrengthAssessment = "up" | "maintained" | "down";

export interface Lift {
    weightKg: number;
    reps: number;
}

export interface WeeklyEntry {
    id: string;
    weekNumber?: number;
    weekStart?: string; // ISO date
    measurements?: {
        bodyweightKg?: number;
        waistCm?: number;
        upperArmCm?: number;
        upperThighCm?: number;
    };
    lifts?: Partial<Record<string, Lift>>;
    performance?: {
        sleepHours?: number;
        energy?: Energy;
        pump?: Pump;
        joint?: JointHealth;
    };
    nutrition?: {
        omadAdherence?: string;
        postWorkoutCarbs?: boolean;
        hydrationL?: number;
        digestion?: Digestion;
    };
    assessment?: {
        strength?: StrengthAssessment;
        waist?: "smaller" | "same" | "bigger";
        weight?: "down" | "same" | "up";
        interpretation?: string;
    };
    notes?: string;
    decision?: string;
    createdAt: string;
}
