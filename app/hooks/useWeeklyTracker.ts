import { useState, useEffect } from "react";
import { WeeklyEntry } from "../../lib/types/tracker";

export function useWeeklyTracker() {
    const [entries, setEntries] = useState<WeeklyEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/tracker");
            if (!res.ok) throw new Error("Failed to fetch entries");
            const data = await res.json();
            setEntries(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    const submitEntry = async (
        entry: Omit<WeeklyEntry, "id" | "createdAt">
    ) => {
        try {
            setLoading(true);
            const res = await fetch("/api/tracker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry),
            });
            if (!res.ok) throw new Error("Failed to submit entry");
            await fetchEntries(); // Refresh entries
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return {
        entries,
        loading,
        error,
        fetchEntries,
        submitEntry,
    };
}
