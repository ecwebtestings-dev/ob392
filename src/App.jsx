import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";
import Signup from "./components/RegistrationForm/Signup";
import LogIn from './components/RegistrationForm/Login';

import DashboardLayout from "./Dashboard/DashBoardLayout";
import Notification from "./Dashboard/Notifications/Notifications";
import EventManagement from "./Dashboard/Events/useEventManagement";
import Inquiries from "./Dashboard/Inquires/InQuiries";
import { UsersTable } from "./Dashboard/UserManagement/userManagement";



function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(17, 17, 17, 0.9)",       
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.875rem",
            padding: "14px 18px",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",   
            backdropFilter: "blur(12px)",               
          },
          success: {
            style: {
              border: "1px solid rgba(89,185,71,0.35)",
              boxShadow: "0 8px 30px rgba(89,185,71,0.15)",
            },
            iconTheme: {
              primary: "#59B947",
              secondary: "#111111",
            },
          },
          error: {
            style: {
              border: "1px solid rgba(239,68,68,0.35)",
              boxShadow: "0 8px 30px rgba(239,68,68,0.15)",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#111111",
            },
          },
        }}
      />


    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/contact" element={<Contact/>}/>
           
        </Route>

        <Route>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Route>
        
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<Inquiries />} />
          <Route path="inquiries" element={<Inquiries/>} />
          <Route path="users" element={<UsersTable/>} />
          <Route path="notifictaions" element={<Notification/>}/>
          <Route path="events" element={<EventManagement/>} />
        </Route>
      </Routes>
     
    </BrowserRouter>
    </>
  );
}

export default App;