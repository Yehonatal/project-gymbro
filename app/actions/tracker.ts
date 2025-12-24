"use server";

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { WeeklyEntry } from "../../lib/types/tracker";

const DB_PATH = path.join(process.cwd(), "db", "weeklyEntries.json");

export async function getEntries(): Promise<WeeklyEntry[]> {
    try {
        const raw = await fs.readFile(DB_PATH, "utf-8");
        return JSON.parse(raw || "[]");
    } catch {
        return [];
    }
}

export async function saveEntry(
    entry: Omit<WeeklyEntry, "id" | "createdAt">
): Promise<WeeklyEntry> {
    const data = await getEntries();
    const newEntry: WeeklyEntry = {
        ...entry,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    };
    data.unshift(newEntry);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return newEntry;
}
