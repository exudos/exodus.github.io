import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CartState = {
    items: any[]
    addItem: (item: any) => void
    removeItem: (item: any) => void
}

export const useCart = create(
    persist<CartState>(
        (set) => ({
            items: [],
            addItem: (item: any) => set((state: any) => {
                if (state.items.find((i: any) => i === item)){
                    return { items: state.items }
                }

                return { items: [...state.items, item] }
            }),
            removeItem: (item: any) => set((state: any) => ({ 
                items: state.items.filter((i: any) => i !== item) 
            })),
        }), {
            name: 'wave-cart', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)