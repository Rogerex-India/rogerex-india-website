import React, { useState } from 'react';
import { Send, Mail, MapPin, Globe, Share2, Users, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('All fields are required!');
      return;
    }

    setIsLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
<main>
{/*  Hero Section  */}
<section className="relative pt-section-padding-sm pb-16 overflow-hidden">

<div className="relative z-10 max-w-container-max mx-auto px-8 text-center">
<span className="font-label-caps text-label-caps text-primary mb-4 block">GET IN TOUCH</span>
<h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-6">Let's Build Something <span className="text-primary">Great</span> Together</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Have an idea? We're ready to transform it into a reliable technology solution. Reach out today.</p>
</div>
</section>
{/*  Split Contact Section  */}
<section className="pb-section-padding-lg px-8">
<div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter">
{/*  Contact Form Side  */}
<div className="bg-surface-container-lowest rounded-[20px] p-8 md:p-10 ambient-shadow border border-outline-variant/10">
<h2 className="font-headline-md text-headline-md text-on-surface mb-8">Send us a Message</h2>
<form className="space-y-6" onSubmit={handleSubmit}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex flex-col gap-2">
<label className="font-label-caps text-label-caps text-on-surface-variant">FULL NAME</label>
<input name="name" value={formData.name} onChange={handleChange} className="h-[56px] px-6 rounded-xl bg-background-bone border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md placeholder:text-text-muted" placeholder="John Doe" type="text"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-caps text-label-caps text-on-surface-variant">EMAIL ADDRESS</label>
<input name="email" value={formData.email} onChange={handleChange} className="h-[56px] px-6 rounded-xl bg-background-bone border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md placeholder:text-text-muted" placeholder="john@example.com" type="email"/>
</div>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-caps text-label-caps text-on-surface-variant">PHONE NUMBER</label>
<input name="phone" value={formData.phone} onChange={handleChange} className="h-[56px] px-6 rounded-xl bg-background-bone border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md placeholder:text-text-muted" placeholder="+91 98765 43210" type="tel"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-caps text-label-caps text-on-surface-variant">SUBJECT</label>
<input name="subject" value={formData.subject} onChange={handleChange} className="h-[56px] px-6 rounded-xl bg-background-bone border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md placeholder:text-text-muted" placeholder="Inquiry about custom development" type="text"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-caps text-label-caps text-on-surface-variant">YOUR MESSAGE</label>
<textarea name="message" value={formData.message} onChange={handleChange} className="p-6 rounded-xl bg-background-bone border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-body-md placeholder:text-text-muted resize-none" placeholder="Tell us about your project or inquiry..." rows="5"></textarea>
</div>
<button
  className="w-full bg-primary text-on-primary py-4 rounded-xl font-body-lg font-bold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
  type="submit"
  disabled={isLoading}
>
  {isLoading ? 'Sending...' : 'Send Message'}
  {!isLoading && <Send className="w-6 h-6 text-current" />}
</button>
</form>
</div>
{/*  Details & Map Side  */}
<div className="flex flex-col gap-gutter">
{/*  Info Card  */}
<div className="bg-surface-container-low rounded-[20px] p-8 md:p-10 border border-outline-variant/10">
<h2 className="font-headline-md text-headline-md text-on-surface mb-8">Contact Information</h2>
<div className="space-y-8">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center shrink-0">
<Mail className="w-6 h-6 text-current" />
</div>
<div>
<p className="font-label-caps text-label-caps text-secondary mb-1">EMAIL US</p>
<a className="font-body-lg text-body-lg text-on-surface hover:text-primary transition-colors" href="mailto:rogerexindia@gmail.com">rogerexindia@gmail.com</a>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center shrink-0">
<MapPin className="w-6 h-6 text-current" />
</div>
<div>
<p className="font-label-caps text-label-caps text-secondary mb-1">OUR LOCATION</p>
<p className="font-body-lg text-body-lg text-on-surface">Bengaluru, Karnataka, India</p>
</div>
</div>
<div className="pt-4 border-t border-outline-variant/20">
<p className="font-label-caps text-label-caps text-on-surface-variant mb-4">FOLLOW US</p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
<Globe className="w-6 h-6 text-current" />
</a>
<a className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
<Share2 className="w-6 h-6 text-current" />
</a>
<a className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all duration-300" href="#">
<Users className="w-6 h-6 text-current" />
</a>
</div>
</div>
</div>
</div>
{/*  Map Placeholder  */}
<div className="flex-grow rounded-[20px] overflow-hidden min-h-[300px] relative ambient-shadow border border-outline-variant/10">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.6309395!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
  className="absolute inset-0 w-full h-full border-0"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Rogerex India - Bengaluru Location"
></iframe>
<div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl flex items-center justify-between">
<div>
<h4 className="font-headline-md text-[18px] text-on-surface">Headquarters</h4>
<p className="font-body-md text-sm text-on-surface-variant">Bengaluru, India</p>
</div>
<a className="text-action-link font-label-caps hover:underline" data-location="Bengaluru, India" href="#">GET DIRECTIONS</a>
</div>
</div>
</div>
</div>
</section>
{/*  FAQ Section  */}
<section className="bg-surface-container py-section-padding-lg px-8">
<div className="max-w-3xl mx-auto">
<div className="text-center mb-16">
<span className="font-label-caps text-label-caps text-primary mb-4 block">COMMON QUESTIONS</span>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Frequently Asked Questions</h2>
</div>
<div className="space-y-4">
{/*  FAQ Item 1  */}
<div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10">
<input className="faq-trigger hidden" id="faq-1" type="checkbox"/>
<label className="faq-header flex justify-between items-center cursor-pointer group" htmlFor="faq-1">
<span className="font-body-lg text-body-lg text-on-surface font-semibold group-hover:text-primary transition-colors">What services does Rogerex India specialize in?</span>
<ChevronDown className="w-6 h-6 text-current" />
</label>
<div className="faq-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
<p className="text-on-surface-variant font-body-md">We specialize in custom software development, web and mobile applications, UI/UX design, cloud solutions, and AI-powered automation. We focus on transforming ideas into reliable, scalable technology solutions for businesses of all sizes.</p>
</div>
</div>
{/*  FAQ Item 2  */}
<div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10">
<input className="faq-trigger hidden" id="faq-2" type="checkbox"/>
<label className="faq-header flex justify-between items-center cursor-pointer group" htmlFor="faq-2">
<span className="font-body-lg text-body-lg text-on-surface font-semibold group-hover:text-primary transition-colors">How long does it typically take to start a project?</span>
<ChevronDown className="w-6 h-6 text-current" />
</label>
<div className="faq-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
<p className="text-on-surface-variant font-body-md">Once we've discussed your requirements and finalized the project scope, we can typically begin development within 1-2 weeks. Our streamlined onboarding process ensures we hit the ground running with a clear roadmap.</p>
</div>
</div>
{/*  FAQ Item 3  */}
<div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10">
<input className="faq-trigger hidden" id="faq-3" type="checkbox"/>
<label className="faq-header flex justify-between items-center cursor-pointer group" htmlFor="faq-3">
<span className="font-body-lg text-body-lg text-on-surface font-semibold group-hover:text-primary transition-colors">Do you offer post-launch maintenance and support?</span>
<ChevronDown className="w-6 h-6 text-current" />
</label>
<div className="faq-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
<p className="text-on-surface-variant font-body-md">Yes, we provide comprehensive Maintenance &amp; Support services to ensure your digital products continue to perform at their best. This includes security updates, performance optimization, and scaling as your business grows.</p>
</div>
</div>
{/*  FAQ Item 4  */}
<div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10">
<input className="faq-trigger hidden" id="faq-4" type="checkbox"/>
<label className="faq-header flex justify-between items-center cursor-pointer group" htmlFor="faq-4">
<span className="font-body-lg text-body-lg text-on-surface font-semibold group-hover:text-primary transition-colors">How does Rogerex handle project communication?</span>
<ChevronDown className="w-6 h-6 text-current" />
</label>
<div className="faq-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
<p className="text-on-surface-variant font-body-md">Transparency is one of our core values. We use collaborative tools and provide regular progress reports, scheduled check-ins, and direct access to your dedicated project team to ensure you're always in the loop.</p>
</div>
</div>
</div>
</div>
</section>
</main>
    </>
  );
};

export default Contact;
