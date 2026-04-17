import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Heart, Handshake, Users, Phone, Mail, MapPin, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/Logos-2_1766126722043.png";

export function FloatingCTAs() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimized(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const showExpanded = !isMinimized || isHovered;

  return (
    <div 
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3 p-1 md:p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        whileHover={{ x: -5 }} 
        initial={{ x: 100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1, width: showExpanded ? 192 : 48 }} 
        transition={{ delay: 0.5, width: { duration: 0.3 } }}
      >
        <Link href="/donate">
          <Button size="lg" className="shadow-lg bg-primary/80 hover:bg-primary text-white border-l-4 border-white/80 font-bold rounded-l-full rounded-r-none h-12 md:h-14 animate-float backdrop-blur-sm transition-all duration-300 overflow-hidden whitespace-nowrap" style={{ width: showExpanded ? 192 : 48 }}>
            <Heart className="h-5 w-5 fill-current shrink-0" />
            <span className={`ml-2 transition-opacity duration-300 ${showExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Donate Now!</span>
          </Button>
        </Link>
      </motion.div>
      
      <motion.div 
        whileHover={{ x: -5 }} 
        initial={{ x: 100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1, width: showExpanded ? 192 : 48 }} 
        transition={{ delay: 0.7, width: { duration: 0.3 } }}
      >
        <Link href="/volunteer">
          <Button size="lg" className="shadow-lg bg-accent/80 hover:bg-accent text-accent-foreground border-l-4 border-white/80 font-bold rounded-l-full rounded-r-none h-12 md:h-14 animate-float backdrop-blur-sm transition-all duration-300 overflow-hidden whitespace-nowrap" style={{ width: showExpanded ? 192 : 48, animationDelay: "0.4s" }}>
            <Users className="h-5 w-5 shrink-0" />
            <span className={`ml-2 transition-opacity duration-300 ${showExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Volunteering</span>
          </Button>
        </Link>
      </motion.div>
      
      <motion.div 
        whileHover={{ x: -5 }} 
        initial={{ x: 100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1, width: showExpanded ? 192 : 48 }} 
        transition={{ delay: 0.9, width: { duration: 0.3 } }}
      >
        <Link href="/partner-with-us">
          <Button size="lg" className="shadow-lg bg-[#ffac00]/90 hover:bg-[#ffac00] text-black border-l-4 border-white/80 font-bold rounded-l-full rounded-r-none h-12 md:h-14 animate-float backdrop-blur-sm transition-all duration-300 overflow-hidden whitespace-nowrap" style={{ width: showExpanded ? 192 : 48, animationDelay: "0.8s" }}>
            <Handshake className="h-5 w-5 shrink-0" />
            <span className={`ml-2 transition-opacity duration-300 ${showExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>Partner with us!</span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/CCI-programs", label: "CCI Programs" },
    { href: "/School-AI-program", label: "Schools-AI Program" },
    { href: "/impact", label: "Impact Stories" },
    { href: "/volunteer", label: "Volunteering" },
    { href: "/leadership", label: "Leadership" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/">
          <span className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <img 
                src={logo} 
                alt="HUManity Foundation" 
                className="h-20 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(49,145,194,0.3)]" 
              />
            </div>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`text-[15px] font-bold transition-all duration-300 hover:text-primary relative py-1 cursor-pointer group/link ${location === link.href ? "text-primary" : "text-gray-600"}`}>
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${location === link.href ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"}`} />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/donate">
            <Button className="font-black rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95">
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span onClick={() => setIsOpen(false)} className={`text-lg font-semibold cursor-pointer ${location === link.href ? "text-primary" : "text-gray-600"}`}>
                      {link.label}
                    </span>
                  </Link>
                ))}
                <Link href="/donate">
                  <Button className="w-full font-bold" onClick={() => setIsOpen(false)}>Donate Now</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">HUManity</h3>
            <p className="text-blue-100 mb-6">
              Empowering children through holistic education, digital literacy, and emotional support. Building a brighter future, one child at a time.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/humanity_uplifting_mankind/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram /></a>
              <a href="https://in.linkedin.com/company/humanity-uplifting-mankind" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><span className="hover:text-accent transition-colors cursor-pointer">Home</span></Link></li>
              <li><Link href="/CCI-programs"><span className="hover:text-accent transition-colors cursor-pointer">CCI Programs</span></Link></li>
              <li><Link href="/School-AI-program"><span className="hover:text-accent transition-colors cursor-pointer">Schools-AI Program</span></Link></li>
              <li><Link href="/impact"><span className="hover:text-accent transition-colors cursor-pointer">Impact Stories</span></Link></li>
              <li><Link href="/volunteer"><span className="hover:text-accent transition-colors cursor-pointer">Volunteering</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Get Involved</h4>
            <ul className="space-y-2">
              <li><Link href="/donate"><span className="hover:text-accent transition-colors cursor-pointer">Donate</span></Link></li>
              <li><Link href="/volunteer"><span className="hover:text-accent transition-colors cursor-pointer">Volunteer</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span>GF1, Kranti Nivas 2, PM Palem, Visakhapatnam 530041</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>+91 99129 62885</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>contact@humanityorg.foundation</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {new Date().getFullYear()} HUManity Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const showFloatingCTAs = location !== "/donate"; // Hide floating CTAs on donate page to reduce distraction

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {showFloatingCTAs && <FloatingCTAs />}
    </div>
  );
}
