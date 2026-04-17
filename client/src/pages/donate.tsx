import { API_BASE } from "@/lib/queryClient";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Heart, Download, ArrowRight, Sparkles, Users, GraduationCap, Utensils, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonationPage() {
  const [amount, setAmount] = useState("1500");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentSuccess(false);
    setReceiptUrl("");

    try {
      const finalAmount = Number(customAmount || amount);
      
      if (!name || !email || !phone || !idType || !idNumber) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields including ID proof",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const orderResponse = await fetch(`${API_BASE}/api/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: `${countryCode}${phone}`,
          amount: finalAmount,
          idType,
          idNumber,
          donationType,
        }),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.json();
        throw new Error(error.error || "Failed to create order");
      }

      const orderData = await orderResponse.json();

      // Build Razorpay options based on payment type (one-time vs subscription)
      const isSubscription = orderData.isSubscription;
      
      const options: any = {
        key: orderData.razorpayKeyId || "rzp_test_dummy",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HUManity Foundation",
        description: isSubscription ? "Monthly Donation Subscription" : "Donation",
        image: "/attached_assets/logo-placeholder.png",
        handler: async function (response: any) {
          try {
            // Use different verification endpoint for subscriptions
            const verifyEndpoint = isSubscription 
              ? `${API_BASE}/api/donations/verify-subscription` 
              : `${API_BASE}/api/donations/verify-payment`;
            
            const verifyBody = isSubscription 
              ? {
                  razorpay_subscription_id: response.razorpay_subscription_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  donation_id: orderData.donationId,
                }
              : {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  donation_id: orderData.donationId,
                };

            const verifyResponse = await fetch(verifyEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(verifyBody),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              setPaymentSuccess(true);
              setReceiptUrl(verifyData.receiptUrl);
              toast({
                title: "Thank You!",
                description: isSubscription 
                  ? "Your monthly donation subscription is now active. Download your receipt below."
                  : "Your donation was successful. Download your receipt below.",
              });
            } else {
              toast({
                title: "Verification Failed",
                description: verifyData.error || "Payment verification failed. Please contact support.",
                variant: "destructive",
              });
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to verify payment",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name,
          email,
          contact: `${countryCode}${phone}`,
        },
        theme: {
          color: "#3191c2",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Add subscription_id or order_id based on payment type
      if (isSubscription) {
        options.subscription_id = orderData.subscriptionId;
      } else {
        options.order_id = orderData.orderId;
      }

      if (typeof window.Razorpay === 'undefined') {
        throw new Error("Payment gateway not loaded. Please refresh the page and try again.");
      }
      
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment could not be completed. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      });
      
      // For subscriptions, add a small delay to ensure the modal is fully initialized
      if (isSubscription) {
        setTimeout(() => {
          rzp.open();
        }, 100);
      } else {
        rzp.open();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section - Cinematic & Emotional */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3191c2]/20 via-transparent to-[#ffac00]/20" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "100vh" }}
              animate={{ opacity: [0, 1, 0], y: "-100vh" }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-[#ffac00]/20 backdrop-blur-sm border border-[#ffac00]/30 text-[#ffac00] font-bold tracking-widest text-sm uppercase mb-6">
                Change a Life Today
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-8xl font-heading font-black text-white mb-8 leading-[0.9]"
            >
              Every Child{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] via-orange-400 to-[#ffac00]">Deserves</span>
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3191c2] to-cyan-400">A Chance</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Your donation isn't just money. It's hope. It's education. It's a future that a child in a care home never dared to dream of.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="bg-[#ffac00] hover:bg-[#e69b00] text-black font-bold py-7 px-12 text-xl rounded-full shadow-[0_20px_50px_rgba(255,172,0,0.4)] transform transition-all hover:-translate-y-1"
                data-testid="button-donate-hero"
              >
                Donate Now <Heart className="ml-2 w-6 h-6 fill-current" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffac00] via-[#3191c2] to-[#ffac00] origin-left"
        />
      </section>
      {/* Sponsor a Child Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#ffac00] via-[#ffb820] to-[#ffc940] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(0,0,0,0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-white flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.2)]">
                  <Heart className="w-16 h-16 md:w-20 md:h-20 text-[#ffac00] fill-[#ffac00]" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-7xl font-heading font-black text-black mb-6 leading-tight">
                <span className="text-white drop-shadow-lg">₹1,500</span>/month
              </h2>
              
              <p className="text-xl md:text-2xl text-black/80 font-medium mb-8">
                Sponsor One Child's Complete Holistic Development
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
                {[
                  { icon: Utensils, label: "Nutrition" },
                  { icon: GraduationCap, label: "Education" },
                  { icon: Heart, label: "Healthcare" },
                  { icon: Sparkles, label: "Emotional Care" },
                  { icon: Users, label: "Life Skills" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10"
                  >
                    <item.icon className="w-4 h-4 text-black" />
                    <span className="text-black text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => { setAmount("1500"); setIsFormOpen(true); }}
                  size="lg"
                  className="bg-black hover:bg-gray-900 text-white font-black py-8 px-14 text-xl md:text-2xl rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  data-testid="button-sponsor-child"
                >
                  Sponsor a Child Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Tax Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#3191c2] to-[#2580b0] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">50% Tax Deductible</h2>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                All donations to HUManity Foundation are eligible for tax exemption under <strong>Section 80G</strong> of the Income Tax Act, 1961. Your generosity not only transforms lives but also provides you with tax benefits.
              </p>
              <Button 
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="bg-white text-[#3191c2] hover:bg-gray-100 font-bold py-6 px-10 text-lg rounded-full shadow-xl"
              >
                Start Giving Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,172,0,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
              Be the Reason Someone{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffac00] to-orange-400">Smiles</span> Today
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join hundreds of donors who have already changed lives. Every contribution, no matter how small, creates ripples of hope.
            </p>
            <Button 
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-[#ffac00] hover:bg-[#e69b00] text-black font-bold py-7 px-12 text-xl rounded-full shadow-[0_20px_50px_rgba(255,172,0,0.3)]"
            >
              Make a Donation <Heart className="ml-2 w-6 h-6 fill-current" />
            </Button>
          </motion.div>
        </div>
      </section>
      {/* Donation Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#ffac00] to-[#e69b00] p-4 text-center">
            <DialogTitle className="text-black text-2xl font-bold">Make a Donation</DialogTitle>
            <p className="text-black/70 text-sm mt-1">Your support transforms lives</p>
          </div>
          
          <ScrollArea className="max-h-[calc(90vh-80px)] p-6">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-green-700 mb-4">Thank You!</h2>
                <p className="text-gray-600 mb-6">
                  Your donation has been received successfully. Your support will help transform lives.
                </p>
                <div className="space-y-4">
                  <a 
                    href={receiptUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 w-full h-14 text-lg font-bold bg-[#ffac00] hover:bg-[#e69b00] text-black shadow-lg rounded-xl"
                    data-testid="button-download-receipt"
                  >
                    <Download className="w-5 h-5" />
                    Download Receipt (PDF)
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12"
                    onClick={() => {
                      setPaymentSuccess(false);
                      setReceiptUrl("");
                      setName("");
                      setEmail("");
                      setPhone("");
                      setIdType("");
                      setIdNumber("");
                      setAmount("1500");
                      setCustomAmount("");
                    }}
                    data-testid="button-donate-again"
                  >
                    Make Another Donation
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleDonate}>
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Choose Donation Type</Label>
                  <RadioGroup value={donationType} onValueChange={setDonationType} className="grid grid-cols-2 gap-3">
                    <div>
                      <RadioGroupItem value="once" id="once" className="peer sr-only" />
                      <Label
                        htmlFor="once"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#ffac00] peer-data-[state=checked]:bg-[#ffac00]/10 cursor-pointer transition-all"
                      >
                        <span className="font-bold">Give Once</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                      <Label
                        htmlFor="monthly"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#ffac00] peer-data-[state=checked]:bg-[#ffac00]/10 cursor-pointer transition-all"
                      >
                        <span className="font-bold">Give Monthly</span>
                        <span className="text-xs text-[#ffac00] font-semibold">Most Impactful</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Amount (₹)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["500", "1500", "3000", "5000", "10000"].map((val) => (
                      <Button
                        key={val}
                        type="button"
                        variant={amount === val ? "default" : "outline"}
                        className={`h-11 text-base ${amount === val ? "bg-[#ffac00] hover:bg-[#e69b00] text-black" : "border-gray-300"}`}
                        onClick={() => { setAmount(val); setCustomAmount(""); }}
                      >
                        ₹{val}
                      </Button>
                    ))}
                    <Input 
                      placeholder="Custom" 
                      type="number"
                      className="h-11 text-center" 
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-gray-900">Personal Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name (as per ID) *</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex gap-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        id="phone" 
                        placeholder="9876543210" 
                        className="flex-1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Proof Type *</Label>
                    <Select value={idType} onValueChange={setIdType} required>
                      <SelectTrigger data-testid="select-id-type">
                        <SelectValue placeholder="Select ID Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pan">PAN Card</SelectItem>
                        <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                        <SelectItem value="ration">Ration Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">
                      {idType === "pan" ? "PAN Number" : idType === "aadhaar" ? "Aadhaar Number" : idType === "ration" ? "Ration Card Number" : "ID Number"} *
                    </Label>
                    <Input 
                      id="idNumber" 
                      placeholder={idType === "pan" ? "ABCDE1234F" : idType === "aadhaar" ? "1234 5678 9012" : "Enter ID number"}
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                      required
                      data-testid="input-id-number"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-xl font-bold bg-[#ffac00] hover:bg-[#e69b00] text-black shadow-lg rounded-xl mt-4"
                >
                  {loading ? "Processing..." : `Donate ₹${customAmount || amount}`}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Secure payment powered by Razorpay. Tax-exempt under 80G.
                </p>
              </form>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
