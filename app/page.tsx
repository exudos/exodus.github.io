import { AnimationComponent } from "@/components/animation";
import { PoppinsFont } from "@/components/fonts";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Briefcase, Car, ChevronRight, ShowerHeadIcon, Swords, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FeatureProps = {
  icon: JSX.Element;
  title: string;
  description: string
}

const features: FeatureProps[] = [
  {
    icon: <Car size={150}/>,
    title: "Autos",
    description: "Wij hebben een uitgebreid assortiment aan autos van serieuze bakken tot aan kleine autotjes waar je met je maten in kan kloten!"
  },
  {
    icon: <Swords size={100}/>,
    title: "Easy Weapons",
    description: "In Hero roleplay kom je gemakkelijk aan wapens doormiddel van ons geaveranceerde Wapen Systeem."
  },
  {
    icon: <Briefcase size={50} />,
    title: "Staff Team",
    description: "Ons staffteam voldoet aan alle eisen om een fijne roleplay ervaring te beleven."
  }
]

export default async function Home() {

  const playerStats = {
    current: (await (await fetch("http://185.228.82.57:30120/players.json", {
      next: {
        revalidate: 20
      }
    })).json()).length,
    max: (await (await fetch("http://185.228.82.57:30120/info.json")).json()).vars.sv_maxClients,
  }
  
  return (
    <>
      <main className="relative pb-20">
        <Image className="z-[-1] blur absolute object-cover h-[500px] left-[-50px] top-[-10px] w-[120vw] max-w-none lg:h-[800px]" width={1920} height={1080} alt="background" src={"/bg.jpg"}/>
        <section className="flex z-10 select-none justify-between px-5 sm:px-12 items-center gap-5 max-w-[1500px] mx-auto py-28 sm:py-36 lg:py-40 xl:py-48">
          <div className="max-w-4xl space-y-3 text-center lg:text-left">
            <h1 className={`text-5xl lg:text-7xl font-semibold ${PoppinsFont.className}`}><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">Hero</span> Roleplay</h1>
            <p className="opacity-75 text-lg">De server waar je met je maten een gezellige tijd kan hebben en serieuse roleplay kan neer zetten!</p>
            <div className="flex gap-5 justify-center lg:justify-start">
              <div className="flex gap-2 items-center py-2 px-4 bg-neutral-900 rounded-lg border border-neutral-700 font-semibold">
                <Users/><p>{playerStats.current}/{playerStats.max}</p>
              </div>
              <Link href="https://cfx.re/join/aejel5"><Button className="text-white flex gap-2">Meespelen <ChevronRight/></Button></Link>
            </div>
          </div>
          <AnimationComponent initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{
              type: "spring",
              damping: 10,
              stiffness: 100
            }}>
            <Image alt="logo" src={"/heropng.png"} className="hidden lg:block rounded-full h-auto w-[350px] xl:w-[400px]" width={500} height={500}/>
          </AnimationComponent>
        </section>
        <section className="container grid lg:grid-cols-3 gap-3 py-36">
          {features.map((value: FeatureProps, index: number) => (
            <div key={index} className="flex gap-10 items-center bg-foreground/[2%] py-2 min-h-24 px-5 rounded-2xl border shadow-xl shadow-foreground/[3%]">
              {value.icon}
              <div>
                <h4 className="text-2xl font-semibold">{value.title}</h4>
                <p className="text-sm">{value.description}</p>
              </div>  
            </div>
          ))}
        </section>
        <section className="container py-10 space-y-5">
          <h1 className="text-5xl text-white font-semibold">Over Ons</h1>
          <div className="py-5 px-3 bg-foreground/[2%] rounded border">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fugiat, inventore, maiores id earum aspernatur saepe quae blanditiis alias at qui ea laudantium nulla eveniet ab sapiente animi labore maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fugiat, inventore, maiores id earum aspernatur saepe quae blanditiis alias at qui ea laudantium nulla eveniet ab sapiente animi labore maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fugiat, inventore, maiores id earum aspernatur saepe quae blanditiis alias at qui ea laudantium nulla eveniet ab sapiente animi labore maxime.
          </div>
        </section>  
      </main>
      <Footer/>
    </>
  );
}
