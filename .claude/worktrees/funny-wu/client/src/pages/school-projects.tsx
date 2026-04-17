import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Monitor, BookOpen, Users, BrainCircuit, Rocket, 
  Sparkles, ChevronDown, ShieldCheck, MapPin, 
  TrendingUp, Activity, Plus, ArrowRight, Zap, Target, CheckCircle, X
} from "lucide-react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Images
import heroBg from "@assets/generated_images/futuristic_abstract_ai_brain_connecting_india,_digital_nodes,_glowing_cyan_and_gold.png";
import visionBg from "@assets/generated_images/modern_sleek_classroom_concept_with_holographic_learning_interfaces.png";
import jeninImage from "@assets/stock_images/male_teacher_explain_1fe1c0ba.jpg";
import handsOnImage from "@assets/stock_images/close_up_of_hands_ty_b5bfff0b.jpg";
import successImage from "@assets/stock_images/group_of_happy_india_7b634a2e.jpg";
import indiaMapImage from "@assets/licensed-image_1767190065056.jpeg";

// Carousel Images
import carousel1 from "@assets/WhatsApp_Image_2025-12-13_at_7.11.45_PM_(1)_1766890677703.jpeg";
import carousel2 from "@assets/WhatsApp_Image_2025-12-11_at_10.37.41_AM_1766890677703.jpeg";
import carousel3 from "@assets/WhatsApp_Image_2025-12-11_at_11.02.37_AM_(1)_1766890677703.jpeg";
import carousel4 from "@assets/WhatsApp_Image_2025-12-11_at_11.02.40_AM_1766890677703.jpeg";
import carousel5 from "@assets/WhatsApp_Image_2025-12-11_at_11.02.41_AM_1766890677703.jpeg";

const carouselImages = [carousel1, carousel2, carousel3, carousel4, carousel5];

export default function SchoolProjectsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [partnershipType, setPartnershipType] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    numberOfSchools: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-open partner dialog if query param is present
  const searchString = useSearch();
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    if (params.get('partner') === 'true') {
      setIsPartnerDialogOpen(true);
      // Clean up the URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchString]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectInterest) {
      toast({ title: "Please select a project", variant: "destructive" });
      return;
    }
    if (!partnershipType) {
      toast({ title: "Please select a partnership type", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/partnership-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, partnershipType, projectInterest })
      });
      
      if (response.ok) {
        toast({ title: "Thank you!", description: "We'll get back to you soon." });
        setIsPartnerDialogOpen(false);
        setFormData({ name: "", email: "", phone: "", company: "", city: "", numberOfSchools: "", message: "" });
        setPartnershipType("");
        setProjectInterest("");
      } else {
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     <Layout>
        {/* Hero Section - Visionary & Cinematic */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src={heroBg} 
              alt="AI Connecting India" 
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-white/90 z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-10" />
          </div>

          <div className="container mx-auto px-4 relative z-20 pt-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                 <h1 className="text-4xl md:text-6xl lg:text-9xl font-heading font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter drop-shadow-sm">
                    Building India's <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3191c2] to-[#2580b0]">
                       AI Workforce
                    </span>
                 </h1>

                 <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto mb-8 font-medium leading-relaxed">
                    A scalable, school-integrated AI skilling model designed for rapid deployment across India.
                 </p>

                 <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#ffac00] text-white text-base font-black uppercase tracking-[0.15em] shadow-lg transform hover:scale-105 transition-transform">
                       <Sparkles className="w-5 h-5" />
                       <span>Mission 2030 – 500 Schools | 1 Million Children</span>
                    </div>
                 </div>

                 <div className="flex justify-center items-center">
                    <Button 
                      size="lg" 
                      onClick={() => setIsPartnerDialogOpen(true)}
                      className="h-16 px-10 rounded-full bg-[#3191c2] text-white hover:bg-[#2580b0] font-black text-xl shadow-[0_4px_14px_0_rgba(49,145,194,0.39)] hover:scale-105 transition-all"
                      data-testid="button-partner-popup"
                    >
                      Click here to partner with us!
                    </Button>
                 </div>
              </motion.div>
          </div>

          <motion.div 
             className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 z-20"
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
          >
              <ChevronDown className="w-10 h-10" />
          </motion.div>
        </section>
        {/* The Vision Statement - Dark Mode */}
        <section className="py-32 bg-[#0a2a3d] relative overflow-hidden">
           {/* Background Elements */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3191c2]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

           <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 leading-tight">
                       Why This Program <br/>
                       <span className="inline-block px-3 py-1 rounded-lg bg-[#ffac00] text-black shadow-[0_0_30px_rgba(255,172,0,0.6)]">
                          Matters
                       </span>
                    </h2>
                    <div className="space-y-8">
                       <div className="flex gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                             <TrendingUp className="w-8 h-8 text-[#3191c2]" />
                          </div>
                          <div>
                             <h3 className="text-2xl font-bold text-white mb-2">The Skills Gap Starts Early</h3>
                             <p className="text-lg text-blue-100/70 leading-relaxed">
                                AI investments grow, but school readiness lags behind.
                             </p>
                          </div>
                       </div>
                       <div className="flex gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                             <Target className="w-8 h-8 text-[#ffac00]" />
                          </div>
                          <div>
                             <h3 className="text-2xl font-bold text-white mb-2">Schools Lack Execution Capacity</h3>
                             <p className="text-lg text-blue-100/70 leading-relaxed">
                                Curriculum, educators, and delivery models are missing.
                             </p>
                          </div>
                       </div>
                       <div className="flex gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                             <CheckCircle className="w-8 h-8 text-green-400" />
                          </div>
                          <div>
                             <h3 className="text-2xl font-bold text-white mb-2">A Replicable Solution Exists</h3>
                             <p className="text-lg text-blue-100/70 leading-relaxed">
                                Proven pilot, ready to launch across geographies.
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3191c2] to-[#0a2a3d] rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a2a3d] shadow-2xl">
                       <AnimatePresence mode="wait">
                          <motion.img 
                             key={currentImageIndex}
                             src={carouselImages[currentImageIndex]} 
                             alt="Vision" 
                             initial={{ opacity: 0, scale: 1.1 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0 }}
                             transition={{ duration: 1 }}
                             className="absolute inset-0 w-full h-full object-cover"
                          />
                       </AnimatePresence>
                       
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a3d] via-transparent to-transparent opacity-90" />
                       
                       <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                          <p className="text-white text-xl md:text-5xl font-black italic leading-tight drop-shadow-[0_0_25px_rgba(49,145,194,0.6)]">
                             "We are not just teaching computers. <br className="hidden md:block" />
                             We are teaching <span className="text-[#ffac00] drop-shadow-[0_0_15px_rgba(255,172,0,0.8)]">confidence.</span>"
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
        {/* Live Impact Dashboard - Glassmorphism */}
        <section id="impact" className="py-20 bg-[#ffac00] relative">
           <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                 <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900">
                    Proven on-ground. <span className="text-[#0a2a3d]">Ready to scale.</span>
                 </h2>
              </div>
              <div className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3191c2] via-[#0a2a3d] to-[#3191c2]" />
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y-0 md:divide-x divide-slate-200">
                    <div className="p-2 md:p-4">
                       <div className="text-[#3191c2] font-bold tracking-widest text-xs md:text-sm uppercase mb-2">Live Cohort</div>
                       <div className="text-4xl md:text-7xl font-black text-[#0a2a3d] mb-2">150</div>
                       <div className="text-slate-500 text-xs md:text-sm">Students Enrolled</div>
                    </div>
                    <div className="p-2 md:p-4">
                       <div className="text-slate-700 font-bold tracking-widest text-xs md:text-sm uppercase mb-2">Program</div>
                       <div className="text-4xl md:text-7xl font-black text-[#0a2a3d] mb-2">6-10</div>
                       <div className="text-slate-500 text-xs md:text-sm">Grade Level Focus</div>
                    </div>
                    <div className="p-2 md:p-4">
                       <div className="text-[#e69b00] font-bold tracking-widest text-xs md:text-sm uppercase mb-2">Engagement</div>
                       <div className="text-4xl md:text-7xl font-black text-[#0a2a3d] mb-2">100%</div>
                       <div className="text-slate-500 text-xs md:text-sm">Hands-On Learning</div>
                    </div>
                    <div className="p-2 md:p-4">
                       <div className="text-green-600 font-bold tracking-widest text-xs md:text-sm uppercase mb-2">Status</div>
                       <div className="text-4xl md:text-7xl font-black text-[#0a2a3d] mb-2">Active</div>
                       <div className="text-slate-500 text-xs md:text-sm">Madhurwada, Vizag</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
        {/* The Solution / Curriculum - Card Journey */}
        <section className="py-32 bg-white relative">
           <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-6">
                    From Zero to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3191c2] to-[#1a5c80]">AI-Ready</span>
                 </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                 {/* Left Side: The "How" - Dark Power Card */}
                 <div className="bg-[#0a2a3d] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col h-full border border-white/10 shadow-2xl group hover:shadow-[#3191c2]/20 transition-all duration-500">
                    {/* Ambient Light */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#3191c2]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    
                    <div className="relative z-10">
                       <h3 className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4">
                          <span className="bg-[#3191c2] p-3 rounded-2xl shadow-lg shadow-[#3191c2]/30">
                             <Sparkles className="w-6 h-6 text-white" />
                          </span>
                          Capabilities We Build
                       </h3>

                       <div className="space-y-8">
                          {[
                             { text: "4 Month Certification Program", sub: "Intensive bootcamp style learning" },
                             { text: "Dedicated Full-Time AI Teacher", sub: "Expert guidance in every classroom" },
                             { text: "Everyday Theory & Practical Classes", sub: "Balanced curriculum for deep understanding" },
                             { text: "Project-Based Learning by Building", sub: "Real-world application from day one" }
                          ].map((item, idx) => (
                             <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="flex gap-6 group/item"
                             >
                                <div className="w-12 h-12 rounded-full border-2 border-[#3191c2] flex items-center justify-center shrink-0 font-bold text-[#3191c2] group-hover/item:bg-[#3191c2] group-hover/item:text-white transition-all shadow-[0_0_15px_rgba(49,145,194,0.3)] bg-[#0a2a3d] z-10">
                                   {idx + 1}
                                </div>
                                <div>
                                   <h4 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover/item:text-[#3191c2] transition-colors">{item.text}</h4>
                                   <p className="text-blue-200/60 font-medium">{item.sub}</p>
                                </div>
                             </motion.div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Right Side: The "What" - Light Power Card */}
                 <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 relative overflow-hidden flex flex-col h-full border border-slate-200 shadow-xl group hover:shadow-2xl transition-all duration-500">
                    {/* Ambient Light */}
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffac00]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                       <h3 className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4">
                          <span className="bg-[#ffac00] p-3 rounded-2xl shadow-lg shadow-[#ffac00]/30 text-white">
                             <BookOpen className="w-6 h-6" />
                          </span>
                          Delivery Model
                       </h3>

                       <div className="space-y-8">
                          {[
                             {
                                title: "Digital Literacy & Basic Computing",
                                desc: "Building confidence in using computers and essential digital skills.",
                                icon: Monitor,
                                color: "text-[#3191c2]",
                                bg: "bg-[#3191c2]/10"
                             },
                             {
                                title: "Introduction to AI Concepts",
                                desc: "Understanding what AI is and where it is encountered in daily life.",
                                icon: BrainCircuit,
                                color: "text-[#ffac00]",
                                bg: "bg-[#ffac00]/10"
                             },
                             {
                                title: "AI for Productivity",
                                desc: "Using AI applications to enhance learning and personal productivity.",
                                icon: TrendingUp,
                                color: "text-[#3191c2]",
                                bg: "bg-[#3191c2]/10"
                             },
                             {
                                title: "AI for Education",
                                desc: "Applying AI tools to schoolwork, projects, and independent learning.",
                                icon: BookOpen,
                                color: "text-slate-800",
                                bg: "bg-slate-100"
                             }
                          ].map((module, idx) => (
                             <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="flex gap-6 group/item p-4 -mx-4 rounded-2xl hover:bg-slate-50 transition-colors"
                             >
                                <div className={`w-14 h-14 rounded-2xl ${module.bg} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform`}>
                                   <module.icon className={`w-7 h-7 ${module.color}`} />
                                </div>
                                <div>
                                   <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{module.title}</h4>
                                   <p className="text-slate-500 font-medium">{module.desc}</p>
                                </div>
                             </motion.div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
        {/* Launch AI Education Section */}
        <section className="py-24 bg-[#0a2a3d] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3191c2]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffac00]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
           
           <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                 <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                       Launch AI Education in <span className="text-[#ffac00]">Your Geography</span>
                    </h2>
                    <p className="text-xl text-blue-100/70 mb-8">
                       A ready-to-deploy school AI program, executed end-to-end by HUManity. Proven model, scalable to any region across India.
                    </p>
                    
                    <Button 
                       size="lg" 
                       onClick={() => setIsPartnerDialogOpen(true)}
                       className="h-16 px-10 rounded-full bg-[#ffac00] text-black hover:bg-[#e69b00] font-black text-xl shadow-2xl hover:scale-105 transition-all"
                       data-testid="button-start-ai-program"
                    >
                       Start an AI Program
                    </Button>
                 </div>
                 
                 <div className="space-y-6">
                    <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5 }}
                       viewport={{ once: true }}
                       className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-5"
                    >
                       <div className="w-14 h-14 rounded-xl bg-[#3191c2]/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-7 h-7 text-[#3191c2]" />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-1">You Choose the Location</h4>
                          <p className="text-blue-100/60">Select any city or school cluster in India</p>
                       </div>
                    </motion.div>
                    
                    <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: 0.1 }}
                       viewport={{ once: true }}
                       className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-5"
                    >
                       <div className="w-14 h-14 rounded-xl bg-[#ffac00]/20 flex items-center justify-center shrink-0">
                          <Users className="w-7 h-7 text-[#ffac00]" />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-1">We Deploy Trained Educators</h4>
                          <p className="text-blue-100/60">Expert AI teachers placed directly in schools</p>
                       </div>
                    </motion.div>
                    
                    <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: 0.2 }}
                       viewport={{ once: true }}
                       className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-5"
                    >
                       <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                          <Rocket className="w-7 h-7 text-green-400" />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold text-white mb-1">Program Goes Live in 30 Days</h4>
                          <p className="text-blue-100/60">Rapid deployment with full curriculum support</p>
                       </div>
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>
        {/* The Ask / Partnership */}
        <section className="py-32 relative flex items-center justify-center overflow-hidden bg-white">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.1)_0%,_transparent_60%)]" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.1)_0%,_transparent_60%)]" />
           
           <div className="container mx-auto px-4 relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-8 leading-tight">
                 Be the Catalyst for <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3191c2] to-[#2580b0]">India's AI Future.</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                 We have the model, the team, and the momentum. Now we need visionary partners to help us scale from 1 school to 100.
              </p>
              
              <Button 
                 size="lg" 
                 onClick={() => setIsPartnerDialogOpen(true)}
                 className="h-20 px-12 rounded-full bg-[#3191c2] text-white hover:bg-[#2580b0] font-black text-2xl shadow-2xl hover:scale-105 transition-all"
                 data-testid="button-partner-cta"
              >
                 Partner With Us
              </Button>
           </div>
        </section>

        {/* Partnership Inquiry Dialog */}
        <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#0a2a3d]">Partner With Us</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you soon.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleFormSubmit} className="space-y-5 mt-4">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">Which project are you interested in? *</Label>
                <RadioGroup value={projectInterest} onValueChange={setProjectInterest} className="flex flex-col gap-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:border-[#3191c2] transition-colors cursor-pointer">
                    <RadioGroupItem value="Schools-AI Program" id="schools-ai" />
                    <Label htmlFor="schools-ai" className="text-sm cursor-pointer flex-1">
                      <span className="font-semibold">Schools-AI Program</span>
                      <span className="block text-xs text-slate-500">AI education for schools across India</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:border-[#3191c2] transition-colors cursor-pointer">
                    <RadioGroupItem value="CCI Programs" id="cci" />
                    <Label htmlFor="cci" className="text-sm cursor-pointer flex-1">
                      <span className="font-semibold">CCI Programs</span>
                      <span className="block text-xs text-slate-500">Child Care Institution interventions</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:border-[#3191c2] transition-colors cursor-pointer">
                    <RadioGroupItem value="Both Programs" id="both" />
                    <Label htmlFor="both" className="text-sm cursor-pointer flex-1">
                      <span className="font-semibold">Both Programs</span>
                      <span className="block text-xs text-slate-500">Interested in supporting both initiatives</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-slate-700">Partnership Type *</Label>
                <RadioGroup value={partnershipType} onValueChange={setPartnershipType} className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CSR Partnership" id="csr" />
                    <Label htmlFor="csr" className="text-sm cursor-pointer">CSR Partnership</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Startup Partnership" id="startup" />
                    <Label htmlFor="startup" className="text-sm cursor-pointer">Startup Partnership</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="NGO Partnership" id="ngo" />
                    <Label htmlFor="ngo" className="text-sm cursor-pointer">NGO Partnership</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Individual Partnership" id="individual" />
                    <Label htmlFor="individual" className="text-sm cursor-pointer">Individual Partnership</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Name *</Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    data-testid="input-partner-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-semibold text-slate-700">Company/Organization *</Label>
                  <Input 
                    id="company" 
                    required 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Company name"
                    data-testid="input-partner-company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="you@example.com"
                    data-testid="input-partner-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="input-partner-phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-slate-700">Target City *</Label>
                  <Input 
                    id="city" 
                    required 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="e.g., Mumbai, Hyderabad"
                    data-testid="input-partner-city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schools" className="text-sm font-semibold text-slate-700">Number of Schools/CCIs *</Label>
                  <Input 
                    id="schools" 
                    required 
                    value={formData.numberOfSchools}
                    onChange={(e) => setFormData({...formData, numberOfSchools: e.target.value})}
                    placeholder="e.g., 5, 10, 20+"
                    data-testid="input-partner-schools"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-slate-700">Message (Optional)</Label>
                <Textarea 
                  id="message" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us more about your goals..."
                  className="min-h-[80px]"
                  data-testid="input-partner-message"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-[#3191c2] hover:bg-[#2580b0] text-white font-bold text-lg rounded-lg"
                data-testid="button-submit-partner"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
     </Layout>
  );
}
