import { useState } from "react";
import { MessageCircle, Heart, Handshake, Users, Phone, X, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919876543210"; // Dummy number for mockup

  const options = [
    { 
      label: "I want to Volunteer", 
      icon: Users, 
      message: "Hi! I'm interested in volunteering with HUManity. Can you guide me?",
      color: "bg-blue-100 text-blue-600"
    },
    { 
      label: "Partnership Inquiry", 
      icon: Handshake, 
      message: "Hello, I'd like to discuss partnership opportunities with HUManity.",
      color: "bg-purple-100 text-purple-600"
    },
    { 
      label: "Make a Donation", 
      icon: Heart, 
      message: "Hi! I want to support your cause. How can I donate?",
      color: "bg-red-100 text-red-600"
    },
    { 
      label: "Talk to Leadership", 
      icon: User, 
      message: "Hello, I wish to connect with the leadership team regarding...",
      color: "bg-orange-100 text-orange-600"
    },
  ];

  const handleOptionClick = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            size="icon" 
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20b858] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 flex items-center justify-center"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <WhatsAppIcon className="w-8 h-8 text-white" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end" 
          className="w-80 p-0 border-none shadow-2xl rounded-2xl overflow-hidden mb-2"
        >
          <div className="bg-[#128C7E] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                 <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">HUManity Assistant</h3>
                <p className="text-xs text-blue-100">Typically replies instantly</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4">
            <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none mb-4 text-sm text-gray-700 max-w-[90%]">
              Hello! 👋 How can we help you create an impact today?
            </div>
            
            <div className="space-y-2">
              {options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleOptionClick(option.message)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left group"
                >
                  <div className={`p-2 rounded-lg ${option.color}`}>
                    <option.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-grow">{option.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
             <span className="text-[10px] text-gray-400">Powered by HUManity Tech</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
