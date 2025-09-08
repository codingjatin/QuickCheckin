'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail, Phone, MapPin, Clock, Send, Home } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-off-white border-sage/20 text-center">
          <CardContent className="pt-8">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-deep-brown" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Message Sent!</h2>
            <p className="text-charcoal/70 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Link href="/">
              <Button className="bg-deep-brown hover:bg-deep-brown/90 text-off-white">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Navigation */}
      <nav className="border-b border-sage/20 bg-off-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/QuickCheck.svg"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-charcoal">
                QuickCheck
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/">
                <Button variant="outline" className="border-sage text-charcoal hover:bg-sage/10">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Ready to transform your restaurant's waitlist experience? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <Card className="bg-off-white border-sage/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-deep-brown/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-deep-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Email Us</h3>
                      <p className="text-charcoal/70">hello@quickcheck.com</p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/60">
                    We typically respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-off-white border-sage/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-deep-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Call Us</h3>
                      <p className="text-charcoal/70">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/60">
                    Monday to Friday, 9 AM - 6 PM EST
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-off-white border-sage/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-deep-brown/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-deep-brown" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Visit Us</h3>
                      <p className="text-charcoal/70">Toronto, ON, Canada</p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/60">
                    Schedule a meeting at our office
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-deep-brown text-off-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-off-white/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-off-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Quick Response</h3>
                      <p className="text-off-white/80">Average response time: 2 hours</p>
                    </div>
                  </div>
                  <p className="text-sm text-off-white/70">
                    Our team is committed to helping you succeed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-off-white border-sage/20">
              <CardHeader>
                <CardTitle className="text-2xl text-charcoal">Send us a Message</CardTitle>
                <CardDescription className="text-charcoal/70">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-charcoal font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-2 border-sage focus:ring-deep-brown"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-charcoal font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 border-sage focus:ring-deep-brown"
                        placeholder="john@restaurant.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className="text-charcoal font-medium">
                        Restaurant/Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-2 border-sage focus:ring-deep-brown"
                        placeholder="Bella Vista Restaurant"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-charcoal font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-2 border-sage focus:ring-deep-brown"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-charcoal font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-2 border-sage focus:ring-deep-brown"
                      placeholder="Interested in QuickCheck for my restaurant"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-charcoal font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="mt-2 border-sage focus:ring-deep-brown"
                      placeholder="Tell us about your restaurant and how we can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-deep-brown hover:bg-deep-brown/90 text-off-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-off-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal/70">
              Quick answers to common questions about QuickCheck
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can we get started?",
                answer: "Most restaurants are up and running within 24-48 hours. We provide full setup support and training."
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required."
              },
              {
                question: "What kind of support do you provide?",
                answer: "We offer 24/7 email support, phone support during business hours, and comprehensive documentation."
              },
              {
                question: "Can QuickCheck integrate with our POS system?",
                answer: "Yes, we integrate with most major POS systems. Contact us to discuss your specific requirements."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-off-white border-sage/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-charcoal mb-3">{faq.question}</h3>
                  <p className="text-charcoal/70">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}