import { useState } from 'react';

const contactMethods = [
  {
    id: 1,
    title: 'Visit Our Office',
    description: 'Come say hello at our headquarters. We are always happy to host partners and investors.',
    details: ['Plot 42, Kampala Road', 'Kampala, Uganda'],
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Email Us',
    description: 'Our team typically responds within 24 hours on business days.',
    details: ['hello@0b39.africa', 'partnerships@0b39.africa'],
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Call Us',
    description: 'Speak directly with our support or business development team.',
    details: ['+256 700 123 456', '+256 772 987 654'],
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white py-24 sm:py-32 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">Get in Touch</h2>
          <p className="mt-4 text-lg/8 text-text-color">
            Whether you're a farmer, investor, or partner, we'd love to hear from you. 
            Reach out and let's build Africa's digital future together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Contact Method Cards with Stacked Hover Effect */}
          <div className="space-y-8">
            {contactMethods.map((method) => (
              <article key={method.id} className="group relative w-full">
                <div className="relative flex items-center justify-center rounded-[24px] transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4">
                  <div className="relative z-10 flex w-full flex-col items-start gap-5 overflow-hidden rounded-[22px] bg-button-bg p-8 text-white transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                    
                    {/* Stacked Layer 1 */}
                    <div className="absolute top-[-4%] left-1/2 z-[-1] h-[90%] w-[90%] -translate-x-1/2 rounded-[22px] bg-badge-bg origin-bottom transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rotate-[-8deg]" />
                    
                    {/* Stacked Layer 2 */}
                    <div className="absolute top-[-8%] left-1/2 z-[-2] h-[80%] w-[80%] -translate-x-1/2 rounded-[22px] bg-card-background origin-bottom transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rotate-[8deg]" />

                    <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      {method.icon}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">{method.title}</h3>
                      <p className="mt-2 text-sm/6 text-white/80">{method.description}</p>
                      <div className="mt-4 space-y-1">
                        {method.details.map((detail, i) => (
                          <p key={i} className="text-sm font-medium text-white/90">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right: Contact Form */}
          <form onSubmit={handleSubmit} className="rounded-3xl bg-gray-50 p-8 sm:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-semibold text-heading mb-6">Send us a message</h3>
            
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-heading mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-heading placeholder:text-text-color focus:border-badges focus:ring-2 focus:ring-badges/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-heading mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-heading placeholder:text-text-color focus:border-badges focus:ring-2 focus:ring-badges/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-heading mb-1.5">Subject</label>
                <select
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-heading focus:border-badges focus:ring-2 focus:ring-badges/20 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="investment">Investment Opportunity</option>
                  <option value="support">Technical Support</option>
                  <option value="general">General Question</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-heading mb-1.5">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-heading placeholder:text-text-color focus:border-badges focus:ring-2 focus:ring-badges/20 outline-none transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-button-bg px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-button-hover hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}