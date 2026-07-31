import { useState, useRef, useEffect } from "react";
import {MapPinIcon,PhoneIcon,EnvelopeIcon,ChevronDownIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const countryCodes = [
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+211", country: "South Sudan", flag: "🇸🇸" },
  { code: "+243", country: "DR Congo", flag: "🇨🇩" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
];



const BASE_URL = import.meta.env.VITE_API_URL;


export default function ContactSection() {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



//CONTROLLED FORM STATE
const [formData,setFormData]=useState({
  fullName:"",
  email:'',
  phone:'',
  organisation:'',
  subject:'',
  message:'',
})

const [submitting,setSubmitting]=useState(false);

//INPUT CHANGE HANDLER
function handleChange(e){
  const {name,value}=e.target;

  if(name === 'message'){
    const words = value.trim().split(/\s+/).filter(Boolean);
    if(words.length>15){
      return;
    }
  }
  setFormData((prev)=>({...prev,[name]:value}));


}

//HANDLE SUBMIT FUNCTION
async function handleSubmit(e) {
  e.preventDefault();
    if(!formData.fullName || !formData.email || !formData.message){
      toast.error('Please fill in your name,email and message')
      return;
    }

    setSubmitting(true)
    try{
      const res = await fetch(`${BASE_URL}/inquiry/create`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          full_name:formData.fullName,
          email:formData.email,
          phone:formData.phone ? `${selectedCode.code}${formData.phone}`:"",
          organisation:formData.organisation,
          subject: formData.subject,
          message:formData.message,
        })
      })

      if(!res.ok){
        const errorBody = await res.json().catch(()=>null);
        console.log("ERROR DETAILS",errorBody);
        throw new Error(errorBody.message||'Failed to submit your message');
      }
      //SUCESS MESSAGE
      toast.success("Message sent! We'll get back to you soon");

      //RESET FORM AFTER SUCCESSFULL SUBMITION
      setFormData({
        fullName:"",
        email:"",
        phone:"",
        organisation:"",
        subject:"",
        message:"",
      });
      setSelectedCode(countryCodes[0]);
    }
    catch(err){
      toast.error(err.message || "Sorry something went wrong. Please try again");
    }finally{
      setSubmitting(false);
    }
}











  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-12">

          {/*  Contact Info */}
          <div className="lg:col-span-2">
            

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Let's start a{" "}
              <span className="text-badges">conversation</span>
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600">
              Whether you're a SACCO, cooperative, or growing business, our
              team is ready to help you.
            </p>

            <div className="mt-10 space-y-5">
              {/* Headquarters */}
              <div className="flex items-start gap-4 rounded-2xl  bg-gray-50 p-5 transition-colors duration-300 hover:border-badges/30">
                <span className="flex size-11 flex-none items-center justify-center rounded-xl border border-gray-200 bg-white">
                  <MapPinIcon className="size-5 text-badges" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-badges">
                    Headquarters
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Plot 238 Kalule Road,
                    <br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Phone numbers */}
              <div className="flex items-start gap-4 rounded-2xl  bg-gray-50 p-5 transition-colors duration-300 hover:border-badges/30">
                <span className="flex size-11 flex-none items-center justify-center rounded-xl border border-gray-200 bg-white">
                  <PhoneIcon className="size-5 text-badges" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-badges">
                    Phone
                  </p>
                  
                  <a  href="tel:+256772840840"
                    className="mt-1 block text-sm text-gray-600 transition-colors hover:text-badges"
                  >
                    +256 772840840
                  </a>
                  
                   <a href="tel:+256783380569"
                    className="mt-0.5 block text-sm text-gray-600 transition-colors hover:text-badges"
                  >
                    +256 783380569
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5 transition-colors duration-300 hover:border-badges/30">
                <span className="flex size-11 flex-none items-center justify-center rounded-xl border border-gray-200 bg-white">
                  <EnvelopeIcon className="size-5 text-badges" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-badges">
                    Email
                  </p>
                  
                  <a  href="mailto:info@ob39.co.ug"
                    className="mt-1 block text-sm text-gray-600 transition-colors hover:text-badges"
                  >
                    ob39@gmail.com
                  </a>
                  
                   <a href="mailto:support@ob39.co.ug"
                    className="mt-0.5 block text-sm text-gray-600 transition-colors hover:text-badges"
                  >
                    ob39@gmail.co.ug
                  </a>
                </div>
              </div>
            </div>
          </div>



          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-8 shadow-xl shadow-gray-200/60 sm:p-10">
              
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                
                <div className="grid gap-5 sm:grid-cols-2">
                  {/**FULLNAME */}
                  <Field 
                    label="Full name" 
                    type="text" 
                    placeholder=""
                    name="fullName" 
                    onChange={handleChange}
                    value={formData.fullName}
        
                    />

                    {/**EMAIL ADDRESS */}
                  <Field
                    label="Email Address" 
                    type="email" 
                    placeholder=""
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                   
                   />
                </div>

                  {/* Phone with country code dropdown */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative" ref={dropdownRef}>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                      Phone Number
                    </label>
                    <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors focus-within:border-badges/50">

                      <button
                        type="button"
                        onClick={() => setDropdownOpen((o) => !o)}
                        className="flex flex-none items-center gap-1.5 border-r border-gray-200 px-3 py-3 text-sm text-gray-800 transition-colors hover:bg-gray-50"
                      >
                        <span>{selectedCode.flag}</span>
                        <span className="font-medium">{selectedCode.code}</span>
                        <ChevronDownIcon
                          className={`size-3.5 text-gray-400 transition-transform duration-200 ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <input
                        type="tel"
                        placeholder="701 234 567"
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                        className="w-full min-w-0 bg-transparent px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
                      />
                    </div>

                    {dropdownOpen && (
                      <div className="absolute left-0 top-full z-30 mt-2 max-h-64 w-56 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-2xl shadow-gray-300/50">
                        {countryCodes.map((c) => (
                          <button
                            key={c.country}
                            type="button"
                            onClick={() => {
                              setSelectedCode(c);
                              setDropdownOpen(false);
                            }}
                            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-badges/10 hover:text-badges"
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1">{c.country}</span>
                            <span className="text-gray-400">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Field
                    label="Organization / Company Name"
                    type="text"
                    placeholder="Your organization"
                    value={formData.organisation}
                    onChange={handleChange}
                    name='organisation'

                  />
                </div>

                <Field 
                  label="Subject" 
                  type="text" 
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  name='subject'
                  
                  />

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    
                    placeholder="Tell us more about your enquiry..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-colors focus:border-badges/50 focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                     {formData.message.trim().split(/\s+/).filter(Boolean).length}/20 words
                  </p>
                </div>

                <button
                  disabled={submitting}
                  type="submit"
                  className="w-full rounded-lg bg-button-bg py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-button-hover hover:shadow-lg hover:shadow-badges/25 hover:-translate-y-0.5 sm:w-auto sm:px-10"
                >
                  {submitting ? 'Sending...':"Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


//FORM INPUT FIELD ACCEPTS 
function Field({ label,name,value,onChange, type, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-colors focus:border-badges/50 focus:outline-none"
      />
    </div>
  );
}