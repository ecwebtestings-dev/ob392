import Header from "../components/navigation/Header";
import Footer from "../pages/Home/Foot";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}