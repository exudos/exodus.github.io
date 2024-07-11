import { AnimationComponent } from "@/components/animation"
import { Product } from "@/components/product"
import { Category, filterCategorie, products } from "@/lib/configuration"

export default function Page({
    params: {
        category
    }
}: {
    params: {
        category: string
    }
}) {

    const data: Category | undefined = category === "algemeen" ? {
        label: "Algemeen",
        href: "algemeen",
        products: []
    } : filterCategorie("href", category) 

    if (!data) {
        return (
            <main className="p-10">
                <h1 className="text-3xl font-semibold">Not Found</h1>
            </main>
        )
    }

    if (data.href === "algemeen") {
        products.forEach((categorie) => {
            data.products.push(...categorie.products)
        })
    }

    return (
        <main className="p-10 space-y-5 max-w-7xl mx-auto w-full select-none">
            <h1 className="text-3xl font-semibold text-left w-full">{data?.label} - <span className="text-blue-500">{data.products.length}</span></h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto max-h-[calc(100vh-200px)]">
                {data.products.map((product, index) => (
                    <AnimationComponent key={index} initial={{y: 100, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{
                        type: "spring",
                        damping: 50,
                        stiffness: 1000,
                        delay: (index % 4) * 0.2
                    }}>
                        <Product {...product}/>
                    </AnimationComponent>
                ))}
            </div>
        </main>
    )
}