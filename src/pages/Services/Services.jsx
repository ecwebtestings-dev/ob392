import { AiWidget } from "../../AiWidget/WidgetLayout";
import WhatsApp from "../../components/ui/Whatsapp";
import AgribusinessExport from "./AgriBusinessExport";
import BusinessIncubation from "./BusinessIncubation";
import CallToAction from "./Calltoaction";
import HeroBanner from "./HeroBanner";
import HowItWorks from "./HowItWorks";
import ImpactBenefits from "./ImpactBenefits";
import ServicesOverview from "./ServicesOverview";
import WhoWeServe from "./Whoweserve";

export default function Services() {
  return (
    <>
     <HeroBanner/> 
     <ServicesOverview/>
     <BusinessIncubation/>
      <CallToAction/>
     <AgribusinessExport/>
      <WhoWeServe/>
     <HowItWorks/>
     <AiWidget/>
     <ImpactBenefits/>
     <WhatsApp/>
   
    </>
  )
}
