import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import MainContact from "./pages/Contact/MainContact";
import Signup from "./components/RegistrationForm/Signup";
import LogIn from './components/RegistrationForm/Login';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/contact" element={<MainContact/>}/>
        </Route>

        <Route>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Route>
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;