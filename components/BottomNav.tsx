"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, History, BookOpen, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/tracker", label: "Tracker", icon: History },
    { href: "/plans", label: "Plans", icon: BookOpen },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
]

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-lg pb-safe">
            <div className="grid h-full grid-cols-4 mx-auto font-medium">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "inline-flex flex-col items-center justify-center px-5 group transition-all",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5 mb-1 transition-transform",
                                    isActive ? "scale-110" : "group-hover:scale-110"
                                )}
                            />
                            <span className="text-[10px] uppercase tracking-wider font-bold">
                                {link.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
