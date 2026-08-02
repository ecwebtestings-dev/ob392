import { AiWidget } from "../../AiWidget/WidgetLayout";
import WhatsApp from "../../components/ui/Whatsapp";
import ContactHero from "./ContactHero";
import ContactSection from "./MainContact";

export default function MainContact() {
  return (
    <div>
      <ContactHero/>
      <ContactSection/>
      <WhatsApp/>
      <AiWidget/>
    </div>
  )
}