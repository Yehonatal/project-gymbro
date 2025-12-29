// Exercise type (including grip for forearms)
export type Exercise = {
    name: string
    sets: number
    reps: string | number
    loads_kg: number | number[] | string
    tempo: string
    rest: string
    type: "compound" | "isolation" | "neck" | "grip"
}

// Single workout day
export type WorkoutDay = {
    day: number
    title: string
    estimated_time_minutes: number
    exercises: Exercise[]
}

// Plan rules (optional)
export type PlanRules = {
    volume_reduction_percent?: number
    load_reduction_percent?: number
    rir?: string
    neck_volume?: string
    pr_attempts?: boolean
}

// Single workout plan
export type WorkoutPlan = {
    plan_name: string
    phase: string
    description: string
    rules?: PlanRules
    days: WorkoutDay[]
}

// Program metadata
export type ProgramMetadata = {
    athlete: string
    training_split: string
    goal: string[]
    constraints: string[]
}

// Full program (root of workoutsplan.json)
export type Program = {
    title: string
    metadata: ProgramMetadata
    plans: WorkoutPlan[]
}

// Strength metric
export type StrengthMetric = {
    top_set: string
    estimated_1rm_kg?: number
    notes?: string
}

// Body metrics for a week
export type BodyMetrics = {
    bodyweight_kg: number
    estimated_bodyfat_percent: number
    fat_mass_kg: number
    lean_mass_kg: number
    visceral_fat_rating?: string
    measurement_conditions?: {
        time_of_day: string
        hydration_state: string
        fed_state: string
    }
}

// Single weekly entry (simplified, matches new structure)
export type WeekEntry = {
    week_number: number
    date_range: string
    phase: string
    program_phase: string
    notes?: string
    body_metrics: BodyMetrics
    strength_metrics: Record<string, StrengthMetric>
    weekly_training_summary?: {
        sessions_planned: number
        sessions_completed: number
        average_session_duration_minutes?: number
        training_quality_rating_1_to_10?: number
    }
    nutrition_metrics?: {
        average_calories_estimate: number
        estimated_protein_g_per_day: number
        water_intake_liters?: number
        notes?: string
    }
}

// Athlete info
export type Athlete = {
    name: string
    age: number
    height_cm: number
    diet_style?: string
    protein_constraint?: string
    training_state?: string
}

// Root structure for weeklyEntries.json
export type WeeklyLog = {
    title: string
    version: string
    athlete: Athlete
    weekly_entries: WeekEntry[]
}
