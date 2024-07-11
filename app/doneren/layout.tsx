import { SideBar } from "@/components/sidebar";
import { fetchDonatieStats } from "@/lib/donatie-stats";

export default async function Layout({
    children
}: {children: React.ReactNode}) {

    const donatieStats = await fetchDonatieStats()

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <SideBar stats={donatieStats}/>
            {children}
        </div>
    )
}