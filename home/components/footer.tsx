import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-foreground/[2%] border-t py-10">
            <div className="container flex flex-col sm:flex-row gap-5 justify-between items-center">
                <p className="opacity-75">&copy; 2024 Hero Roleplay</p>
                <div className="flex gap-5">
                    <Link href="https://discord.gg/herorp" className="text-white opacity-75 hover:opacity-100">Discord</Link>
                    <Link href="https://cfx.re/join/e5zqmm" className="text-white opacity-75 hover:opacity-100">Joinen</Link>

                </div>
            </div>
        </footer>
    )
}