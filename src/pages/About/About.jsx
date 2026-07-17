import WhatsApp from "../../components/ui/Whatsapp";
import AboutHero from "./AboutHero";
import AboutSection from "./AboutUs";
import JoinUsCTA from "./CallToJoin";
import CompanyStory from "./CompanyStory";
import LocationSection from "./GoogleMap";
import LeadershipQuote from "./Leadership";
import TeamPhoto from "./Team";

export default function About() {
  return (
    <div>

      <AboutHero />
      <AboutSection/>
      <CompanyStory/>
      <WhatsApp/>
      <LeadershipQuote/>
      <TeamPhoto/>
      <JoinUsCTA/>
      <LocationSection/>
    </div>
  )
}
