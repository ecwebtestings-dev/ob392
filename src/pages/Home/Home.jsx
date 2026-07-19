import AboutOverview from "./SectionContentLayout";
import WhatsApp from "../../components/ui/Whatsapp";
import ProblemsWeSolve from "./AboutReview";
import CallToAction from "./CallToAction";
import Hero from "./Hero";
import ImpactNumbers from "./ImpactNumbers";
import ScalingImpact from "./ScalingImpact";
import Testimonials from "./Testimonials";
import InvestmentOpportunity from "./WhyUs";


export default function Home() {
  return (
    <div>
      <Hero/>
      <AboutOverview/>
      <ProblemsWeSolve/>
      <ImpactNumbers/>
      <ScalingImpact/>
      <CallToAction/>
      <InvestmentOpportunity/>
      <Testimonials/>
      <WhatsApp/>
    </div>
  )
}
