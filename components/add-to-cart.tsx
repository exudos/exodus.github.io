"use client"

import { useCart } from "@/lib/cart"
import { Button } from "./ui/button"

export function AddToCart({id}: {id: number}) {
    const { addItem, items } = useCart()
    const isInCart = items.find((i: any) => i === id)

    if (isInCart) return <Button disabled className="w-full select-none text-white bg-red-500 border border-red-400 hover:bg-red-400">Al in de winkelmand</Button>

    return <Button onClick={() => addItem(id)} className="w-full text-white">Toevoegen aan winkelmand</Button>
}