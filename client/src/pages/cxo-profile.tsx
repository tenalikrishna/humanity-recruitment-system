import { API_BASE } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Users, GraduationCap, Building2, FileCheck, Calendar, Mail, ExternalLink, Share2, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function CXOProfilePage() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    designation: "",
    message: ""
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch(`${API_BASE}/api/contact-ceo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to send message");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Our CEO will respond within 24 hours.",
      });
      setContactDialogOpen(false);
      setFormData({ name: "", phone: "", company: "", designation: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  const openContactDialog = () => {
    setContactDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Elegant Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f2a3d] to-[#0a1f2e]" />
        
        {/* Subtle Radial Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3191c2]/10 rounded-full blur-3xl" />
        </div>
        
        {/* Minimal Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Content */}
        <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-white/50">
              Leadership & Institutional Profile | CSR Partnerships
            </span>
          </motion.div>
          
          {/* HUMANITY Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">
              <span className="text-white">HUM</span>
              <span className="text-[#3191c2]">ANITY</span>
            </h2>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-[1.3] mb-5 max-w-[750px] mx-auto"
          >
            Building future-ready children through AI, school education, and holistic care.
          </motion.h1>
          
          {/* Sub-headline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base text-white/60 leading-relaxed mb-6 max-w-[700px] mx-auto"
          >
            Founded in 2019, led by full-time, youth-driven professionals with strong training in social impact and institutional leadership, delivering deep, school-embedded AI and future-skills programs across India — built for scale through CSR partnerships.
          </motion.p>
          
          {/* Compliance Line - More Visible */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-sm text-white/70 bg-white/5 border border-white/10 rounded-full px-5 py-2">
              80G • 12A • CSR Form 1 • NGO Darpan Registered
            </span>
          </motion.div>
          
          {/* CTA Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-5"
          >
            <p className="text-sm text-[#3191c2] font-semibold tracking-wide uppercase mb-2">
              Meet the people behind the mission
            </p>
            <p className="text-sm text-white/50 max-w-[500px] mx-auto">
              A passionate, full-time team of young professionals driving education and AI programs with strong operational expertise.
            </p>
          </motion.div>
          
          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-[#3191c2] hover:bg-[#2a7fb0] text-white font-semibold px-6 py-5 text-sm rounded-lg transition-all duration-300"
              onClick={openContactDialog}
              data-testid="button-connect-ceo-hero"
            >
              <Mail className="w-4 h-4 mr-2" />
              Connect with our CEO
            </Button>
            
            <a href="https://humanityorg.foundation" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline"
                className="border border-white/20 hover:border-white/40 text-white hover:bg-white/5 font-semibold px-6 py-5 text-sm rounded-lg w-full sm:w-auto transition-all duration-300"
                data-testid="button-explore-website-hero"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Explore Our Website
              </Button>
            </a>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border border-white/20 hover:border-white/40 text-white hover:bg-white/5 font-semibold px-6 py-5 text-sm rounded-lg transition-all duration-300"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied! Share with your network.');
              }}
              data-testid="button-refer-work-hero"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Refer Our Work
            </Button>
          </motion.div>
        </div>
        
      </section>

      {/* Vision & Flagship Program - Combined Section */}
      <section className="py-20 md:py-28 bg-[#ffac00]">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-black leading-tight mb-4">
              A Scalable AI Education Model for India's Schools
            </h2>
            <p className="text-base text-black/60">
              Flagship Initiative | CSR-Ready
            </p>
          </div>
          
          {/* Impact Highlights */}
          <div className="flex justify-center items-center gap-8 md:gap-16 mb-14">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-black text-[#3191c2]">500</div>
              <div className="text-sm text-black/70 font-medium mt-1">Schools</div>
            </div>
            <div className="w-px h-12 bg-black/20" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-black text-[#3191c2]">1M</div>
              <div className="text-sm text-black/70 font-medium mt-1">Children</div>
            </div>
            <div className="w-px h-12 bg-black/20" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-black text-black">2030</div>
              <div className="text-sm text-black/70 font-medium mt-1">Pan-India</div>
            </div>
          </div>
          
          {/* Two Column Program Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* What Makes This Model Different */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#3191c2] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-black">
                  What Makes This Model Different
                </h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Full-time educator embedded for 4 months",
                  "Job-relevant AI & digital skills",
                  "Computer labs & internet access enabled in partner schools",
                  "Humanity's in-house Learning Management System (LMS) for live monitoring, student projects, reporting & outcomes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3191c2] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Scalability & Reach */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#3191c2] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-black">
                  Scalability & Reach
                </h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Pilot successfully completed",
                  "MOUs with 3 schools in Visakhapatnam",
                  "Replicable in any Indian city"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3191c2] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* CSR Call-out */}
          <div className="text-center">
            <p className="text-black/80 font-medium max-w-2xl mx-auto">
              CSR partners can launch this program in their priority cities or districts with structured reporting and clear outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Governance */}
      <section id="leadership" className="py-16 md:py-24 bg-white overflow-hidden">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[1100px] mx-auto px-6 text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
            Leadership & Governance
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A multidisciplinary leadership team combining grassroots experience, institutional strategy, operational excellence, and governance oversight.
          </p>
        </motion.div>
        
        {/* Leader 1: Abhishek Paluri - Photo Left */}
        <div className="max-w-[1100px] mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 md:p-10"
          >
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/abhishek.jpeg" 
                  alt="Abhishek Paluri"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Abhishek Paluri</h3>
              <p className="text-lg text-[#3191c2] font-semibold mb-2">Founder & CEO</p>
              <p className="text-slate-500 italic mb-4">Driving scalable education and child development across India</p>
              
              <p className="text-slate-700 mb-4">
                Abhishek is a development sector leader with strong experience in grassroots execution, institutional leadership, and program strategy.
              </p>
              
              <ul className="space-y-2">
                {[
                  "Postgraduate in Development Leadership & Management from Indian School of Development Management (ISDM)",
                  "Former Operations Consultant at Proximity Foundation",
                  "Former Operations Leader at Make A Difference (MAD)",
                  "Built HUManity from grassroots to multi-city operations",
                  "Led end-to-end program design, delivery, and partnerships",
                  "Strong background in fundraising, strategy, and stakeholder management"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3191c2] mt-1 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Leader 2: Krishna Vedantham - Photo Right */}
        <div className="max-w-[1100px] mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row-reverse gap-8 items-center bg-gradient-to-l from-slate-50 to-white rounded-2xl p-6 md:p-10"
          >
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/krishna.jpg" 
                  alt="Krishna Vedantham"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Krishna Vedantham</h3>
              <p className="text-lg text-[#3191c2] font-semibold mb-2">Director, Operations</p>
              <p className="text-slate-500 italic mb-4">Ensuring execution excellence through systems and technology</p>
              
              <p className="text-slate-700 mb-4">
                Krishna leads HUManity's on-ground execution, technology systems, and operational efficiency.
              </p>
              
              <ul className="space-y-2">
                {[
                  "6+ years of experience in software and operations",
                  "Leads structured program execution across locations",
                  "Builds tech-enabled workflows for scale",
                  "Strengthens accountability and efficiency",
                  "Bridges technology with real-world impact"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3191c2] mt-1 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Leader 3: Nivethika Sundararajan - Photo Left */}
        <div className="max-w-[1100px] mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 md:p-10"
          >
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/nivethika.jpeg" 
                  alt="Nivethika Sundararajan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-1">Nivethika Sundararajan</h3>
              <p className="text-lg text-[#3191c2] font-semibold mb-2">Board Member</p>
              <p className="text-slate-500 italic mb-4">Providing strategic governance and institutional oversight</p>
              
              <p className="text-slate-700 mb-4">
                Nivethika brings deep experience in large-scale program leadership, governance, and institutional systems.
              </p>
              
              <ul className="space-y-2">
                {[
                  "Former Head of Programs at Make A Difference (MAD)",
                  "Led operations across 23 cities, impacting 3500+ children annually",
                  "Built SOPs, reporting, and data systems",
                  "Managed $450,000+ annual program budgets",
                  "Expert in governance, strategy, and program design"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3191c2] mt-1 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Trust Line */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-slate-500 text-sm max-w-2xl mx-auto px-6 pt-6 border-t border-slate-200"
        >
          Humanity's leadership ensures every CSR partnership is backed by strong governance, proven execution, and long-term strategic vision.
        </motion.p>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-slate-900">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Partner with us to shape the future of education
          </h2>
          
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join us in our mission to build future-ready children across India. 
            We welcome CSR partnerships and institutional collaborations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-[#ffac00] hover:bg-[#e69b00] text-black font-semibold px-8 py-6 text-base"
              onClick={openContactDialog}
              data-testid="button-connect-ceo-footer"
            >
              <Mail className="w-5 h-5 mr-2" />
              Connect with our CEO
            </Button>
            
            <a href="https://humanityorg.foundation" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-base w-full sm:w-auto"
                data-testid="button-explore-website-footer"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Explore Our Website
              </Button>
            </a>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-base"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied! Share with your network.');
              }}
              data-testid="button-refer-work-footer"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Refer Our Work
            </Button>
          </div>
          
          <p className="text-sm text-slate-500 mt-8">
            80G • 12A • CSR Form 1 • NGO Darpan Registered
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-slate-950">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} HUManity Foundation. All rights reserved.
          </p>
        </div>
      </footer>

      {/* CEO Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">Connect with our CEO</DialogTitle>
            <DialogDescription>
              Share your details and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="input-ceo-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                data-testid="input-ceo-phone"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                placeholder="Your organization name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                data-testid="input-ceo-company"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="designation">Designation (Optional)</Label>
              <Input
                id="designation"
                placeholder="Your role/title"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                data-testid="input-ceo-designation"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                data-testid="input-ceo-message"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#3191c2] hover:bg-[#2580b0]"
              disabled={contactMutation.isPending}
              data-testid="button-submit-ceo-form"
            >
              {contactMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
            
            <p className="text-xs text-slate-500 text-center">
              Expect a response within 24 hours
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
