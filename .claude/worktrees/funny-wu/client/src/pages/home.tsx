import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, GraduationCap, Heart, Monitor, Users, Home, ChevronDown, BookOpen, HeartHandshake, Laptop, Utensils, Library, Award, UserCheck, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/Screenshot_2025-12-19_at_10.23.04_1766126682914.png";
import combinedHeroImage from "@assets/Gemini_Generated_Image_mnsw99mnsw99mnsw_1766488537927.png";
import cciSilhouette from "@assets/Gemini_Generated_Image_ugyi1sugyi1sugyi_1766491674128.png";
import schoolSilhouette from "@assets/Gemini_Generated_Image_oth0efoth0efoth0_1766491674128.png";

import vol1 from "@assets/download_1766516239650.png";
import vol2 from "@assets/Vol_4_1766516239650.jpg";
import vol3 from "@assets/Vol_5_1766516239650.jpg";
import vol4 from "@assets/Vol_2_1766516239650.jpg";

import logoArpan from "@assets/Untitled-design-12_1766521263245.png";
import logoPratham from "@assets/Untitled-design-10_1766521263245.png";
import logoGoonj from "@assets/Untitled-design-4-1_1766521263245.png";
import logoPena4 from "@assets/Untitled-design-14-e1751700980101_1766521263245.png";
import logoEcoFemme from "@assets/Untitled-design-15_1766521263245.png";
import logoHarper from "@assets/Untitled-design-11_1766521263245.png";
import logoByjus from "@assets/Untitled-design-13_1766521263246.png";
import logoSVP from "@assets/Untitled-design-5-1-e1751701041429_1766521263246.png";
import logoEnergy from "@assets/2023-10-Logo-PNG-01-01-01-2_1766521292880.png";

import newsEenaadu from "@assets/Eenaadu_Article_August_2021_1766521485170.jpg";
import newsHindu from "@assets/Hindu_August_1766521485171.jpg";
import newsYoVizag from "@assets/image_1766521485171.png";
import newsAward from "@assets/Picture11_1766521485171.webp";
import newsCert from "@assets/Picture12_1766521485171.webp";

import collage1 from "@assets/Class_HUM_1766966728588.jpg";
import collage2 from "@assets/IB_11_1766966728588.jpg";
import collage3 from "@assets/image_(7)_1766966728588.png";
import collage4 from "@assets/image_(8)_1766966728588.png";
import collage5 from "@assets/image_(9)_1766966728588.png";
import collage6 from "@assets/image_(10)_1766966728588.png";
import collage7 from "@assets/IMG20221012182728_1766966728588.jpg";
import collage8 from "@assets/IMG_6166_1766966728588.jpg";
import collage9 from "@assets/Ind_1_1766966728588.jpg";
import collage10 from "@assets/SRI_3899_1766966728588.jpg";
import collage11 from "@assets/SRI_4023_1766966728588.jpg";
import collage12 from "@assets/WhatsApp_Image_2021-03-28_at_4.16.18_PM_1766966728588.jpg";
import collage13 from "@assets/Yo_Vizag_1766966728588.png";

function AnimatedCounter({ value, suffix = "", color }: { value: number; suffix?: string; color: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const springCount = useSpring(count, { duration: 2000, bounce: 0 });
  const displayValue = useTransform(springCount, (latest) => {
    const num = Math.round(latest);
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  });

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className={`text-4xl md:text-6xl font-black tracking-tight ${color}`}>
      <motion.span>{displayValue}</motion.span>{suffix}
    </span>
  );
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <Layout>
      {/* Full Screen High-Impact Split Hero */}
      <section className="relative min-h-screen md:h-screen w-full overflow-hidden flex flex-col md:flex-row bg-slate-900">
        {/* Unified Background Image - Hidden on mobile, shown on desktop */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <img 
            src={combinedHeroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Left Side: CCI (Warmth & Organic) */}
        <div className="relative w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden group">
            {/* Mobile Background Image - CCI silhouette */}
            <div className="absolute inset-0 z-0 md:hidden overflow-hidden">
              <img 
                src={cciSilhouette} 
                alt="CCI Background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Organic Shape Overlay - Animated */}
            <div className="absolute inset-0 pointer-events-none opacity-40 z-10">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-orange-400/20">
                 <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none"/>
                 <motion.circle 
                   cx="20" cy="20" r="30" 
                   className="blur-3xl"
                   animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 />
                 <motion.circle 
                   cx="80" cy="80" r="40" 
                   className="blur-3xl"
                   animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 />
               </svg>
            </div>
            
            {/* Visual Storytelling: Pulse/Heartbeat Animation */}
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 opacity-30">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                   <Heart className="w-96 h-96 text-orange-200 fill-orange-200/20 blur-xl" />
                </motion.div>
             </div>

            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-transparent md:bg-gradient-to-r md:from-orange-900/60 md:to-black/40 z-10" />
            
            <div className="absolute inset-x-4 top-4 bottom-4 md:inset-auto md:top-auto md:bottom-12 md:left-12 z-20 md:max-w-lg flex flex-col justify-between md:justify-start">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-col h-full md:h-auto justify-between md:justify-start"
               >
                 <div>
                   <h2 className="text-xl md:text-3xl font-heading font-black text-white drop-shadow-lg leading-tight tracking-tight mb-3">Holistic Development for Children in Child Care Institutions(CCIs)</h2>
                   <Link href="/CCI-programs">
                     <Button size="sm" className="bg-[#ffac00] hover:bg-[#e69b00] text-black border-none rounded-full px-4 py-1.5 text-xs font-bold shadow-lg">
                        Explore CCI
                     </Button>
                   </Link>
                 </div>
               </motion.div>
            </div>
        </div>

        {/* Right Side: Schools (Tech & Future) */}
        <div className="relative w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden group border-t border-white/10 md:border-t-0 md:border-l">
            {/* Mobile Background Image - Schools silhouette */}
            <div className="absolute inset-0 z-0 md:hidden overflow-hidden">
              <img 
                src={schoolSilhouette} 
                alt="Schools Background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Tech Network Overlay - Animated */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
               <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                   <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1"/>
                   </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#grid)" />
                 
                 {/* Animated data points */}
                 <motion.circle cx="10%" cy="20%" r="2" fill="#38bdf8" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
                 <motion.circle cx="50%" cy="60%" r="2" fill="#38bdf8" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                 <motion.circle cx="80%" cy="30%" r="2" fill="#38bdf8" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
               </svg>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
            </div>

            {/* Visual Storytelling: Digital Connection Animation */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 opacity-20">
                 <div className="relative w-96 h-96">
                    <motion.div 
                       className="absolute inset-0 border border-cyan-400 rounded-full"
                       animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div 
                       className="absolute inset-4 border border-cyan-300 rounded-full"
                       animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />
                 </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-l from-blue-900/80 to-transparent md:bg-gradient-to-l md:from-blue-900/60 md:to-black/40 z-10" />
            
            <div className="absolute inset-x-4 top-4 bottom-4 md:inset-auto md:top-auto md:bottom-12 md:left-auto md:right-12 z-20 md:max-w-lg md:text-right flex flex-col justify-between md:justify-start">
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-col h-full md:h-auto justify-between md:justify-start"
               >
                 <div>
                   <h2 className="text-xl md:text-3xl font-heading font-black text-white leading-tight drop-shadow-lg tracking-tight mb-3">
                     AI Upskilling for Schools across India
                   </h2>
                   <Link href="/School-AI-program">
                     <Button size="sm" className="bg-[#3191c2] hover:bg-[#2580b0] text-white border-none rounded-full px-4 py-1.5 text-xs font-bold shadow-lg">
                       Explore Schools
                     </Button>
                   </Link>
                 </div>
               </motion.div>
            </div>
        </div>

        {/* Central Overlay Content - Floating above everything */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
            <div className="container px-4 text-center">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="pointer-events-auto"
                 >
                    <h1 className="text-3xl md:text-8xl font-heading font-black text-white tracking-tighter mb-2 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                      TWO PATHS.
                    </h1>
                    <h1 className="text-3xl md:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] via-white to-[#3191c2] tracking-tighter mb-8 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] filter drop-shadow-lg">
                       ONE FUTURE.
                    </h1>
                    
                    <div className="hidden md:flex flex-col sm:flex-row justify-center gap-4 mt-4 md:mt-8">
                       <Link href="/CCI-programs">
                          <Button size="lg" className="w-64 bg-[#ffac00] hover:bg-[#e69b00] text-black border-none rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-transform">Explore CCI Programs</Button>
                       </Link>
                       <Link href="/School-AI-program">
                           <Button size="lg" className="w-64 bg-[#3191c2] hover:bg-[#2580b0] text-white border-none rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-transform">
                             Explore Schools Program
                          </Button>
                       </Link>
                    </div>
                 </motion.div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
           style={{ opacity }}
           className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-30"
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
        >
            <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
            <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>
      {/* Impact Stats - Photo Collage Background */}
      <section className="py-24 relative z-20 overflow-hidden bg-black min-h-[500px]">
        {/* Photo Collage Grid Background */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-7 grid-rows-2 gap-0">
          {[collage1, collage2, collage3, collage4, collage5, collage6, collage7, collage8, collage9, collage10, collage11, collage12, collage13, collage1].map((img, idx) => (
            <motion.div 
              key={idx}
              className="relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <motion.img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover grayscale"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10 + idx * 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Animated Graphic Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
            <defs>
              <linearGradient id="blueLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3191c2" stopOpacity="0" />
                <stop offset="50%" stopColor="#3191c2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3191c2" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="orangeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffac00" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffac00" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffac00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M-100,200 Q200,100 400,200 T800,200 T1300,200"
              fill="none"
              stroke="url(#blueLineGrad)"
              strokeWidth="2"
              animate={{ x: [0, -200] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M1300,200 Q1000,300 800,200 T400,200 T-100,200"
              fill="none"
              stroke="url(#orangeLineGrad)"
              strokeWidth="2"
              animate={{ x: [0, 200] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
          </svg>
          
          {/* Floating geometric shapes */}
          <motion.div 
            className="absolute top-10 left-[10%] w-20 h-20 border border-[#ffac00]/30 rotate-45"
            animate={{ rotate: [45, 90, 45], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 right-[15%] w-16 h-16 border border-[#3191c2]/30 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/4 right-[25%] w-12 h-12 border border-white/20"
            animate={{ rotate: [0, 180, 360], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-[20%] w-8 h-8 bg-[#ffac00]/10 rounded-full"
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffac00] via-[#3191c2] to-[#ffac00]" />
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3191c2] via-[#ffac00] to-[#3191c2]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-stretch gap-0 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
            {[
              { value: 6, suffix: "+", label: "Years of Impact", color: "text-[#ffac00]" },
              { value: 30, suffix: "+", label: "ChildCare Institutions", color: "text-[#3191c2]" },
              { value: 3, suffix: "+", label: "Schools", color: "text-[#ffac00]" },
              { value: 3000, suffix: "+", label: "Children Impacted", color: "text-[#3191c2]" },
              { value: 300, suffix: "+", label: "Volunteers", color: "text-[#ffac00]" },
              { value: 6, suffix: "", label: "Impact Programs", color: "text-[#3191c2]" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 min-w-[140px] md:min-w-[160px] px-4 md:px-8 py-10 flex flex-col items-center justify-center text-center border-r border-white/10 last:border-r-0 group hover:bg-white/5 transition-all duration-300"
              >
                 <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
                 <p className="text-white/80 font-bold uppercase tracking-wider text-[10px] md:text-xs mt-3">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Newspaper Editorial Section - Split Screen */}
      <section className="w-full grid md:grid-cols-2 min-h-[100vh] relative z-20">
        {/* Newspaper texture overlay for entire section */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        
        {/* Left Column - CCI Ground Reality */}
        <div className="relative overflow-hidden bg-[#f5f0e8] p-8 md:p-16 flex flex-col justify-center min-h-[700px] border-r-4 border-black/20">
          {/* Vintage paper texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8f4ec] via-[#f5f0e8] to-[#ebe5d9] pointer-events-none" />
          
          {/* Newspaper column lines */}
          <div className="absolute inset-y-0 right-0 w-px bg-black/10" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-black" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/30" />
          
          {/* B&W Image with parallax */}
          <motion.div 
            className="absolute top-0 right-0 w-2/3 h-1/2 pointer-events-none opacity-20 mix-blend-multiply"
            initial={{ y: 0 }}
            whileInView={{ y: -20 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={collage7} alt="" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f5f0e8]/80 to-[#f5f0e8]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f0e8]" />
          </motion.div>
          
          <div className="relative z-10 max-w-lg">
            {/* Newspaper masthead style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/60 font-sans mb-6 block">Special Report</span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-black leading-[1.1] tracking-tight mb-4">
                India's <span className="text-[#ffac00]">Forgotten</span> Childhood
              </h2>
              
              <div className="w-20 h-1 bg-[#ffac00] mb-6" />
              
              <p className="text-lg md:text-xl font-sans text-black/70 leading-relaxed mb-8">
                Behind the closed doors of Child Care Institutions, millions of children grow up without families — and with limited access to opportunity.
              </p>
            </motion.div>
            
            {/* Stat boxes - newspaper pull-quote style */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/60 border-2 border-black p-4 relative group hover:bg-white transition-colors"
              >
                <span className="text-3xl md:text-4xl font-serif font-black text-[#ffac00] block">10,000+</span>
                <span className="text-sm font-sans text-black/70 leading-tight block mt-1">Child Care Institutions across India</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 border-2 border-black p-4 relative group hover:bg-white transition-colors"
              >
                <span className="text-3xl md:text-4xl font-serif font-black text-[#ffac00] block">4 Lakh +</span>
                <span className="text-sm font-sans text-black/70 leading-tight block mt-1">Children living in institutional care</span>
              </motion.div>
            </div>
            
            <p className="text-[11px] font-sans text-black/40 uppercase tracking-wider mb-6">Source: Govt. & sector estimates</p>
            
            {/* Body text - newspaper style */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-base font-sans text-black/70 leading-relaxed">
                Most children enter care due to poverty, abandonment, abuse, or loss of parents. Many age out without skills, support, or a safety net.
              </p>
            </motion.div>
            
            {/* CTA - newspaper footer style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t-2 border-black/20"
            >
              <Link href="/CCI-programs">
                <Button className="bg-black hover:bg-black/80 text-white font-sans font-bold px-8 py-6 text-base rounded-none group">
                  Read the Full Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Education & Tech Gap */}
        <div className="relative overflow-hidden bg-[#1a1a1a] p-8 md:p-16 flex flex-col justify-center min-h-[700px]">
          {/* Dark newspaper texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#151515] pointer-events-none" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#3191c2]" />
          
          {/* B&W Image with parallax */}
          <motion.div 
            className="absolute bottom-0 left-0 w-2/3 h-1/2 pointer-events-none opacity-15 mix-blend-screen"
            initial={{ y: 0 }}
            whileInView={{ y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src={collage3} alt="" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a1a]/80 to-[#1a1a1a]" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#1a1a1a]" />
          </motion.div>
          
          <div className="relative z-10 max-w-lg">
            {/* Newspaper masthead style - inverted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 font-sans mb-6 block">Investigation | 2024</span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.1] tracking-tight mb-4">
                Education's Great <span className="text-[#3191c2]">Reset</span>
              </h2>
              
              <div className="w-20 h-1 bg-[#3191c2] mb-6" />
              
              <p className="text-lg md:text-xl font-sans text-white/70 leading-relaxed mb-8">
                Post-COVID, India's schools face a new challenge: preparing students for an AI-driven future they aren't equipped to teach.
              </p>
            </motion.div>
            
            {/* Stat boxes - dark newspaper style */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/20 p-4 relative group hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl md:text-4xl font-serif font-black text-[#3191c2] block">80%</span>
                <span className="text-sm font-sans text-white/60 leading-tight block mt-1">Schools lack AI-ready infrastructure</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/20 p-4 relative group hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl md:text-4xl font-serif font-black text-[#3191c2] block">2 Years</span>
                <span className="text-sm font-sans text-white/60 leading-tight block mt-1">Average learning loss post-pandemic</span>
              </motion.div>
            </div>
            
            <p className="text-[11px] font-sans text-white/30 uppercase tracking-wider mb-6">ASER / UNESCO insights</p>
            
            {/* Body text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-base font-sans text-white/60 leading-relaxed">
                While the world moves fast with AI, many classrooms still struggle with basic digital access. The learning gap is becoming an economic gap.
              </p>
            </motion.div>
            
            {/* CTA - newspaper footer style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-white/20"
            >
              <Link href="/School-AI-program">
                <Button className="bg-[#3191c2] hover:bg-[#2580b0] text-white font-sans font-bold px-8 py-6 text-base rounded-none group">
                  Explore the Solution
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Community / Volunteer Section - Hero Style */}
      <section className="relative w-full min-h-[80vh] overflow-hidden bg-slate-900 flex items-center">
        {/* Background Visual Canvas - Slow Zoom Animation */}
        <div className="absolute inset-0 z-0">
             <motion.div 
                className="w-full h-full grid grid-cols-2"
                animate={{ scale: [1, 1.05] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
             >
                 <div className="relative w-full h-full">
                    <img src={vol1} alt="Volunteer Community" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
                 </div>
                 <div className="relative w-full h-full">
                    <img src={vol2} alt="Volunteer Community" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-orange-900/20 mix-blend-multiply" />
                 </div>
                 <div className="relative w-full h-full">
                    <img src={vol3} alt="Volunteer Community" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
                 </div>
                 <div className="relative w-full h-full">
                    <img src={vol4} alt="Volunteer Community" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-orange-900/20 mix-blend-multiply" />
                 </div>
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 w-full h-full flex flex-col justify-center py-24">
            {/* Main Headline */}
            <div className="text-center mb-16 md:mb-24">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-8xl font-heading font-black text-white tracking-tight drop-shadow-2xl leading-tight mb-6"
                >
                    Powered by People.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] to-[#ffac00]">Driven by Heart.</span>
                </motion.h2>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center gap-2 md:gap-3"
                >
                    <span className="text-2xl md:text-5xl font-heading font-medium text-white/90 drop-shadow-lg">
                        <span className="text-[#3191c2] font-black">HUM</span>anitarian forever
                    </span>
                    <Heart className="w-6 h-6 md:w-10 md:h-10 text-[#3191c2] fill-[#3191c2] drop-shadow-lg" />
                </motion.div>
            </div>

            {/* Engagement Areas */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 w-full max-w-6xl mx-auto">
                {/* Left Side - Volunteer Leadership */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-start md:items-end text-left md:text-right space-y-6"
                >
                    <div className="md:pl-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Volunteer Leadership</h3>
                        <p className="text-lg text-gray-200 mb-6 font-medium leading-relaxed">
                            Lead the change by teaching, mentoring, and shaping young minds. Your time can transform a future.
                        </p>
                        <Link href="/volunteer">
                            <Button size="lg" className="bg-[#ffac00] hover:bg-[#e69b00] text-black border-none rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,172,0,0.3)] hover:shadow-[0_0_30px_rgba(255,172,0,0.5)] transition-all transform hover:-translate-y-1">
                                Volunteering
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right Side - Corporate Partnerships */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col items-start text-left space-y-6 md:border-l md:border-white/20 md:pl-12"
                >
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Corporate Partnerships & CSR</h3>
                        <p className="text-lg text-gray-200 mb-6 font-medium leading-relaxed">
                            Empower your team through meaningful social impact. Partner with us for CSR initiatives that matter.
                        </p>
                        <Link href="/School-AI-program">
                            <Button size="lg" className="bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-all transform hover:-translate-y-1">
                                Partner With Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>
      {/* Collaborations & Media Recognition */}
      <section className="py-24 bg-white overflow-hidden">
        {/* Part 1: Our Collaborations */}
        <div className="mb-24">
            <div className="container mx-auto px-4 text-center mb-12">
                <span className="text-[#3191c2] font-bold tracking-widest text-sm uppercase mb-3 block">Trusted Partners</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Our Collaborations</h2>
            </div>

            <div className="relative w-full overflow-hidden py-16 bg-gradient-to-r from-transparent via-[#3191c2]/5 to-transparent">
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(49,145,194,0.2)_0%,_transparent_60%)] w-full mix-blend-screen" />
                
                {/* Layer 1: Grayscale Background Strip - Subtle */}
                <div className="flex w-full">
                    <motion.div
                        className="flex items-center gap-16 md:gap-24 px-12"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[
                          logoArpan, logoPratham, logoGoonj, logoPena4, 
                          logoEcoFemme, logoHarper, logoByjus, logoSVP, logoEnergy,
                          logoArpan, logoPratham, logoGoonj, logoPena4, 
                          logoEcoFemme, logoHarper, logoByjus, logoSVP, logoEnergy
                        ].map((logo, idx) => (
                            <div key={idx} className="flex-shrink-0 w-40 h-24 md:w-48 md:h-32 flex items-center justify-center grayscale opacity-10">
                                <img src={logo} alt="Collaborator Logo" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Layer 2: Colorful Center Strip (Masked) - Highlighted with "Lightning" Effect */}
                <div className="absolute inset-0 flex w-full pointer-events-none" style={{ maskImage: "linear-gradient(90deg, transparent 5%, transparent 20%, black 40%, black 60%, transparent 80%, transparent 95%)" }}>
                    <motion.div
                        className="flex items-center gap-16 md:gap-24 px-12"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[
                          logoArpan, logoPratham, logoGoonj, logoPena4, 
                          logoEcoFemme, logoHarper, logoByjus, logoSVP, logoEnergy,
                          logoArpan, logoPratham, logoGoonj, logoPena4, 
                          logoEcoFemme, logoHarper, logoByjus, logoSVP, logoEnergy
                        ].map((logo, idx) => (
                            <div key={idx} className="flex-shrink-0 w-44 h-28 md:w-56 md:h-36 flex items-center justify-center transform scale-125 transition-transform z-20">
                                <div className="absolute inset-0 bg-[#3191c2]/20 blur-xl rounded-full scale-75 animate-pulse" />
                                <img src={logo} alt="Collaborator Logo" className="relative w-full h-full object-contain mix-blend-multiply drop-shadow-[0_0_15px_rgba(49,145,194,0.6)] brightness-110" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Part 2: In the News */}
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                 <span className="text-[#ffac00] font-bold tracking-widest text-sm uppercase mb-3 block">Media & Awards</span>
                 <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">In the News</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
                 {/* Left Column: Hindu Feature + Small Tiles */}
                 <div className="lg:col-span-2 flex flex-col gap-8">
                     {/* Featured Article - Large */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                     >
                        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[16/9] mb-4 shadow-sm group-hover:shadow-md transition-all max-w-2xl">
                            <img src={newsHindu} alt="The Hindu Feature" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium flex items-center">Read Full Coverage <ArrowRight className="ml-2 w-4 h-4" /></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="bg-[#3191c2]/10 text-[#3191c2] hover:bg-[#3191c2]/20 border-none rounded-md px-3 py-1 text-xs uppercase tracking-wider font-bold">The Hindu</Badge>
                            <span className="text-gray-400 text-sm font-medium">Feature Story</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#3191c2] transition-colors leading-tight max-w-xl">Changing the lives of underprivileged children</h3>
                        <p className="text-gray-600 leading-relaxed text-base max-w-xl">
                            City-based NGO HUManity launches a campaign to distribute donated mobile phones, bridging the digital divide for children in Child Care Institutions.
                        </p>
                     </motion.div>

                     {/* Small Tiles Row - Eenaadu & ConnectFor */}
                     <div className="grid grid-cols-2 gap-6 max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-video mb-2 border border-gray-100">
                                <img src={newsEenaadu} alt="Eenaadu" className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 group-hover:text-[#3191c2] transition-colors uppercase tracking-wider block text-left">Eenaadu</span>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-video mb-2 border border-gray-100">
                                <img src={newsCert} alt="ConnectFor" className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 group-hover:text-[#3191c2] transition-colors uppercase tracking-wider block text-left">ConnectFor</span>
                        </motion.div>
                     </div>
                 </div>

                 {/* Right Column: Other News */}
                 <div className="flex flex-col gap-6 lg:mt-0">
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group cursor-pointer"
                     >
                        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/2] mb-3 shadow-sm group-hover:shadow-md transition-all">
                             <img src={newsAward} alt="Business Mint Award" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-[#ffac00]/10 text-orange-700 hover:bg-[#ffac00]/20 border-none rounded-md px-2 py-1 text-xs uppercase tracking-wide font-bold">Award</Badge>
                            <span className="text-gray-400 text-xs font-medium">2023</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#ffac00] transition-colors leading-snug">Most Admired NGO of the Year</h4>
                     </motion.div>

                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group cursor-pointer"
                     >
                        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/2] mb-3 shadow-sm group-hover:shadow-md transition-all">
                             <img src={newsYoVizag} alt="Yo! Vizag Feature" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none rounded-md px-2 py-1 text-xs uppercase tracking-wide font-bold">Yo! Vizag</Badge>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#3191c2] transition-colors leading-snug">Bringing Quality Education to Shelter Homes</h4>
                     </motion.div>
                 </div>
            </div>
        </div>
      </section>
    </Layout>
  );
}
