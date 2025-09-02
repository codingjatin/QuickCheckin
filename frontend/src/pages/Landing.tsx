import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  MessageSquare, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  Monitor,
  Star,
  Shield,
  Zap,
  Globe,
  Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Landing: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Live waitlist updates with SMS notifications keep guests informed and reduce anxiety.',
    },
    {
      icon: Users,
      title: 'Smart Queue Management',
      description: 'Intelligent waitlist with estimated wait times and automated party size matching.',
    },
    {
      icon: MessageSquare,
      title: 'Two-Way SMS Communication',
      description: 'Automated notifications with customer responses to optimize table turnover.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive dashboard with performance metrics and operational insights.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with data encryption and compliance standards.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures smooth operations during peak hours.',
    },
  ];

  const benefits = [
    'Reduce guest wait anxiety with accurate time estimates',
    'Increase table turnover by 25% with efficient seating',
    'Improve customer satisfaction with transparent communication',
    'Streamline operations with automated workflows',
    'Eliminate no-shows with smart confirmation system',
    'Scale across multiple locations with centralized management',
  ];

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Restaurant Manager',
      restaurant: 'Bella Vista',
      content: 'QuickCheck transformed our operations. We reduced wait times by 30% and customer complaints by 90%.',
      rating: 5,
    },
    {
      name: 'James Chen',
      role: 'Owner',
      restaurant: 'Urban Kitchen',
      content: 'The SMS system is brilliant. Customers love the transparency and we love the efficiency.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-soft border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-xl p-2">
                <CheckCircle className="h-8 w-8 text-background" />
              </div>
              <div>
                <span className="text-2xl font-bold text-primary font-display">QuickCheck</span>
                <p className="text-xs text-muted/60 -mt-1">Restaurant Solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/admin" className="text-muted hover:text-primary transition-colors font-medium">
                Restaurant Login
              </Link>
              <Link to="/kiosk">
                <Button size="md" className="shadow-medium">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl sm:text-7xl font-bold text-muted mb-8 font-display leading-tight">
              Transform Your
              <span className="text-primary block">Restaurant Experience</span>
            </h1>
            <p className="text-xl text-muted/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Eliminate the chaos of traditional waitlists with our intelligent digital platform. 
              Real-time updates, SMS notifications, and smart table management that delights guests 
              and streamlines operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/kiosk">
                <Button size="lg" className="w-full sm:w-auto shadow-strong hover:shadow-medium transition-all duration-300 transform hover:scale-105">
                  <Smartphone className="h-5 w-5 mr-3" />
                  Try Customer Check-in
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-primary hover:text-background transition-all duration-300">
                  <Monitor className="h-5 w-5 mr-3" />
                  View Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Restaurants Served', value: '500+' },
              { label: 'Wait Time Reduced', value: '35%' },
              { label: 'Customer Satisfaction', value: '98%' },
              { label: 'No-Show Reduction', value: '60%' },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-muted mb-6 font-display">Powerful Features for Modern Restaurants</h2>
            <p className="text-xl text-muted/70 max-w-3xl mx-auto">Everything you need to create exceptional dining experiences</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-muted mb-4">{feature.title}</h3>
                <p className="text-muted/70 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-br from-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-muted mb-6 font-display">How QuickCheck Works</h2>
            <p className="text-xl text-muted/70">Simple setup, powerful results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Customer Check-In',
                description: 'Guests use the digital kiosk to join the waitlist with their party size and contact info.',
                icon: Smartphone,
              },
              {
                step: '02',
                title: 'Smart Notifications',
                description: 'Automated SMS alerts keep customers informed with real-time updates and confirmations.',
                icon: MessageSquare,
              },
              {
                step: '03',
                title: 'Seamless Seating',
                description: 'Staff manage tables efficiently with real-time dashboard updates and customer responses.',
                icon: Users,
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="bg-white rounded-2xl shadow-medium p-8 group-hover:shadow-strong transition-shadow duration-300">
                    <div className="bg-primary text-background rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                      {step.step}
                    </div>
                    <div className="bg-accent/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <step.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-muted mb-4">{step.title}</h3>
                    <p className="text-muted/70 leading-relaxed">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-muted mb-8 font-display">
                Why Leading Restaurants Choose QuickCheck
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="bg-success/10 rounded-full p-2 group-hover:bg-success/20 transition-colors duration-200">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <p className="text-muted/80 leading-relaxed font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/admin">
                  <Button size="lg" className="shadow-medium hover:shadow-strong transition-all duration-300">
                    Start Your Free Trial
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 shadow-medium">
                <div className="bg-white rounded-2xl shadow-soft p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-muted text-lg">Live Waitlist</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="bg-warning/20 text-warning px-3 py-1 rounded-full text-sm font-medium">8 waiting</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Johnson', party: 4, wait: '15 min', status: 'notified' },
                      { name: 'Mike Chen', party: 2, wait: '20 min', status: 'waiting' },
                      { name: 'Emily Rodriguez', party: 6, wait: '25 min', status: 'waiting' },
                    ].map((guest, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-muted">{guest.name}</p>
                          <p className="text-sm text-muted/60">Party of {guest.party}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-muted">{guest.wait}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            guest.status === 'notified' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'
                          }`}>
                            {guest.status === 'notified' ? 'Ready' : 'Waiting'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-success text-white rounded-full p-3 shadow-medium animate-bounce-soft">
                <MessageSquare className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-muted mb-6 font-display">Trusted by Restaurant Professionals</h2>
            <p className="text-xl text-muted/70">See what our customers are saying</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-muted/80 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-muted">{testimonial.name}</p>
                      <p className="text-sm text-muted/70">{testimonial.role}, {testimonial.restaurant}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-display">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl text-background/90 mb-10 leading-relaxed">
            Join hundreds of restaurants already using QuickCheck to create better dining experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/admin">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-medium">
                <Globe className="h-5 w-5 mr-3" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/kiosk">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-background text-background hover:bg-background hover:text-primary">
                <Smartphone className="h-5 w-5 mr-3" />
                See Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary rounded-xl p-2">
                  <CheckCircle className="h-6 w-6 text-background" />
                </div>
                <span className="text-2xl font-bold font-display">QuickCheck</span>
              </div>
              <p className="text-background/80 mb-6 leading-relaxed max-w-md">
                Streamlining restaurant operations with intelligent waitlist management 
                and exceptional customer experiences.
              </p>
              <div className="flex gap-4">
                <div className="bg-background/10 rounded-lg p-2">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="bg-background/10 rounded-lg p-2">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="bg-background/10 rounded-lg p-2">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-background transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/70">
              © 2025 QuickCheck. All rights reserved. Built with ❤️ for the restaurant industry.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};