import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { Monitor, Users, Award, Sparkles, Quote, Play, Volume2, VolumeX, Heart, GraduationCap, Plane } from "lucide-react";

const jayashreeVideo = "/videos/jayashree.mp4";
const toppersVideo = "/videos/toppers.mp4";
const satishVideo = "/videos/satish-story.mp4";

export default function ImpactStoriesPage() {
  const [activeVideo, setActiveVideo] = useState<'story1' | 'story2' | 'story3' | null>(null);
  const story1VideoRef = useRef<HTMLVideoElement>(null);
  const story2VideoRef = useRef<HTMLVideoElement>(null);
  const story3VideoRef = useRef<HTMLVideoElement>(null);

  const allVideoRefs = [
    { id: 'story1' as const, ref: story1VideoRef },
    { id: 'story2' as const, ref: story2VideoRef },
    { id: 'story3' as const, ref: story3VideoRef },
  ];

  const playVideoWithSound = useCallback((videoId: 'story1' | 'story2' | 'story3') => {
    allVideoRefs.forEach(({ id, ref }) => {
      if (ref.current) {
        if (id === videoId) {
          ref.current.muted = false;
          ref.current.play().catch(e => console.log("Play prevented:", e));
          setActiveVideo(videoId);
        } else {
          ref.current.pause();
          ref.current.muted = true;
        }
      }
    });
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        const videoInfo = allVideoRefs.find(v => v.ref.current === video);
        
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(e => console.log("Autoplay prevented:", e));
          
          // Pause other videos
          allVideoRefs.forEach(({ ref }) => {
            if (ref.current && ref.current !== video) {
              ref.current.pause();
              ref.current.muted = true;
            }
          });
          
          if (activeVideo && videoInfo) {
            video.muted = false;
            setActiveVideo(videoInfo.id);
          }
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });

    allVideoRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });
    
    return () => observer.disconnect();
  }, [activeVideo]);

  return (
    <Layout>
      {/* Hero Section - Powerful & Cinematic */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,172,0,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(49,145,194,0.2),transparent_50%)]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100vh" }}
              animate={{ opacity: [0, 0.6, 0], y: "-100vh" }}
              transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 8 }}
              className="absolute w-1 h-1 bg-[#ffac00]/40 rounded-full"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(255,172,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,172,0,0.3) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ffac00]/10 backdrop-blur-sm border border-[#ffac00]/30 text-[#ffac00] font-bold tracking-widest text-sm uppercase mb-8">
                <Sparkles className="w-4 h-4" />
                Real Lives, Real Change
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-8xl font-heading font-black text-white mb-8 leading-[0.9]"
            >
              Stories That{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] via-orange-400 to-[#ffac00]">
                  Inspire
                </span>
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#ffac00] to-[#3191c2] origin-left"
                />
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12"
            >
              Every child has a story. Every story has a turning point. These are the moments 
              where hope met opportunity, and lives were transformed forever.
            </motion.p>
            
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffac00] via-[#3191c2] to-[#ffac00] origin-left"
        />
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs tracking-widest uppercase mb-2">Scroll to Explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full bg-[#ffac00]"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Story 1: Digital Classrooms */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffac00]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3191c2]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Story Number Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-dashed border-[#ffac00]/30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black text-[#ffac00]">01</span>
              </div>
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#3191c2]/10 text-[#3191c2] font-bold tracking-widest text-xs uppercase mb-6 border border-[#3191c2]/20">
                Digital Revolution
              </span>
              
              <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-6 leading-tight">
                7 CCIs Got{" "}
                <span className="text-[#3191c2]">Computers</span>{" "}
                for the First Time
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Across Hyderabad, <strong className="text-[#ffac00]">270+ children</strong> are now receiving 
                daily online classes. What was once a dream is now their everyday reality.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
                {[
                  { value: "7", label: "CCIs" },
                  { value: "270+", label: "Children" },
                  { value: "Daily", label: "Classes" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-[#ffac00]/10 to-[#3191c2]/10 border border-gray-100"
                  >
                    <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Quote Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-2xl text-left"
              >
                <Quote className="absolute top-4 left-4 w-10 h-10 text-[#ffac00]/30" />
                <p className="text-lg text-gray-200 italic leading-relaxed pl-8">
                  "A few NGOs have tried online classes before, but our children were never 
                  interested like they are for their <span className="text-[#ffac00] font-bold">HUManity Akka and Anna</span>. 
                  The connection is different."
                </p>
                <div className="mt-6 flex items-center gap-4 pl-8">
                  <div className="w-12 h-12 rounded-full bg-[#ffac00]/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#ffac00]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Ms. Jayashree</p>
                    <p className="text-sm text-gray-400">CCI Caretaker</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 2: Board Toppers */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(49,145,194,0.1),transparent_70%)]" />
        
        {/* Animated Corner Frames */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-12 left-12 w-32 h-32 border-l-4 border-t-4 border-[#ffac00]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-12 right-12 w-32 h-32 border-r-4 border-b-4 border-[#3191c2]"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Story Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-dashed border-[#3191c2]/30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black text-[#3191c2]">02</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Video Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 cursor-pointer group aspect-video bg-black"
                onClick={() => playVideoWithSound('story2')}
              >
                <video 
                  ref={story2VideoRef}
                  src={toppersVideo}
                  loop
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
                
                {/* Sound Indicator Overlay */}
                {activeVideo !== 'story2' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                        <VolumeX className="w-10 h-10 text-white" />
                      </div>
                      <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full">
                        Click for Sound
                      </span>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Playing with Sound Indicator */}
                {activeVideo === 'story2' && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Volume2 className="w-5 h-5 text-white" />
                    <span className="text-white font-bold text-sm">Playing with Sound</span>
                  </div>
                )}
                
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-bold text-lg">Board Toppers</p>
                  <p className="text-gray-300 text-sm">Thanking HUManity Volunteers</p>
                </div>
              </div>
            </motion.div>
            
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#ffac00]/10 text-[#ffac00] font-bold tracking-widest text-xs uppercase mb-6 border border-[#ffac00]/20">
                Academic Excellence
              </span>
              
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                Two Children{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] to-orange-400">
                  Topped
                </span>{" "}
                Their 10th Boards
              </h2>
              
              {/* Achievement Cards - Redesigned */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {/* First Achievement */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffac00] to-[#e69b00] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-[#ffac00]/20 to-[#ffac00]/5 backdrop-blur-sm p-6 rounded-2xl border border-[#ffac00]/30 h-full">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#ffac00] flex items-center justify-center shadow-lg"
                    >
                      <Award className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-white font-bold text-center text-lg leading-tight">
                      First in School History
                    </h4>
                    <p className="text-gray-400 text-center text-sm mt-2">from a CCI</p>
                  </div>
                </motion.div>
                
                {/* Second Achievement */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3191c2] to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-[#3191c2]/20 to-[#3191c2]/5 backdrop-blur-sm p-6 rounded-2xl border border-[#3191c2]/30 h-full">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#3191c2] flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-white font-bold text-center text-lg leading-tight">
                      Circumstances Don't Define Potential
                    </h4>
                    <p className="text-gray-400 text-center text-sm mt-2">proof of resilience</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 3: From CCI to USA */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle, #ffac00 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#3191c2]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ffac00]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Story Number Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-dashed border-[#ffac00]/30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-black text-[#ffac00]">03</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
            {/* Content Side - Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ffac00]/10 to-[#3191c2]/10 text-[#3191c2] font-bold tracking-widest text-xs uppercase mb-6 border border-[#3191c2]/20">
                <Plane className="w-4 h-4" />
                Dream Achieved
              </span>
              
              <h2 className="text-4xl md:text-5xl font-heading font-black text-gray-900 mb-6 leading-tight">
                From CCI to{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3191c2] to-cyan-400">USA</span>
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -top-2 -right-6"
                  >
                    <span className="text-2xl">🇺🇸</span>
                  </motion.div>
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                The incredible journey of <strong className="text-[#ffac00]">Satish</strong> from a Child Care Institution 
                in Vizag to living his dream in the United States of America.
              </p>
              
              {/* Journey Steps */}
              <div className="space-y-4 mb-8">
                {[
                  { place: "Vizag CCI", label: "Where it began", color: "#ffac00" },
                  { place: "Bangalore", label: "Career launch", color: "#3191c2" },
                  { place: "USA", label: "Dream realized", color: "#22c55e" }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
                      style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}40` }}
                    >
                      <span className="text-xl font-black" style={{ color: step.color }}>{idx + 1}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-900">{step.place}</h4>
                      <p className="text-gray-500 text-sm">{step.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Volunteer Recognition */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl">
                <p className="text-gray-200 leading-relaxed">
                  <span className="text-[#ffac00] font-bold">Kudos to our volunteers</span> like{" "}
                  <span className="text-[#3191c2] font-bold">Sharukh</span>, who dedicated countless hours 
                  mentoring Satish—helping him build his career from Vizag to Bangalore, and ultimately 
                  supporting his dream of reaching the USA.
                </p>
              </div>
            </motion.div>
            
            {/* Video Side - Right (Mobile View) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative max-w-[320px]">
                {/* Decorative Frame */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[#3191c2] z-10"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-[#ffac00] z-10"
                />
                
                {/* Video Container - Vertical Phone Style */}
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl bg-black cursor-pointer group border-4 border-white/20 aspect-[9/16]"
                  onClick={() => playVideoWithSound('story3')}
                >
                  <video
                    ref={story3VideoRef}
                    src={satishVideo}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  />
                  {activeVideo !== 'story3' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                        <Volume2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Name Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-3 rounded-xl z-10">
                  <p className="font-bold text-white text-sm">Satish</p>
                  <p className="text-xs text-gray-300">From Vizag CCI to USA</p>
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow-xl border border-gray-100 whitespace-nowrap"
                >
                  <span className="font-bold text-[#ffac00] text-sm">Dream Achieved!</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#ffac00] to-[#e69b00] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),transparent_60%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-6">
              Be Part of the Next Story
            </h2>
            <p className="text-xl text-black/70 mb-8 max-w-2xl mx-auto">
              Every donation, every volunteer hour, every moment of mentorship creates ripples that can change a life forever.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/donate"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:bg-slate-800 transition-all"
              >
                <Heart className="w-5 h-5" /> Donate Now
              </a>
              <a 
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold py-4 px-8 rounded-full shadow-xl hover:bg-gray-100 transition-all"
              >
                <Users className="w-5 h-5" /> Become a Volunteer
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
