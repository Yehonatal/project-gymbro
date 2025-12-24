import React from "react";
import WeeklyTrackerForm from "../../components/weekly/WeeklyTrackerForm";

export const metadata = { title: "Tracker | GymBro" };

export default function Page() {
    return (
        <div className="mx-auto max-w-[760px]">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight">
                    Weekly Entry
                </h2>
                <p className="subtle mt-2">
                    Consistency is key. Track your trends and adjust your plan
                    accordingly.
                </p>
            </div>
            <WeeklyTrackerForm />
        </div>
    );
}
