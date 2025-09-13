import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, CheckCircle, RefreshCw, Loader2 } from "lucide-react";
import { getPageContent } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";

interface ContactFormContent {
  fields: Record<string, { label: string; placeholder: string }>;
  eventTypes: string[];
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  emailSubject: string;
  errors: { generic: string; network: string };
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/hello@doughandbeats.co.uk", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setIsSubmitted(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      guestCount: "",
      message: ""
    });
    setIsSubmitted(false);
  };

  const content = getPageContent('contact');
  const header = content?.header as { title: string; subtitle: string } | undefined;
  const formText = content?.form as ContactFormContent | undefined;
  const emailCta = content?.emailCta as { heading: string; email: string } | undefined;
  usePageMeta(content?.meta.title, content?.meta.description);

  return (
    <div className="bg-brand-cream pt-20">
      {/* Page Header */}
      <header className="py-16 md:py-24 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter">{header?.title}</h1>
          <p className="mt-4 text-xl md:text-2xl text-brand-black/80 max-w-3xl mx-auto">{header?.subtitle}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-brand-tomato mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-brand-tomato mb-4">{formText?.successTitle}</h3>
                  <p className="text-lg text-brand-black/80 mb-8">{formText?.successBody}</p>
                  <Button onClick={handleReset} variant="outline" className="text-brand-tomato border-brand-tomato hover:bg-brand-tomato/10 hover:text-brand-tomato">
                    <RefreshCw className="mr-2 h-4 w-4" /> {formText?.sendAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value={formText?.emailSubject} />
                  <input type="text" name="_honey" style={{ display: 'none' }} />

                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="name" className="text-lg font-semibold text-brand-tomato">{formText?.fields?.name?.label}</Label>
                        <Input 
                          id="name" 
                          name="name"
                          type="text" 
                          placeholder={formText?.fields?.name?.placeholder}
                          required 
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="mt-2 text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-lg font-semibold text-brand-tomato">{formText?.fields?.email?.label}</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder={formText?.fields?.email?.placeholder}
                          required 
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="mt-2 text-lg p-6"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="phone" className="text-lg font-semibold text-brand-tomato">{formText?.fields?.phone?.label}</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          placeholder={formText?.fields?.phone?.placeholder}
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="mt-2 text-lg p-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestCount" className="text-lg font-semibold text-brand-tomato">{formText?.fields?.guestCount?.label}</Label>
                        <Input 
                          id="guestCount" 
                          name="guestCount"
                          type="number" 
                          placeholder={formText?.fields?.guestCount?.placeholder}
                          required 
                          value={formData.guestCount}
                          onChange={(e) => handleChange('guestCount', e.target.value)}
                          className="mt-2 text-lg p-6"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventType" className="text-lg font-semibold text-brand-tomato">{formText?.fields?.eventType?.label}</Label>
                      <Select 
                        name="eventType"
                        required
                        onValueChange={(value) => handleChange('eventType', value)}
                        value={formData.eventType}
                      >
                        <SelectTrigger className="mt-2 text-lg h-auto p-3">
                          <SelectValue placeholder={formText?.fields?.eventType?.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {formText?.eventTypes?.map((t: string) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-lg font-semibold text-brand-tomato">{formText?.fields?.message?.label}</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder={formText?.fields?.message?.placeholder}
                        required 
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="mt-2 text-lg p-4"
                      />
                    </div>

                    <div className="text-center">
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-brand-tomato hover:bg-brand-tomato/90 text-white font-bold text-xl rounded-full px-12 py-8"
                      >
                        {isSubmitting ? (<><Loader2 className="mr-2 h-6 w-6 animate-spin" /> {formText?.submitting}</>) : formText?.submit }
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold text-brand-tomato mb-4">{emailCta?.heading}</h3>
              <a href={`mailto:${emailCta?.email}`} className="inline-flex items-center gap-3 text-lg text-brand-black hover:text-brand-tomato transition-colors">
                <Mail className="h-6 w-6 text-brand-tomato" />
                {emailCta?.email}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

