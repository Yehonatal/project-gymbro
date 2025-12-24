"use client";
import React from "react";

export default function LiftField({ label, name, lift = {}, onChange }: any) {
    return (
        <div className="space-y-1.5">
            <label className="label">{label}</label>
            <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                    <input
                        className="input pr-8"
                        name={`${name}-weight`}
                        value={lift.weightKg ?? ""}
                        onChange={(e) =>
                            onChange(name, "weightKg", e.target.value)
                        }
                        type="number"
                        placeholder="0.0"
                        inputMode="decimal"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-[var(--muted-foreground)]">
                        kg
                    </span>
                </div>
                <div className="relative">
                    <input
                        className="input pr-10"
                        name={`${name}-reps`}
                        value={lift.reps ?? ""}
                        onChange={(e) => onChange(name, "reps", e.target.value)}
                        type="number"
                        placeholder="0"
                        inputMode="numeric"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-[var(--muted-foreground)]">
                        reps
                    </span>
                </div>
            </div>
        </div>
    );
}
