import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Home, Brain, Smile, AlertCircle, Users, XCircle, HeartCrack, GraduationCap, Monitor, Heart, Library, Zap } from "lucide-react";
import { Link } from "wouter";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cciImage from "@assets/WhatsApp_Image_2021-03-28_at_6.01.54_PM_1766134488899.jpg";

const cciVideo = "/videos/cci-intro.mp4";
import eduImage from "@assets/stock_images/indian_children_stud_2c2d7d8b.jpg";
import selImage from "@assets/stock_images/happy_indian_childre_52d0842e.jpg";
import digitalImage from "@assets/stock_images/indian_children_lear_679b49c5.jpg";
import healthImage from "@assets/stock_images/doctor_checking_indi_465f3890.jpg";
import libraryImage from "@assets/stock_images/indian_children_read_b62466fd.jpg";
import eduSlide1 from "@assets/image_(1)_1766586941444.png";
import eduSlide2 from "@assets/image_(2)_1766586941444.png";
import eduSlide3 from "@assets/image_(3)_1766586941444.png";
import eduSlide4 from "@assets/image_(4)_1766586941444.png";
import eduSlide5 from "@assets/image_(5)_1766586941444.png";
import eduSlide6 from "@assets/image_(6)_1766586941444.png";
import selSlide1 from "@assets/IMG_20251129_191701331_HDR_1766587851974.jpg";
import selSlide2 from "@assets/IMG-20251117-WA0032_1766587851974.jpg";
import selSlide3 from "@assets/IMG_20251129_191259115_1766587851974.jpg";
import selSlide4 from "@assets/IMG_20251129_180815490_HDR_1766587851974.jpg";
import selSlide5 from "@assets/1000191126_1766587851974.png";
import digiSlide1 from "@assets/Screenshot_2025-12-24_at_20.25.46_1766588209637.png";
import digiSlide2 from "@assets/IMG_20251101_184751697_HDR_1766588357290.jpg";
import digiSlide3 from "@assets/IMG_20251101_184806303_HDR_1766588357290.jpg";
import digiSlide4 from "@assets/IMG_20251101_183502558_HDR_1766588357290.jpg";
import healthSlide1 from "@assets/IMG_1957_(1)_1766588561746.jpg";
import healthSlide2 from "@assets/IMG_1955_(1)_1766588561747.jpg";
import healthSlide3 from "@assets/IMG_1956_(1)_1766588561747.jpg";
import librarySlide1 from "@assets/A_child_reading_a_book_by_Pratham_Books_-_Flickr_-_Pratham_Boo_1766588900433.jpg";

const eduSlides = [eduSlide1, eduSlide2, eduSlide3, eduSlide4, eduSlide5, eduSlide6];
const selSlides = [selSlide1, selSlide2, selSlide3, selSlide4, selSlide5];
const digiSlides = [digiSlide1, digiSlide2, digiSlide3, digiSlide4];
const healthSlides = [healthSlide1, healthSlide2, healthSlide3];

export default function CCIProgramsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const holisticVideoRef = useRef<HTMLVideoElement>(null);
  const [currentEduSlide, setCurrentEduSlide] = useState(0);
  const [currentSelSlide, setCurrentSelSlide] = useState(0);
  const [currentDigiSlide, setCurrentDigiSlide] = useState(0);
  const [currentHealthSlide, setCurrentHealthSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEduSlide((prev) => (prev + 1) % eduSlides.length);
      setCurrentSelSlide((prev) => (prev + 1) % selSlides.length);
      setCurrentDigiSlide((prev) => (prev + 1) % digiSlides.length);
      setCurrentHealthSlide((prev) => (prev + 1) % healthSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        
        if (entry.isIntersecting) {
          // Play current video with sound
          video.muted = false;
          video.play().catch(e => console.log("Autoplay prevented:", e));
          
          // Pause the other video
          if (video === videoRef.current && fullVideoRef.current) {
            fullVideoRef.current.pause();
          } else if (video === fullVideoRef.current && videoRef.current) {
            videoRef.current.pause();
          }
        } else {
          // Pause when out of view
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.6 // Trigger when 60% of video is visible
    });

    if (videoRef.current) observer.observe(videoRef.current);
    if (fullVideoRef.current) observer.observe(fullVideoRef.current);
    if (holisticVideoRef.current) observer.observe(holisticVideoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="bg-[#3191c2] py-20 relative overflow-hidden">
        {/* Background Gradients & Lighting Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(255,172,0,0.15),transparent_50%)]" />
        
        {/* Animated Pulse / Lightning Effect */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[100px] rounded-full pointer-events-none"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Video (Zoomed & Prominent) */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-black w-full max-w-[360px] border-4 border-white/20"
              >
                <video 
                  ref={videoRef}
                  src={cciVideo} 
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover aspect-[9/16]"
                >
                  Your browser does not support the video tag.
                </video>
                {/* Decorative Elements around video */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full" />
              </motion.div>

              {/* Speaker Label Overlay - Hidden on mobile */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="hidden md:block absolute bottom-[40px] left-[-40px] z-20 bg-white/10 backdrop-blur-xl border border-white/30 p-5 rounded-2xl shadow-2xl max-w-[280px]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-8 bg-[#ffac00] rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-white leading-none">Subu Goparaju</h3>
                    <span className="text-xs text-white/90 font-bold uppercase tracking-wider">Supporter Voice</span>
                  </div>
                </div>
                <p className="text-white/90 text-xs font-medium leading-relaxed pl-5 border-l border-white/20 ml-1">
                  Donor 1st year operations & Speaker at HUManity stakeholder conference
                </p>
              </motion.div>
            </div>

            {/* Right Side: Graphic Design Animation & Stats */}
            <div className="md:col-span-7 text-white space-y-12">
              
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-[#ffac00] text-black hover:bg-[#e69b00] mb-4 text-sm px-4 py-1 font-bold uppercase tracking-wider">The Reality</Badge>
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  Children in <br/>
                  <span className="text-white drop-shadow-md">Child Care Institutions (CCIs)</span>
                </h1>
                
                {/* Categories Pills - Sequential Pop-up Animation */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Orphan", "Semi-Orphan", "Trafficked", "Neglected", "Abandoned"].map((tag, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 + (i * 0.5), duration: 0.5, type: "spring" }}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Stats Grid - "Simple yet Powerful Graphics" - Sequential Animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Stat 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.5, duration: 0.8 }}
                  className="relative group"
                >
                  {/* Ambient Glow */}
                  <div className="absolute -inset-4 bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                  
                  <div className="relative">
                    <h3 className="text-5xl md:text-7xl font-black text-[#ffac00] mb-2 tracking-tighter drop-shadow-sm">
                      4 Lakh
                    </h3>
                    <div className="flex items-center gap-2 text-lg md:text-xl font-bold text-white mb-3">
                      <Users className="w-5 h-5 text-[#ffac00]" />
                      <span>Children</span>
                    </div>
                    <p className="text-white/80 font-medium leading-relaxed">
                      Across India are currently living in institutional care, separated from families.
                    </p>
                  </div>
                </motion.div>

                {/* Stat 2 */}
                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 7.5, duration: 0.8 }}
                   className="relative group"
                >
                  {/* Ambient Glow */}
                  <div className="absolute -inset-4 bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                  
                  <div className="relative">
                    <h3 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter drop-shadow-sm">
                      10,000
                    </h3>
                    <div className="flex items-center gap-2 text-lg md:text-xl font-bold text-white mb-3">
                      <Home className="w-5 h-5 text-white" />
                      <span>Institutions</span>
                    </div>
                    <p className="text-white/80 font-medium leading-relaxed">
                      Registered CCIs struggling with limited resources and infrastructure gaps.
                    </p>
                  </div>
                </motion.div>

                {/* Stat 3 - Full Width Highlight */}
                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 9.5, duration: 0.8 }}
                   className="md:col-span-2 mt-4 relative overflow-hidden rounded-xl group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-transparent opacity-60" />
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500" />
                  
                  <div className="relative p-4 md:p-6 pl-6 md:pl-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className="flex items-baseline gap-2">
                       <h3 className="text-5xl md:text-7xl font-black text-white leading-none">95%</h3>
                       <span className="text-lg md:text-2xl font-black text-red-200 uppercase tracking-widest">Fail</span>
                    </div>
                    <div className="h-12 w-px bg-white/30 hidden md:block" />
                    <p className="text-white text-base md:text-lg font-medium max-w-md">
                      To provide true holistic development beyond basic food and shelter necessities.
                    </p>
                  </div>
                </motion.div>

              </div>


            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a2c4e] py-20 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(49,145,194,0.1),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(255,172,0,0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-black text-center mb-16 text-white leading-tight tracking-tight drop-shadow-lg">
              HUManity's <span className="text-[#ffac00]">Holistic Development</span> <br/>Model for CCIs
            </h2>
            
            <div className="relative">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-[#1a2c4e] aspect-video group"
                >
                  <video
                    ref={holisticVideoRef}
                    src="/videos/cci-holistic.mp4"
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    muted
                    preload="metadata"
                  />
                </div>

              {/* Speaker Label Overlay for Abhishek Paluri - Hidden on mobile */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="hidden md:block absolute top-[180px] left-[-20px] z-20 bg-[#3191c2]/90 backdrop-blur-xl border border-white/30 p-5 rounded-2xl shadow-2xl max-w-[280px]"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-8 bg-[#ffac00] rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-white leading-none">Abhishek Paluri</h3>
                  </div>
                </div>
                <p className="text-white/90 text-xs font-medium leading-relaxed pl-5 border-l border-white/20 ml-1">
                  Founder- HUManity Foundation
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3191c2]/10 border border-[#3191c2]/20 text-[#3191c2] text-xs font-bold uppercase tracking-widest mb-6"
            >
                <Zap className="w-3.5 h-3.5" fill="currentColor" />
                <span>5-Pillar Care Model</span>
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-[#3191c2] mb-6 tracking-tight leading-[1.1]"
            >
                Holistic Programs <br className="hidden md:block" />
                <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] to-orange-500">in Action</span>
                    <svg className="absolute w-[110%] h-4 -bottom-2 -left-[5%] text-[#ffac00]/30 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="12" fill="none" />
                    </svg>
                </span>
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed"
            >
                Comprehensive interventions designed to nurture every aspect of a child's growth and meet the evolving needs of Child Care Institutions.
            </motion.p>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-[1400px] mx-auto">
          {/* 1. Education - Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-md w-full h-full"
          >
            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors z-20" />
            
            {/* Slideshow */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentEduSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Colored Overlay for "Powerful" Look */}
                <div className="absolute inset-0 bg-indigo-900/30 mix-blend-overlay z-10" />
                
                <img 
                  src={eduSlides[currentEduSlide]} 
                  alt="Education in CCIs" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-[#3191c2] via-[#3191c2]/80 to-transparent">
              <div className="bg-[#ffac00] w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-black/20">
                <GraduationCap className="w-6 h-6 text-[#3191c2]" />
              </div>
              <h3 className="text-3xl font-bold text-white leading-none drop-shadow-md">Education</h3>
            </div>
          </motion.div>

          {/* 2. Education - Objective (Static, Lightning Theme) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-400/30 bg-[#3191c2] group p-8 flex flex-col justify-center">
            {/* Shared Background Effects */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2),transparent_70%)] z-0"
            />
            <motion.div
                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full z-0"
            />

            <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-white/20 rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Zap className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Education Development</h3>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100 mb-3 border-b border-blue-200/30 pb-2 w-fit">Key Intervention</h4>
                        <p className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
                            Everyday <span className="text-[#ffac00] text-shadow-glow">Online Classes</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">Year-round continuous support</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">Targeting 8th, 9th & 10th grades</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 3. Social-Emotional - Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-md w-full h-full"
          >
            <div className="absolute inset-0 bg-yellow-900/20 group-hover:bg-yellow-900/10 transition-colors z-20" />
            
             {/* Slideshow */}
             <AnimatePresence mode="popLayout">
              <motion.div
                key={currentSelSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Colored Overlay for "Powerful" Look */}
                <div className="absolute inset-0 bg-yellow-900/30 mix-blend-overlay z-10" />
                
                <img 
                  src={selSlides[currentSelSlide]} 
                  alt="Social-Emotional Learning" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-[#3191c2] via-[#3191c2]/80 to-transparent">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-black/20">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white leading-none drop-shadow-md">Social-Emotional</h3>
            </div>
          </motion.div>

          {/* 4. Social-Emotional - Objective (Lightning Theme) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-400/30 bg-[#3191c2] group p-8 flex flex-col justify-center">
            {/* Shared Background Effects */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2),transparent_70%)] z-0"
            />
            <motion.div
                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full z-0"
            />

            <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-white/20 rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Users className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Social-Emotional Learning</h3>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100 mb-3 border-b border-blue-200/30 pb-2 w-fit">Key Intervention</h4>
                        <p className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
                            Weekend Activities <span className="text-[#ffac00] text-shadow-glow text-2xl block mt-1">(Sundays)</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">Learning through participation</span>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00] mt-2" />
                            <span className="text-lg text-white font-medium leading-tight">Value based sessions, emotional handling, peer support</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 5. Digital Literacy - Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-md w-full h-full"
          >
            <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors z-20" />
            
             {/* Slideshow */}
             <AnimatePresence mode="popLayout">
              <motion.div
                key={currentDigiSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Colored Overlay for "Powerful" Look */}
                <div className="absolute inset-0 bg-green-900/30 mix-blend-overlay z-10" />
                
                <img 
                  src={digiSlides[currentDigiSlide]} 
                  alt="Digital Literacy" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-[#3191c2] via-[#3191c2]/80 to-transparent">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-black/20">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white leading-none drop-shadow-md">Digital Literacy</h3>
            </div>
          </motion.div>

          {/* 6. Digital Literacy - Objective (Lightning Theme) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-400/30 bg-[#3191c2] group p-8 flex flex-col justify-center">
            {/* Shared Background Effects */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2),transparent_70%)] z-0"
            />
            <motion.div
                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full z-0"
            />

            <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-white/20 rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Monitor className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Digital Literacy & AI</h3>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100 mb-3 border-b border-blue-200/30 pb-2 w-fit">Key Intervention</h4>
                        <p className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
                            Skill-based <span className="text-[#ffac00] text-shadow-glow">AI Tools</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">AI for Education</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">Safety in the Internet world</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 7. Health - Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-md w-full h-full"
          >
            <div className="absolute inset-0 bg-red-900/20 group-hover:bg-red-900/10 transition-colors z-20" />
            
             {/* Slideshow */}
             <AnimatePresence mode="popLayout">
              <motion.div
                key={currentHealthSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Colored Overlay for "Powerful" Look */}
                <div className="absolute inset-0 bg-red-900/30 mix-blend-overlay z-10" />
                
                <img 
                  src={healthSlides[currentHealthSlide]} 
                  alt="Health & Nutrition" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-[#3191c2] via-[#3191c2]/80 to-transparent">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-black/20">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white leading-none drop-shadow-md">Health</h3>
            </div>
          </motion.div>

          {/* 8. Health - Objective (Lightning Theme) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-400/30 bg-[#3191c2] group p-8 flex flex-col justify-center">
            {/* Shared Background Effects */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2),transparent_70%)] z-0"
            />
            <motion.div
                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full z-0"
            />

            <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-white/20 rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Heart className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Health & Nutrition</h3>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100 mb-3 border-b border-blue-200/30 pb-2 w-fit">Key Intervention</h4>
                        <p className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
                            Yoga Classes & <span className="text-[#ffac00] text-shadow-glow">Awareness</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">Hospital collaborations with CCI</span>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00] mt-2" />
                            <span className="text-lg text-white font-medium leading-tight">Quarterly check ups & health reports</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>

          {/* 9. Project Library - Combined Card (Lightning Theme) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-400/30 bg-[#3191c2] group p-8 flex flex-col justify-center">
            {/* Shared Background Effects */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.2),transparent_70%)] z-0"
            />
            <motion.div
                animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full z-0"
            />

            <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-white/20 rounded-xl border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Library className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Project Library</h3>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100 mb-3 border-b border-blue-200/30 pb-2 w-fit">Key Intervention</h4>
                        <p className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight drop-shadow-lg">
                            Installing Libraries <span className="text-[#ffac00] text-shadow-glow">Across CCIs</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00]" />
                            <span className="text-lg text-white font-medium">Collaboration with Pratham Books</span>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#ffac00] shadow-[0_0_10px_#ffac00] mt-2" />
                            <span className="text-lg text-white font-medium leading-tight">Monitoring the reading levels bimonthly</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
