"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export function ImgsRender({
    imgs,
    ...props
}: {
    imgs: string[]
} & React.HTMLProps<HTMLDivElement>) {

    const [index, setIndex] = useState<number>(0)

    return (
        <div {...props}>
            <Image width={500} height={500} src={`/donaties/${imgs[index]}.png`} alt={"Product Showcase"} className="w-full h-96 object-contain rounded-lg"/>
            <div className="flex w-full gap-2 p-2 rounded bg-foreground/5 border">
                {imgs.map((item, i) => (
                    <div className="cursor-pointer" key={i} onClick={() => setIndex(i)}>
                        <Image width={500} height={500} src={`/donaties/${item}.png`} alt={"Product Showcase"} className={cn("w-20 h-20 object-cover hover:bg-foreground/5 duration-300 rounded-lg", i === index && "bg-foreground/5")} key={index} onClick={() => setIndex(index)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}