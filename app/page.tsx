// import Image from "next/image";
import Hero from "@/components/website/Hero";
import OurMission from "@/components/website/OurMission";
import OurPastors from "@/components/website/ourpastors/Ourpastors";
import ServiceTime from "@/components/website/ServiceTime/ServiceTime"
import Pillars from "@/components/website/Pillars";
import Books from "@/components/website/Books";
import Done from "@/components/website/Done";
import NewHere from "@/components/website/NewHere";
import Class from "@/components/website/Class";
import ServiceMarquee from "@/components/website/ServiceMarquee";
import Download from "@/components/website/Download";


export default function Home() {
  return (
    <div className="my-20 flex flex-col gap-16">
      <Hero />
      <OurMission />
     <ServiceMarquee />
      <ServiceTime />
      <Pillars />
      <Books />
      <Download/>
      < OurPastors />
      <Done />
      <NewHere />
<Class/>
    </div>
  );
}
