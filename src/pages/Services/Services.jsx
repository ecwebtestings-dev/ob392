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
import { Helmet } from "react-helmet-async";

export default function Services() {
  return (
    <>
    <Helmet>
            <title>OB39 Services | Business Incubation & Agribusiness Export in Africa</title>
            <meta name="description" content="OB39 Ltd's services span business incubation, agribusiness and export support, and a digital marketplace across Africa." />
            <link rel="canonical" href="https://ob39ltd.com/services" />
      </Helmet>
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
