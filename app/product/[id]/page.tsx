import { AddToCart } from "@/components/add-to-cart"
import { ImgsRender } from "@/components/imgs-render"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import { filterProduct } from "@/lib/configuration"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function Page({
    params: {
        id
    }
}: {
    params: {
        id: string
    }
}) {

    const data = filterProduct("id", Number(id))

    if (!data) return <main className="container py-40">
        <h1 className="text-5xl font-semibold opacity-90 text-center">Could not found Product</h1>
    </main>

    const { product, categorie } = data

    return (
        <main className="container py-20 space-y-3 select-none">
            <Link href={`/doneren/${categorie.href}`} className="opacity-75 text-sm flex gap-2 items-center hover:bg-foreground/5 duration-300 w-max rounded-lg px-3 py-1"><ChevronLeft/> {categorie.label}</Link>
            <h3 className="flex gap-4 items-center"><span className="px-3 py-1 rounded bg-foreground/5 border rouinded">{product.label}</span></h3>
            <div className="flex flex-col lg:flex-row gap-3 justify-between">
                <ImgsRender imgs={product.img} className="max-w-3xl w-full rounded space-y-4"/>
                <div className="w-full relative lg:max-w-96 h-max group space-y-5 bg-foreground/5 border rounded-lg flex-col flex items-center p-3">
                    <div className="space-y-3">
                        <h2 className="text-center text-2xl font-semibold">{product.label}</h2>
                        <p className="text-center opacity-90">{product.description}</p>
                    </div>
                    <div className="flex gap-1 flex-wrap bg-foreground/5 border rounded-lg p-2">
                        {
                            product.list.map((item, index) => (
                                <div key={index} className="px-3 py-1 text-sm bg-foreground/5 border rounded-lg">{item}</div>
                            ))
                        }
                    </div>
                    <AddToCart id={product.id}/>
                    <p className="w-[60px] group-hover:rotate-[366deg] duration-500 h-[60px] text-center leading-[60px] rounded-full bg-blue-500 border border-blue-400 rotate-6 font-medium absolute top-[-30px] right-[-30px]">€{product.price.toFixed(2)}</p>
                </div>
            </div>
        </main>
    )
}