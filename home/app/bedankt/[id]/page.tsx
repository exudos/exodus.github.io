import { Product, filterProduct } from "@/lib/configuration"
import { stripe } from "@/lib/stripe"
import Image from "next/image"

export default async function Page({
    params: {
        id
    }
}: {
    params: {
        id: string
    }
}) {
    
    let data
    
    try {
        data = await stripe.checkout.sessions.retrieve(id)
    } catch (error) {}
    
    if (!data || !data.metadata) {
        return (
            <div className="container py-32">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-4xl font-medium">Oeps!</h1>
                    <p className="opacity-75">Deze donatie kon niet worden gevonden. Controleer of je de juiste URL hebt ingevoerd.</p>
                </div>
            </div>
        )  
    }

    const filteredProducts: Product[] = []
    const products = JSON.parse(data.metadata.products)

    products.map((value: number) => {

        const data = filterProduct("id", value)

        if (data) {
            const {product} = data

            if (product) {
                filteredProducts.push(product)
            }
        }
    })

    return (
        <div className="container py-32 space-y-5">
            <div className="space-y-2 text-center md:text-left">
                <h1 className="text-4xl font-medium">Bedankt voor je donatie!</h1>
                <p className="opacity-75">Je donatie is gelukt! Bedankt voor je steun.</p>
                <p className="opacity-75 max-w-[100%] overflow-x-auto text-xs px-5 py-1 bg-foreground/5 rounded-xl border w-max">{id}</p>
            </div>

            <div className="flex flex-col gap-2">
                {filteredProducts.map((product: any, index: number) => (
                    <div key={index} className="flex px-5 select-none justify-between py-3 items-center rounded-lg bg-foreground/5 border">
                        <div className="flex items-center space-x-4">
                            <Image width={100} height={100} alt={product.label} src={`/donaties/${product.img[0]}.png`} className="w-16 h-16 rounded-lg" />
                            <div>
                                <h2 className="text-xl font-medium">{product.label}</h2>
                                <p className="opacity-75">{product.description}</p>
                            </div>
                        </div>
                        <p className="text-xl opacity-75">€{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}