export type ItemsGame = {
    type: "item" | "staff" | "coins" | "voertuig",
    value: string,
    count: number,
}

export type Product = {
    id: number,
    label: string,
    price: number,
    description: string,
    list: string[],
    img: string[],
    items: ItemsGame[]
}

export type Category = {
    label: string,
    href: string,
    products: Product[]
}

export function filterProduct(key: keyof Product, value: string | number): {
    product: Product,
    categorie: Category
} | false {
    for (const categorie of products) {
        for (const product of categorie.products) {
            if (product[key] === value) {
                return {
                    product,
                    categorie
                };
            }
        }
    }

    return false;
}

export function filterCategorie(key: keyof Category, value: string) {
    return products.find((categorie) => categorie[key] === value)
}

export const products: Category[] = [
    {
        label: "Voertuigen",
        href: "voertuigen",
        products: [
            {
                id: 1,
                label: "RS6",
                price: 5.00,
                description: "Mocht je dit pakket aanschaffen kunt u een ticket aanmaken in onze support discord om uw supporter pakket in ontvangst te nemen! Bij betaling krijgen wij een bericht met je DiscordID, zodat wij precies weten dat jij het pakket hebt aangeschaft! Hieronder ziet u wat u ontvangt bij aankoop van het supporter pakket. Bij vragen of opmerkingen kunt u ook altijd een ticket aanmaken, dan helpen wij u daar verder!",
                list: [
                    "Discord Rollen",
                    "Supporter Badge",
                ],
                img: ["supporter-pakket"],
                items: [
                    {
                        type: "voertuig",
                        value: "rmodrs6",
                        count: 1
                    }
                ]       
            },
        ]
    },
    {
        label: "Unban Paketten",
        href: "unban-pakketten",
        products: [
            {
                id: 8,
                label: "Discord unban",
                price: 10.00,
                description: "Je ban wordt verwijderd, dit pakket is bedoeld voor een discord unban. Dit duurt enorm kort, de bot verwijderd je verbanning.",
                list: [
                    "Unban uit een Wave discord naar keuze",
                ],
                img: ["discordunban"],
                items: []
            },
            {
                id: 9,
                label: "TX unban",
                price: 18.00,
                description: "Je ban wordt verwijderd, dit pakket is bedoeld voor een txAdmin unban. Na dit product gekocht te hebben dient u een ticket te openen in de support discord voor een unban.",
                list: [
                    "Unban uit Hero Roleplay",
                ],
                img: ["tx-admin"],
                items: []
            },
            {
                id: 10,
                label: "AntiCheat unban",
                price: 25.00,
                description: "Je AntiCheat ban wordt verwijderd. Na dit product gekocht te hebben dient u een ticket te openen in de support discord voor een unban.",
                list: [
                    "Unban uit Hero Roleplay",
                ],
                img: ["acunban"],
                items: []
            },
        ]
    },
]