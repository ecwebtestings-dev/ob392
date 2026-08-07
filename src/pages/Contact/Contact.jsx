import { AiWidget } from "../../AiWidget/WidgetLayout";
import WhatsApp from "../../components/ui/Whatsapp";
import ContactHero from "./ContactHero";
import ContactSection from "./MainContact";
import { Helmet } from "react-helmet-async";

export default function MainContact() {
  return (
    <>
    <Helmet>
        <title>OB39 Contact Us | Business Incubation & Agribusiness Export in Africa</title>
        <meta name="description" content="OB39 Ltd's services span business incubation, agribusiness and export support, and a digital marketplace across Africa." />
        <link rel="canonical" href="https://ob39ltd.com/contact" />
      </Helmet>

      <ContactHero/>
      <ContactSection/>
      <WhatsApp/>
      <AiWidget/>
    </>
  )
}