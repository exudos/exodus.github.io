import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type JobProps = {
    label: string, 
    img: string,
    href: string
}   

const jobs: JobProps[] = [
    {
        img: "/sollicitaties/staff.png",
        label: "Staff",
        href: "https://forms.gle/kzr9UfYMPH9de5iw6"
    }
]

export default function Page() {
    return (
        <main className="container py-20 space-y-5">
            <div className="space-y-1">
                <h1 className="text-4xl font-semibold">Solliciteren</h1>
                <p className="opacity-75">Hieronder kunt u een staff sollicitatie maken voor Hero Roleplay. Als u hieronder op Staff klikt gaat u automatisch naar een Google Form. Zorg ervoor dat je de form naar waarheid invult. Veel succes en wellicht zien wij jou in ons staffteam!</p>
            </div>

            <div className="py-3 px-5 bg-foreground/5 rounded border space-y-5">
                <h3 className="text-xl font-medium">Vacatures - {jobs.length}</h3>
                <ul>
                    {jobs.map((value, index) => (
                        <Link key={index} href={value.href}>
                            <li className="flex hover:bg-foreground/10 justify-between gap-2 items-center py-2 px-4 bg-foreground/5 rounded border border-foreground/5 font-semibold">
                                <div className="flex gap-2 items-center">
                                    <Image width={100} height={100} src={value.img} alt={value.label} className="h-8 w-8"/>
                                    <p className="text-lg">{value.label}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </main>
    )
}