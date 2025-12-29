"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggle from "./ThemeToggle"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
    { href: "/", label: "Dashboard" },
    { href: "/tracker", label: "Tracker" },
    { href: "/plans", label: "Plans" },
    { href: "/analytics", label: "Analytics" },
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container-responsive h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        GYMBRO
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                                pathname === link.href
                                    ? "bg-foreground text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="ml-2 pl-2 border-l flex items-center gap-1">
                        <Link
                            href="https://github.com/Yehonatal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="flex md:hidden items-center gap-1">
                    <Link
                        href="https://github.com/Yehonatal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
