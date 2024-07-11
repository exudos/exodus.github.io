"use client"

import { products } from "@/lib/configuration";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBar({
    stats
}: {
    stats: {
        totalDonations: number
        lastDonations: any[]
        topDonator: {
            img: string
            name: string
            avatar: string,
            amount: number
        }
    }
}) {

    const pathName = usePathname()

    return (
        <div className="h-max container px-0 lg:w-max lg:mx-0 overflow-x-auto border max-w-screen-sm bg-foreground/5 lg:overflow-x-hidden lg:h-[calc(100vh-57px)] select-none min-w-[250px] my-3 lg:my-0 lg:rounded-none lg:rounded-tr-lg rounded-lg lg:border-r py-5">
            <div className="lg:space-y-4 px-5 lg:pb-10">
                <h2 className="text-lg font-medium hidden lg:block">Categorieën</h2>

                <ul className="lg:space-y-1 flex lg:block lg:gap-3 text-nowrap">
                    <li>
                        <Link href={`/doneren/algemeen`}>
                            <div className={cn("hover:bg-foreground/10 lg:w-full rounded px-3 py-1 border mr-5", pathName === "/doneren/algemeen" && "bg-foreground/10")}>Algemeen</div>
                        </Link>
                    </li>

                    {
                        products.map((value, index) => (
                            <li key={index} >
                                <Link href={`/doneren/${value.href}`}>
                                    <div className={cn("hover:bg-foreground/10 rounded px-3 py-1 border mr-5 lg:mr-0", pathName === `/doneren/${value.href}` && "bg-foreground/10")}>{value.label}</div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="space-y-2 hidden lg:block border-t w-full px-4 py-5">
                <h2 className="text-lg font-medium text-foreground/60">Dekking Serverkosten</h2>
                <div className="space-y-1 h-5 rounded bg-blue-700 border border-blue-600">
                    <div className="bg-blue-400 h-full" style={{
                        width: `${stats.totalDonations}%`
                    }}></div>
                </div>
            </div>
            {stats.topDonator.name && <div className="space-y-2 hidden lg:block border-t w-full px-4 py-5">
                <h2 className="text-lg font-medium text-foreground/60">Top Donateur</h2>
                <div className="flex gap-3 items-center p-1 rounded bg-foreground/5">
                    <Image src={stats.topDonator.avatar} alt="donation" width={50} height={50} className="rounded-xl"/>
                    <div>
                        <p className="font-semibold">{stats.topDonator.name}</p>
                        <p className="text-sm">€{(stats.topDonator.amount / 100).toFixed(2)}</p>
                    </div>
                </div>
            </div>}
            <div className="space-y-2 hidden lg:block border-t w-full px-4 py-5">
                <h2 className="text-lg font-medium text-foreground/60">Laatste Donaties</h2>
                {
                    stats.lastDonations.map((value, index) => (
                        <div key={index} className="flex gap-3 items-center p-1 rounded bg-foreground/5">
                            <Image src={value.customer.image} alt="donation" width={50} height={50} className="rounded-xl"/>
                            <div>
                                <p className="font-semibold">{value.customer.name}</p>
                                <p className="text-sm">€{(value.amount / 100).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}