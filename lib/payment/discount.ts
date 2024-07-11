"use server"

import Stripe from "stripe"
import { stripe } from "../stripe"

type ReturnProps = {
    status: false,
    error: string
} | {
    status: true,
    coupon: Stripe.Coupon
}

export async function claimCoupon(couponId: string): Promise<ReturnProps> {
    let coupon 

    try {
        coupon = await stripe.coupons.retrieve(couponId)
    } catch (error) {
        return {
            status: false, 
            error: "Kon kortingscode niet opvragen"
        }
    } finally {
        if (!coupon) {
            return {
                status: false, 
                error: "Kon kortingscode niet vinden"
            }
        }
        
        return {
            status: true, 
            coupon
        } 
    }
}   