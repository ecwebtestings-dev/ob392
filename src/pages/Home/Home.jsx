import AboutOverview from "./SectionContentLayout";
import WhatsApp from "../../components/ui/Whatsapp";
import ProblemsWeSolve from "./AboutReview";
import CallToAction from "./CallToAction";
import Hero from "./Hero";
import ImpactNumbers from "./ImpactNumbers";
import ScalingImpact from "./ScalingImpact";
import Testimonials from "./Testimonials";
import InvestmentOpportunity from "./WhyUs";
import PositioningSection from "./Position";
import { AiWidget } from "../../AiWidget/WidgetLayout";
import { Helmet } from "react-helmet-async";


export default function Home() {
  return (
    <>
    <Helmet>
        <title>OB39 Services | Business Incubation & Agribusiness Export in Africa</title>
        <meta name="description" content="OB39 Ltd's services span business incubation, agribusiness and export support, and a digital marketplace across Africa." />
        <link rel="canonical" href="https://ob39ltd.com/" />
      </Helmet>
    <div>
      <Hero/>
      <AboutOverview/>
      <PositioningSection/>
      <ProblemsWeSolve/>
      <ImpactNumbers/>
      <ScalingImpact/>
      <CallToAction/>
      <InvestmentOpportunity/>
      <Testimonials/>
      <WhatsApp/>
      <AiWidget/>
      
  
    </div>
    </>
    
  )
}
