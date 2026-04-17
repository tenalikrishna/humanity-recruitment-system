import { API_BASE } from "@/lib/queryClient";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import insta1 from "@assets/stock_images/instagram_post_squar_2a9a3182.jpg";
import insta2 from "@assets/stock_images/instagram_post_squar_9be6beaa.jpg";
import insta3 from "@assets/stock_images/instagram_post_squar_b504fb39.jpg";
import insta4 from "@assets/stock_images/instagram_post_squar_e373d80e.jpg";
import volunteerHero from "@assets/SRI_4023_1766970878505.jpg";
const volunteerVideo = "/videos/volunteer-intro.mp4";
const pradeepVideo = "/videos/pradeep-story.mp4";
import firstTrainingImage from "@assets/Gemini_Generated_Image_jqohowjqohowjqoh_1766983869045.png";
import galleryImg1 from "@assets/_SAA0424_1767167802826.jpg";
import galleryImg2 from "@assets/_SAA0494_1767167802826.jpg";
import galleryImg3 from "@assets/_SAA0877_1767167802826.jpg";
import galleryImg4 from "@assets/_SAA0977_1767167802826.jpg";
import galleryImg5 from "@assets/_SAA1063_1767167802826.jpg";
import galleryImg6 from "@assets/_SAA1208_1767167802826.jpg";
import galleryImg7 from "@assets/_SAA1219_1767167802826.jpg";
import galleryImg8 from "@assets/_SAA1434_1767167802826.jpg";
import galleryImg9 from "@assets/5_(2)_1767167802826.jpg";
import galleryImg10 from "@assets/5_1767167802826.jpg";
import galleryImg11 from "@assets/6_1767167802826.jpg";
import galleryImg12 from "@assets/Aug1_PSH4_1767167802826.jpg";
import galleryImg13 from "@assets/Aug1_PSH5_1767167802826.jpg";
import galleryImg14 from "@assets/Aug1_PSH7_1767167802826.jpg";
import galleryImg15 from "@assets/Aug1_PSH9_1767167802826.jpg";
import galleryImg16 from "@assets/Aug1_PSH13_1767167802826.jpg";
import galleryImg17 from "@assets/Exposure_1_1767167802826.jpg";
import galleryImg18 from "@assets/Exposure_2_1767167802826.jpg";
import galleryImg19 from "@assets/Exposure_3_1767167802826.jpg";
import galleryImg20 from "@assets/Exposure_5_1767167802826.jpg";
import { Heart, Sparkles, Users, ArrowRight, CheckCircle2, Instagram, X, Camera } from "lucide-react";

const galleryImages = [
  galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5,
  galleryImg6, galleryImg7, galleryImg8, galleryImg9, galleryImg10,
  galleryImg11, galleryImg12, galleryImg13, galleryImg14, galleryImg15,
  galleryImg16, galleryImg17, galleryImg18, galleryImg19, galleryImg20,
];
import { useRef, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const volunteerFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(2, "Current city is required"),
  dob: z.string().min(1, "Date of birth is required"),
  occupation: z.string().min(2, "Occupation details are required"),
  volunteerType: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one option",
  }),
  projects: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one project",
  }),
});

export default function VolunteerPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const pradeepVideoRef = useRef<HTMLVideoElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        
        if (entry.isIntersecting) {
          // Play current video with sound
          video.muted = false;
          video.play().catch(e => console.log("Autoplay prevented:", e));
          
          // Pause the other video
          if (video === videoRef.current && pradeepVideoRef.current) {
            pradeepVideoRef.current.pause();
          } else if (video === pradeepVideoRef.current && videoRef.current) {
            videoRef.current.pause();
          }
        } else {
          // Pause when out of view
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.6
    });

    if (videoRef.current) observer.observe(videoRef.current);
    if (pradeepVideoRef.current) observer.observe(pradeepVideoRef.current);
    return () => observer.disconnect();
  }, []);

  const form = useForm<z.infer<typeof volunteerFormSchema>>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      dob: "",
      occupation: "",
      volunteerType: [],
      projects: [],
    },
  });

  async function onSubmit(data: z.infer<typeof volunteerFormSchema>) {
    try {
      const response = await fetch(`${API_BASE}/api/forms/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: "Registration Successful!",
          description: "Thank you for volunteering. We will contact you soon.",
        });
        form.reset();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={volunteerHero} 
            alt="HUManity Stakeholder Conference 2025" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        
        {/* Multi-layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3191c2]/30 via-transparent to-[#ffac00]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        
        {/* Animated Accent Lines */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffac00] via-[#3191c2] to-[#ffac00] origin-left"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#ffac00] font-bold tracking-widest text-sm uppercase">
                Join Our Family
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-8xl font-heading font-black text-white mb-8 leading-[0.9] drop-shadow-2xl"
            >
              Become a{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3191c2] via-cyan-400 to-[#3191c2] animate-pulse">HUManitarian</span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#ffac00] to-[#3191c2]"
                />
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg mb-10"
            >
              Volunteering at HUManity isn't just about giving time; it's about shaping futures, building lasting bonds, and being part of a culture that celebrates kindness and growth.
            </motion.p>

            {/* Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="bg-[#ffac00] hover:bg-[#e69b00] text-black font-bold py-6 px-10 text-lg rounded-full shadow-2xl transform transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,172,0,0.4)]"
                data-testid="button-signup-volunteering"
              >
                Sign up for Volunteering! <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            
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
                <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                  <motion.div 
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ffac00]"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture Section - Stunning CCI-Style Layout */}
      <section className="bg-[#ffac00] py-20 relative overflow-hidden">
        {/* Background Gradients & Lighting Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(49,145,194,0.2),transparent_50%)]" />
        
        {/* Animated Pulse Effect */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[100px] rounded-full pointer-events-none"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-black w-full max-w-[360px] border-4 border-white/30 aspect-[9/16]"
              >
                <video
                  ref={videoRef}
                  src={volunteerVideo}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  muted
                  preload="metadata"
                />
                
                {/* Decorative Glow */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full" />
              </motion.div>
            </div>

            {/* Right Side: Heading & 6 Pointers */}
            <div className="md:col-span-7 text-white space-y-8">
              
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold tracking-widest text-sm uppercase mb-4 border border-white/30">
                  What You Get
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-4 leading-[0.95] drop-shadow-lg">
                  More Than Just <br/>
                  <span className="text-slate-900">Volunteering</span>
                </h2>
                <p className="text-lg text-white/90 max-w-lg leading-relaxed">
                  Join a community that invests in your growth while you invest in changing lives.
                </p>
              </motion.div>

              {/* 6 Pointers - Stunning Animated Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  "Certificate of Volunteering",
                  "Leadership Opportunities",
                  "Skill Development Workshops",
                  "Networking with Changemakers",
                  "Letter of Recommendation",
                  "Lifetime of Memories"
                ].map((perk, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: idx * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 80
                    }}
                    className="relative group"
                  >
                    {/* Animated Background Card */}
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(49,145,194,0)",
                          "0 0 30px rgba(49,145,194,0.4)",
                          "0 0 0 rgba(49,145,194,0)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border-2 border-[#3191c2]/50"
                    />
                    
                    {/* Content */}
                    <div className="relative p-5 flex items-center gap-4">
                      {/* Animated Icon Container */}
                      <div className="relative flex-shrink-0">
                        {/* Rotating Ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 rounded-full border-2 border-dashed border-[#3191c2]/60"
                        />
                        {/* Pulsing Center */}
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
                          className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-[#3191c2] shadow-[0_0_20px_rgba(49,145,194,0.8)]"
                        />
                        {/* Number Badge */}
                        <span className="absolute inset-0 m-auto w-6 h-6 flex items-center justify-center text-white font-black text-sm">
                          {idx + 1}
                        </span>
                      </div>
                      
                      {/* Text in Blue Bold */}
                      <span className="font-black text-[#3191c2] text-lg md:text-xl leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        {perk}
                      </span>
                    </div>
                    
                    {/* Corner Accent */}
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#3191c2] rounded-tr-2xl"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Voice - Full-Width Video Section */}
      <section className="relative bg-slate-900 py-16 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(49,145,194,0.15),transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,172,0,0.1),transparent_50%)]"
        />
        
        {/* Decorative Corner Elements */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-8 left-8 w-24 h-24 border-l-4 border-t-4 border-[#ffac00] z-10"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-8 right-8 w-24 h-24 border-r-4 border-b-4 border-[#3191c2] z-10"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-4">
              Volunteer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] via-orange-400 to-[#3191c2]">Voice</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hear directly from our volunteers about their transformative journey with HUManity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-4 border-white/10 aspect-video"
          >
            <video
              ref={pradeepVideoRef}
              src={pradeepVideo}
              className="w-full h-full object-cover"
              controls
              playsInline
              muted
              preload="metadata"
            />
          </motion.div>

        </div>

        {/* Bottom Accent Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffac00] via-[#3191c2] to-[#ffac00] origin-left"
        />
      </section>

      {/* First Training Image - Separate Section */}
      <section className="py-20 bg-gradient-to-b from-slate-100 to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ffac00]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3191c2]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Section Title */}
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-2 rounded-full bg-[#ffac00]/10 text-[#ffac00] font-bold tracking-widest text-sm uppercase mb-4 border border-[#ffac00]/20">
                Where It All Began
              </span>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img 
                src={firstTrainingImage} 
                alt="First HUManitarian Training - 19th Jan 2020" 
                className="w-full h-auto object-cover"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-4 max-w-3xl">
                    Picture from the first training that took place today where HUManitarians were inducted and got upskilled to achieve the vision
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-[#ffac00] rounded-full" />
                    <span className="text-[#ffac00] font-bold text-base uppercase tracking-wider">
                      19th Jan 2020
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volunteer Photo Gallery - Horizontal Scroll */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3191c2]/10 text-[#3191c2] font-bold tracking-widest text-xs uppercase mb-3 border border-[#3191c2]/20">
              <Camera className="w-4 h-4" />
              Our Volunteers in Action
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-gray-900">
              Moments That <span className="text-[#ffac00]">Matter</span>
            </h2>
          </motion.div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-6 px-4 scrollbar-thin scrollbar-thumb-[#ffac00] scrollbar-track-gray-200 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin' }}>
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="flex-shrink-0 snap-center group"
              >
                <div className="relative w-64 h-48 md:w-72 md:h-56 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white">
                  <img 
                    src={src} 
                    alt={`Volunteer activity ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Hint */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-400"
            >
              <ArrowRight className="w-8 h-8" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#3191c2] to-[#2580b0] p-4 text-center">
            <DialogTitle className="text-white text-2xl font-bold">Sign up for Volunteering!</DialogTitle>
            <p className="text-white/80 text-sm mt-1">Join our next cohort of changemakers</p>
          </div>
          
          <ScrollArea className="max-h-[calc(90vh-80px)] p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name Section */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Name</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="First Name" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Email <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Phone <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Current City <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Date of Birth <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </FormControl>
                      <FormDescription>dd-MMM-yyyy</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Occupation <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                      </FormControl>
                      <FormDescription>Detail of your study/ work/ current status</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Volunteer Type Checkboxes */}
                <FormField
                  control={form.control}
                  name="volunteerType"
                  render={() => (
                    <FormItem>
                      <div className="mb-3">
                        <FormLabel className="text-base font-semibold">I wish to volunteer online/offline <span className="text-red-500">*</span></FormLabel>
                      </div>
                      <div className="space-y-2">
                        {["Online", "On ground- Vizag", "On ground- Hyderabad"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="volunteerType"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-gray-700 cursor-pointer">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project Checkboxes */}
                <FormField
                  control={form.control}
                  name="projects"
                  render={() => (
                    <FormItem>
                      <div className="mb-3">
                        <FormLabel className="text-base font-semibold">Choose the project you wish to volunteer for <span className="text-red-500">*</span></FormLabel>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Education support",
                          "Social Emotional Learning",
                          "Digital Literacy & AI",
                          "Health, nutrition and mental well-being",
                          "Library project",
                          "Fundraising",
                          "Technical Support"
                        ].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="projects"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-gray-700 cursor-pointer">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 pb-2">
                  <Button type="submit" size="lg" className="w-full bg-[#ffac00] hover:bg-[#e69b00] text-black font-bold py-5 text-lg rounded-full shadow-lg transform transition-all hover:-translate-y-1">
                    Submit Application <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
