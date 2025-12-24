import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="py-20">
            <div className="mx-auto max-w-[640px] text-center">
                <div className="mb-10 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Track your progress.
                    </h1>
                    <p className="subtle text-lg">
                        A minimal, high-performance weekly tracker for your
                        strength and body measurements.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Link
                        href="/tracker"
                        className="btn h-12 w-full px-8 text-base sm:w-auto"
                    >
                        Start Tracking
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <p className="subtle text-xs font-medium uppercase tracking-widest">
                        No sign-in required. Data stored locally.
                    </p>
                </div>
            </div>
        </div>
    );
}
