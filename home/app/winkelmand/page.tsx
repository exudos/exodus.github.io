"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart"
import { filterProduct } from "@/lib/configuration"
import { claimCoupon } from "@/lib/payment/discount"
import { startTransaction } from "@/lib/payment/transaction"
import Image from "next/image"
import { useState, useTransition } from "react"

export default function Page() {

    const { items, removeItem } = useCart()
    const [ discount, setDiscount ] = useState<number>(0)
    const [ coupons, setCoupons ] = useState<string[]>([])
    const [ pending, startTransition ] = useTransition()
    const [ error, setError ] = useState<string | false>(false)
    const [ input, setInput ] = useState<string>("")

    if (items.length === 0) return (
        <main className="container py-20 space-y-5">
            <h1 className="text-4xl font-semibold">Winkelmand</h1>
            <h2 className="opacity-75 text-xl font-medium">De winkelmand is leeg</h2>
        </main>
    )

    const handleDiscount = (e: React.KeyboardEvent<HTMLInputElement> | true) => {
        
        if (e !== true && e.key !== "Enter") {
           return 
        }

        if (coupons.includes(input)) {
            return setError("Kortingscode is al toegepast")
        }

        const value = input
        startTransition(async () => {
            const response = await claimCoupon(value)
            
            if (!response.status) {
                setError(response.error)
                setTimeout(() => {
                    setError(false)
                }, 3000)
                return
            }

            if (response.coupon?.percent_off) {
                setDiscount(response.coupon.percent_off)
                setInput("")
                setCoupons(coupons => [...coupons, value])
            } 
        })
    }

    const total = items.reduce((acc, cur) => {
        const data = filterProduct("id", cur)
        if (!data) return acc
        return acc + data.product.price
    }, 0) 

    const discountTotal = total - (total * (discount / 100))
    const handleTransaction = () => {
        startTransition(async () => {
            const response = await startTransaction(items, coupons[0])
            if (!response.status) {
                setError(response.error)
                setTimeout(() => {
                    setError(false)
                }, 3000)
                return
            }

            window.location.href = response.url
        })
    }

     

    return (
        <main className="container py-20 space-y-5">  
            <h1 className="text-4xl font-semibold">Winkelmand</h1>
            <div className="flex flex-col lg:flex-row gap-3 justify-between">
                <div className="flex flex-col gap-3 w-full max-w-4xl">
                    {items.map((item, index) => {

                        const data = filterProduct("id", item)

                        if (!data) return <div>Product not found</div>

                        const { product } = data

                        return (
                            <div key={index} className="flex duration-300 items-center gap-10 py-3 justify-between px-5 bg-foreground/5 border rounded-lg">
                                <div className="flex gap-2 items-center">
                                    <Image width={100} height={100} src={`/donaties/${product.img[0]}.png`} alt={product.label} className="w-16 h-16" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{product.label}</h2>
                                        <p className="text-gray-500">€{product.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item)} className="rounded bg-red-500 border border-red-400 font-medium px-4 p-1 text-white">Verwijder</button>
                            </div>
                        )    
                    })}
                </div>
                <div className="flex flex-col gap-3 w-full lg:max-w-[300px] p-5 rounded-lg bg-foreground/5 border">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold">Korting</h2>
                            <p className="opacity-75">{discount}%</p>
                        </div>
                        {
                            coupons.length > 0 && (
                                <div className="flex bg-foreground/5 rounded-lg border w-full p-1 gap-2 ">
                                    {coupons.map((coupon, index) => (
                                        <p className="px-2 p-[2px]" key={index}>{coupon}</p>
                                    ))}
                                </div>
                            )
                        }
                
                        <Input value={input} onChange={(e) => setInput(e.currentTarget.value)} id="discount-input" disabled={pending} onKeyDown={handleDiscount} placeholder="Kortingscode" />
                        <Button disabled={pending} onClick={() => handleDiscount(true)} className="w-full h-7 border border-blue-400 rounded text-white">{pending ? "Laden..." : "Toepassen"}</Button>
                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                    </div>
                    <div className="divide-y">
                        <div className="flex justify-between py-2">
                            <h2 className="text-lg font-medium">Bedrag</h2>
                            <h2 className="text-lg">€{total.toFixed(2)}</h2>
                        </div>
                        <div className="flex justify-between py-2">
                            <h2 className="text-lg font-medium">Subtotaal</h2>
                            <h2 className="text-lg">€{discountTotal.toFixed(2)}</h2>
                        </div>
                    </div>
                    <button onClick={handleTransaction} className="rounded bg-blue-500 border border-blue-400 font-medium px-4 p-1 text-white">Afrekenen</button>
                </div>
            </div>
        </main>
    )
}