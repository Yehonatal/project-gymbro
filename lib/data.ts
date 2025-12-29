import fs from "fs/promises"
import path from "path"
import type { Program, WorkoutPlan, WeeklyLog, WeekEntry } from "./types"

const DATA_DIR = path.join(process.cwd(), "data")
const PLANS_FILE = path.join(DATA_DIR, "workoutsplan.json")
const ENTRIES_FILE = path.join(DATA_DIR, "weeklyEntries.json")

// Generic JSON read/write
const readJSON = async <T>(file: string): Promise<T | null> => {
    try {
        const raw = await fs.readFile(file, "utf-8")
        return JSON.parse(raw)
    } catch {
        return null
    }
}

const writeJSON = async <T>(file: string, data: T): Promise<void> => {
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8")
}

// Program (workoutsplan.json)
export const getProgram = () => readJSON<Program>(PLANS_FILE)

export const saveProgram = (program: Program) => writeJSON(PLANS_FILE, program)

export const addPlan = async (plan: WorkoutPlan): Promise<void> => {
    const program = await getProgram()
    if (!program) return
    program.plans.push(plan)
    await saveProgram(program)
}

export const updatePlan = async (index: number, plan: WorkoutPlan): Promise<void> => {
    const program = await getProgram()
    if (!program || index < 0 || index >= program.plans.length) return
    program.plans[index] = plan
    await saveProgram(program)
}

export const deletePlan = async (index: number): Promise<void> => {
    const program = await getProgram()
    if (!program || index < 0 || index >= program.plans.length) return
    program.plans.splice(index, 1)
    await saveProgram(program)
}

// Weekly log (weeklyEntries.json)
export const getWeeklyLog = () => readJSON<WeeklyLog>(ENTRIES_FILE)

export const getEntries = async (): Promise<WeekEntry[]> => {
    const log = await getWeeklyLog()
    return log?.weekly_entries ?? []
}

export const addEntry = async (entry: WeekEntry): Promise<void> => {
    const log = await getWeeklyLog()
    if (!log) return
    log.weekly_entries.push(entry)
    await writeJSON(ENTRIES_FILE, log)
}
