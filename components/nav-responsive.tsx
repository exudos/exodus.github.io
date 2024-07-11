"use client"

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function ResponsiveSheet({
    trigger, 
    children
}: {
    trigger: React.ReactNode,
    children: React.ReactNode
}) {
    return (
        <Sheet>
            <SheetTrigger>{trigger}</SheetTrigger>
            <SheetContent side={"left"}>
                <SheetTitle>Hero Roleplay</SheetTitle>
                {children}
            </SheetContent>
        </Sheet>
    )
}