import { AiWidget } from "../../AiWidget/WidgetLayout";
import WhatsApp from "../../components/ui/Whatsapp";
import AboutHero from "./AboutHero";
import AboutSection from "./AboutUs";
import JoinUsCTA from "./CallToJoin";
import CompanyStory from "./CompanyStory";
import LocationSection from "./GoogleMap";
import MsmeImpact from "./Impact";
import LeadershipQuote from "./Leadership";
import TeamPhoto from "./Team";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
        <Helmet>
                <title>OB39 About Us | Business Incubation & Agribusiness Export in Africa</title>
                <meta name="description" content="OB39 Ltd's services span business incubation, agribusiness and export support, and a digital marketplace across Africa." />
                <link rel="canonical" href="https://ob39ltd.com/about" />
        </Helmet>
      <AboutHero />
      <AboutSection/>
      <CompanyStory/>
      <WhatsApp/>
      <LeadershipQuote/>
      <MsmeImpact/>
      <TeamPhoto/>
      <JoinUsCTA/>
      <LocationSection/>
      <AiWidget/>
    </>
  )
}
