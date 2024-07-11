"use server"

import Stripe from "stripe"
import { stripe } from "../stripe"
import { filterProduct } from "../configuration"
import { auth } from "../auth"
import { getServerSession } from "next-auth"

type ReturnProps = {
    status: false,
    error: string
} | {
    status: true,
    url: string
}

export async function startTransaction(products: number[], discountCode: string): Promise<ReturnProps> {
    
    let checkoutSession
    const session = await getServerSession(auth);

    if (!session?.user) {
        return {
            status: false,
            error: "Je bent niet ingelogd"
        }
    }

    try {
        const filteredDiscount = discountCode && await stripe.coupons.retrieve(discountCode)
        let filteredProducts: Stripe.Checkout.SessionCreateParams.LineItem[] = []
        let discounts: Stripe.Checkout.SessionCreateParams.Discount[] = filteredDiscount ? [{
            coupon: filteredDiscount.id,
        }] : []

        products.forEach((p) => {
            const data = filterProduct("id", p)  

            if (data) {
                const {product} = data
                filteredProducts.push({
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: product.label,
                            description: product.description,
                            images: product.img.map((img) => `https://herorp.nl/donaties/${img}.png`)
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: 1,
                })
            }
        })
    
        checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "ideal",],
            line_items: filteredProducts,
            discounts: discounts,
            metadata: {
                products: JSON.stringify(products),
                discord: JSON.stringify(session?.user)
            },
            success_url: "https://herorp.nl/bedankt/{CHECKOUT_SESSION_ID}",	
            cancel_url: "https://herorp.nl/winkelmand",
            mode: "payment",
        })
    } catch (error) {
        console.log(error)
        return {
            status: false,
            error: "Kon transactie niet starten"
        }
    } finally {

        if (!checkoutSession) {
            return {
                status: false,
                error: "Kon transactie niet starten"
            }
        }

        return {
            status: true,
            url: checkoutSession.url as string
        }
    }

}