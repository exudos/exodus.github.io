import { ItemsGame, filterProduct } from "@/lib/configuration";
import { initializeDonatieStats } from "@/lib/donatie-stats";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const request = await req.json()
    const metadata = request?.data?.object?.metadata
   
    setTimeout(async () => {
        await initializeDonatieStats()
    }, 3000)

    const items: ItemsGame[] = []

    JSON.parse(metadata.products).forEach((id: number) => {
        const data = filterProduct("id", id)

        if (data) {

            const { product } = data

            product.items.forEach((item) => {
                items.push(item)
            })
        }
    })

    console.log(items)


    const response = await (await fetch("http://185.228.82.57:30120/hero-websitehandler", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier: JSON.parse(metadata.discord).identifier,
            products: items
        })
    })).json()

    console.log(response)

    return NextResponse.json(true)
}
