"use client";
import React from "react";

export default function MeasurementField({
    label,
    name,
    value,
    onChange,
}: any) {
    return (
        <div className="space-y-1.5">
            <label className="label">{label}</label>
            <input
                className="input"
                name={name}
                value={value ?? ""}
                onChange={(e) => onChange(name, e.target.value)}
                type="number"
                step="0.1"
                inputMode="decimal"
            />
        </div>
    );
}
