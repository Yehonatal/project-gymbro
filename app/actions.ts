"use server"

import {
    addPlan as addPlanData,
    deletePlan as deletePlanData,
    updatePlan as updatePlanData,
    addEntry as addEntryData
} from "@/lib/data"
import { revalidatePath } from "next/cache"
import type { WorkoutPlan, WeekEntry } from "@/lib/types"

// Plan actions
export const addPlan = async (plan: WorkoutPlan) => {
    await addPlanData(plan)
    revalidatePath("/plans")
}

export const deletePlan = async (index: number) => {
    await deletePlanData(index)
    revalidatePath("/plans")
}

export const updatePlan = async (index: number, plan: WorkoutPlan) => {
    await updatePlanData(index, plan)
    revalidatePath("/plans")
}

// Entry actions
export const addEntry = async (entry: WeekEntry) => {
    await addEntryData(entry)
    revalidatePath("/tracker")
    revalidatePath("/analytics")
    revalidatePath("/")
}
