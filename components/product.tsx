import { Product } from "@/lib/configuration";
import Image from "next/image";
import Link from "next/link";

export function Product({
    label,
    img,
    id,
    description,
    price
}: Product) {
    return (
        <Link href={`/product/${id}`}>
            <div className="p-3 rounded border bg-foreground/5 space-y-2 hover:bg-foreground/10 cursor-pointer">
                <Image src={`/donaties/${img[0]}.png`} className="h-44 object-contain mx-auto" width={300} height={300} alt={label}/>
                <div>
                    <h4 className="font-semibold">{label}</h4>
                    <p className="text-xs opacity-75">{description}</p>
                </div>
                <p>€{price}</p>
            </div>
        </Link>
    )
}