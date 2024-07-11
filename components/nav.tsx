"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import DiscordIcon from "@/components/icons/discord-icon"
import { ResponsiveSheet } from "./nav-responsive";
import { useTransition } from "react";
import {signIn, signOut, useSession} from "next-auth/react"
import Image from "next/image";
import { useCart } from "@/lib/cart";


const routes = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Doneren",
        href: "/doneren"
    },
    {
        label: "Solliciteren",
        href: "/solliciteren"
    }
]

export function NavComponent() {

    const pathName = usePathname()
    const session = useSession()
    const { items } = useCart()

    return (
        <header className="sticky top-0 select-none z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="hidden md:flex">
                    <nav className="flex items-center gap-2 text-sm">
                        {routes.map((value, index) => (
                            <Link key={index} href={value.href} className={cn("transition-colors hover:text-foreground/80 text-foreground/60 hover:bg-foreground/10 px-4 py-2 rounded", (value.href === "/" ? value.href === pathName : pathName.includes(value.href)) && "bg-foreground/10 text-foreground/80")}>{value.label}</Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center md:hidden">
                    <ResponsiveSheet trigger={<Button className="text-foreground/60 hover:bg-transparent" variant={"ghost"} size={"icon"}><Menu /></Button>}>
                        <nav className="flex flex-col gap-2 text-sm pt-10">
                            {routes.map((value, index) => (
                                <Link key={index} href={value.href} className={cn("transition-colors hover:text-foreground/80 text-foreground/60 hover:bg-foreground/10 px-4 py-2 rounded", (value.href === "/" ? value.href === pathName : pathName.includes(value.href)) && "bg-foreground/10 text-foreground/80")}>{value.label}</Link>
                            ))}
                        </nav>
                    </ResponsiveSheet>
                </div>

                <div className="flex">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="https://discord.gg/herorp"><Button size={"icon"} variant="ghost"><DiscordIcon/></Button></Link>
                        
                        {
                            (session?.data?.user?.image) ? <div onClick={() => signOut()}>
                                <Image src={session.data.user.image} width={40} height={40} alt="user" className="rounded-xl cursor-pointer"/>
                            </div> : <Button onClick={() => signIn("discord")} size={"icon"} variant="outline"><User/></Button>
                        }
                        
                        <Link href="/winkelmand"><Button className="relative" size={"icon"} variant="outline"><ShoppingCart/>
                        {items.length > 0 && <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{items.length}</div>}
                        </Button></Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}